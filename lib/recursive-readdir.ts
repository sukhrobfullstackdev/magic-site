import path from 'path';
import fs from 'fs';

/**
 * Get a listing of files from a directory (`directory`), recursively.
 */
export async function recursiveReadDir(directory: string, arr: string[] = []) {
  try {
    const result = await fs.promises.readdir(directory);

    await Promise.all(
      result.map(async part => {
        const absolutePath = path.join(directory, part);

        const pathStat = await fs.promises.stat(absolutePath);

        if (pathStat.isDirectory()) {
          await recursiveReadDir(absolutePath, arr);
          return;
        }

        arr.push(path.relative(directory, absolutePath));
      }),
    );

    return arr.sort();
  } catch {
    return [];
  }
}
