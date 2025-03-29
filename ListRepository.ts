import { Database } from 'bun:sqlite';
import { Item } from './Item';
import { INSERT_ITEM, SELECT_LIST } from './sql';

type RawItem = {
  id: string;
  listId: string;
  name: string;
  aisle: string;
  imgSrc: string;
  quantity: number;
  isPicked: number;
};

export class ListRepository {
  constructor(private db: Database) {}

  insertItem = (item: Item) => {
    const args = {
      $id: item.id,
      $listId: item.listId,
      $name: item.name,
      $aisle: item.aisle,
      $imgSrc: item.imgSrc,
      $quantity: item.quantity,
      $isPicked: item.isPicked,
    };
    this.db.query(INSERT_ITEM).all(args);
  };

  findListById = (listId: string) => {
    const args = { $listId: listId };
    const list = this.db.query(SELECT_LIST).all(args) as RawItem[];
    return list.map(toItem);
  };
}

function toItem(raw: RawItem) {
  return Item.__hydrate({ ...raw, isPicked: !!raw.isPicked });
}
