import path from 'path';
import { INIT_SQL, SELECT_LIST } from './sql';
import {
  db,
  viewListItem,
  addItemToList,
  deleteItem,
} from './composition-root';
import { presentItem } from './view-item-presenter';
import { dispense } from 'nutrimatic-html-dispenser';

const port = Number.parseInt(process.env.WALMART_LIST_PORT ?? '3000', 10);
const styles = path.join(import.meta.dir, 'public/styles.css');

db.run(INIT_SQL);

Bun.serve({
  port,
  routes: {
    '/list/:id': {
      GET: async (req) => {
        const list = db
          .query(SELECT_LIST)
          .all({ $listId: req.params.id }) as any[];
        const firstItem = list[0];
        if (!firstItem) {
          const view = path.join(import.meta.dir, 'views/finished.html');
          return new Response(dispense(view, {}), {
            headers: { 'Content-Type': 'text/html' },
          });
        }
        const url = `/list/${firstItem.listId}/${firstItem.id}`;
        return Response.redirect(url);
      },
    },
    '/list/:listId/:itemId/delete': {
      POST: async (req) => {
        const { itemId, listId } = req.params;
        if (!itemId) return new Response('Expected itemId', { status: 400 });

        deleteItem.execute({ itemId });
        return Response.redirect(`/list/${listId}`);
      },
    },
    '/list/:listId/:itemId': async (req) => {
      const { listId, itemId } = req.params;
      const output = viewListItem.execute({ listId, itemId });
      const html = presentItem(output);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    },
    '/list': {
      POST: async (req) => {
        const body = await req.json();
        const isValid = validate(body);
        if (!isValid)
          return new Response(null, {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': 'https://www.walmart.com',
            },
          });

        const output = addItemToList.execute({
          listId: body.listId ?? null,
          name: body.name,
          aisle: body.aisle,
          imgSrc: body.imgSrc,
          quantity: body.quantity,
        });

        return Response.json(output, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://www.walmart.com',
          },
        });
      },
    },
    '/styles.css': new Response(await Bun.file(styles).bytes(), {
      headers: {
        'Content-Type': 'text/css',
      },
    }),
  },
});

console.log(`Server started on port ${port}...`);

function validate(body: any) {
  const { listId, name, aisle, imgSrc, quantity } = body;
  if (!listId && listId !== null) return false;
  if (!name) return false;
  if (!aisle) return false;
  if (!imgSrc) return false;
  if (quantity <= 0) return false;
  return true;
}
