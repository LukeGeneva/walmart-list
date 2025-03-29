import { newId } from './domain/id';

export class Item {
  private _id: string;

  public listId: string = '';
  public name: string = '';
  public aisle: string = '';
  public quantity: number = 1;
  public imgSrc: string = '';
  public isPicked: boolean = false;

  get id() {
    return this._id;
  }

  constructor() {
    this._id = newId();
  }

  static __hydrate = (props: {
    id: string;
    listId: string;
    name: string;
    aisle: string;
    quantity: number;
    imgSrc: string;
    isPicked: boolean;
  }) => {
    const item = new Item();
    item._id = props.id;
    item.listId = props.listId;
    item.name = props.name;
    item.aisle = props.aisle;
    item.quantity = props.quantity;
    item.imgSrc = props.imgSrc;
    item.isPicked = props.isPicked;
    return item;
  };
}
