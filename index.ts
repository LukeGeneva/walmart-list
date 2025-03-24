import { Database } from 'bun:sqlite';
import { INIT_SQL, INSERT_ITEM } from './sql';

const headers = { 'Access-Control-Allow-Origin': 'https://www.walmart.com' };

const db = new Database(':memory:');
db.run(INIT_SQL);

Bun.serve({
  port: 3000,
  routes: {
    '/list': {
      POST: async (req) => {
        const body = await req.json();
        const isValid = validate(body);
        if (!isValid) return new Response(null, { status: 400, headers });

        const listId = body.listId ?? newId();
        const { name, aisle, imgSrc } = body;
        const args = {
          $id: newId(),
          $listId: listId,
          $name: name,
          $aisle: aisle,
          $imgSrc: imgSrc,
        };
        const [item] = db.query(INSERT_ITEM).all(args);
        return Response.json(item, { headers });
      },
    },
  },
});

function validate(body: any) {
  const { listId, name, aisle, imgSrc } = body;
  if (!listId && listId !== null) return false;
  if (!name) return false;
  if (!aisle) return false;
  if (!imgSrc) return false;
  return true;
}

function newId() {
  return Bun.randomUUIDv7();
}
