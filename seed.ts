import { db } from './composition-root';
import { newId } from './domain/id';
import { INSERT_ITEM } from './sql';

const items = [
  {
    $id: newId(),
    $name:
      "French's No Artificial Flavors Kosher Classic Yellow Mustard, 20 oz Bottle",
    $listId: 'test',
    $aisle: 'A9',
    $imgSrc:
      'https://i5.walmartimages.com/seo/French-s-No-Artificial-Flavors-Kosher-Classic-Yellow-Mustard-20-oz-Bottle_db559995-6db9-441a-95c9-eedf9de53415.ef3ab265a70dd52e4950abf055f858b8.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    $quantity: 1,
    $isPicked: 0,
  },
];

db.exec('DELETE FROM item;');
const query = db.query(INSERT_ITEM);

for (const item of items) {
  query.run(item);
}
