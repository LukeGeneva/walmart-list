import type { ListRepository } from '../ListRepository';

export type DeleteItemInput = {
  itemId: string;
};

export class DeleteItem {
  constructor(private listRepository: ListRepository) {}

  execute = (input: DeleteItemInput) => {
    this.listRepository.deleteItem(input.itemId);
  };
}
