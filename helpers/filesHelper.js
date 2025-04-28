import fs from "node:fs/promises";

const isAccessible = async (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

export const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
