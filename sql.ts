export const INIT_SQL = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS item (
    id TEXT NOT NULL PRIMARY KEY,
    listId TEXT NOT NULL,
    name TEXT NOT NULL,
    aisle TEXT NOT NULL,
    imgSrc TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    isPicked INTEGER NOT NULL
);
`;

export const INSERT_ITEM = `
INSERT INTO item (
  id, listId, name, aisle, imgSrc, quantity, isPicked
) VALUES (
  $id, $listId, $name, $aisle, $imgSrc, $quantity, $isPicked
) RETURNING *;
`;

export const COMPLETE_ITEM = `
UPDATE item
SET isPicked = TRUE
WHERE id = $id;
`;

export const SELECT_LIST = `
SELECT * FROM item
WHERE listId = $listId 
ORDER BY aisle;
`;

export const DELETE_LIST = `
DELETE FROM item WHERE listId = $listId;
`;

export const DELETE_ITEM = `
DELETE FROM item WHERE id = $id;
`;
