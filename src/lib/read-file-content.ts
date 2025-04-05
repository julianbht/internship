import fs from "fs/promises";
import path from "path";

/**
 * Reads the content of a file from a given path.
 * If the path starts with "@/", it will be treated as an alias for "src/".
 *
 * @param filePath - The full file path as a string.
 * @returns The file content as a string.
 */
export async function readFileContent(filePath: string): Promise<string> {
  let absolutePath = filePath;

  // If the path starts with "@/": use it as an alias for the "src" directory.
  if (filePath.startsWith("@/")) {
    absolutePath = path.join(process.cwd(), "src", filePath.slice(2));
  }

  return fs.readFile(absolutePath, "utf8");
}
