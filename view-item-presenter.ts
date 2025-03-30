import path from 'path';
import { dispense } from 'nutrimatic-html-dispenser';
import type { ViewListItemOutput } from './use-cases/ViewListItem';

const ITEM_VIEW = path.join(import.meta.dir, 'views/item.html');
const FINISHED_VIEW = path.join(import.meta.dir, 'views/finished.html');

export function presentItem(data: ViewListItemOutput) {
  if (!data.item) return dispense(FINISHED_VIEW, {});

  const { listId, quantity } = data.item;
  const prevHref = `/list/${listId}/${data.prevItemId}`;
  const nextHref = `/list/${listId}/${data.nextItemId}`;
  return dispense(ITEM_VIEW, {
    ...data.item,
    prevHref,
    nextHref,
    showQuantity: quantity > 1,
    showNav: data.nextItemId !== data.item.id,
  });
}
