export const INIT_SQL = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS item (
    id TEXT NOT NULL PRIMARY KEY,
    listId TEXT NOT NULL,
    name TEXT NOT NULL,
    aisle TEXT NOT NULL,
    imgSrc TEXT NOT NULL
);
`;

export const INSERT_ITEM = `
INSERT INTO item (
  id, listId, name, aisle, imgSrc
) VALUES (
  $id, $listId, $name, $aisle, $imgSrc
) RETURNING *;
`;
