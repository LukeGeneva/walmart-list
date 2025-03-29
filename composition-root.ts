import { Database } from 'bun:sqlite';
import { ListRepository } from './ListRepository';
import { ViewListItem } from './use-cases/ViewListItem';
import { AddItemToList } from './use-cases/AddItemToList';

export const db = new Database(process.env.WALMART_LIST_DB_PATH);

export const listRepository = new ListRepository(db);

export const viewListItem = new ViewListItem(listRepository);
export const addItemToList = new AddItemToList(listRepository);
