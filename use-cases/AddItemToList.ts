import { newId } from '../domain/id';
import { Item } from '../Item';
import type { ListRepository } from '../ListRepository';

export type AddItemToListInput = {
  listId: string | null;
  name: string;
  aisle: string;
  quantity: number;
  imgSrc: string;
};

export type AddItemToListOutput = {
  listId: string;
  itemId: string;
};

export class AddItemToList {
  constructor(private listRepository: ListRepository) {}

  execute = (input: AddItemToListInput) => {
    console.log('QUANTITY', input.quantity);
    const item = new Item();
    item.listId = input.listId ?? newId();
    item.name = input.name;
    item.aisle = input.aisle;
    item.quantity = input.quantity;
    item.imgSrc = input.imgSrc;
    this.listRepository.insertItem(item);
    return { listId: item.listId, itemId: item.id };
  };
}
