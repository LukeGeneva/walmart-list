import { dispense } from 'nutrimatic-html-dispenser';
import type { ViewListItemOutput } from './ViewListItemUseCase';

const VIEW = './views/item.html';

export function presentItem(data: ViewListItemOutput) {
  const { listId } = data.item;
  const prevHref = `/list/${listId}/${data.prevItemId}`;
  const nextHref = `/list/${listId}/${data.nextItemId}`;
  return dispense(VIEW, { ...data.item, prevHref, nextHref });
}
