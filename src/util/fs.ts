import { unlink } from "fs";
import path from "path";

export const clearImg = (pathFile: string) => {
  const pathComplet = path.resolve(pathFile);
  unlink(pathComplet, (error) => console.log(error));
};
