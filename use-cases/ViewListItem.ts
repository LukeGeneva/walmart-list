import type { Item } from '../Item';
import type { ListRepository } from '../ListRepository';

export type ViewListItemInput = {
  listId: string;
  itemId: string;
};

export type ViewListItemOutput = {
  item: {
    id: string;
    listId: string;
    name: string;
    aisle: string;
    quantity: number;
    imgSrc: string;
  } | null;
  prevItemId?: string;
  nextItemId?: string;
};

export class ViewListItem {
  constructor(private listRepository: ListRepository) {}

  execute = ({ listId, itemId }: ViewListItemInput): ViewListItemOutput => {
    const list = this.listRepository.findListById(listId);
    const unpickedItems = list.filter((item) => !item.isPicked);
    const itemIndex = unpickedItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return { item: null };

    const prevIndex = getPrevIndex(itemIndex, unpickedItems.length);
    const nextIndex = getNextIndex(itemIndex, unpickedItems.length);
    const item = mapOutputItem(unpickedItems[itemIndex]);
    return {
      item,
      prevItemId: unpickedItems[prevIndex].id,
      nextItemId: unpickedItems[nextIndex].id,
    };
  };
}

function getPrevIndex(itemIndex: number, itemCount: number) {
  if (itemIndex === 0) return itemCount - 1;
  return itemIndex - 1;
}

function getNextIndex(itemIndex: number, itemCount: number) {
  if (itemIndex === itemCount - 1) return 0;
  return itemIndex + 1;
}

function mapOutputItem(item: Item) {
  return {
    id: item.id,
    listId: item.listId,
    name: item.name,
    aisle: item.aisle,
    quantity: item.quantity,
    imgSrc: item.imgSrc,
  };
}
