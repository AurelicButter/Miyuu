import { Dirent, promises, existsSync, mkdir } from "fs";
import { join, extname } from "path";

export async function findFiles(
	directory: string,
	result: Map<string, Dirent> = new Map()
): Promise<Map<string, Dirent>> {
	if (!existsSync(directory)) {
		mkdir(directory, (err) => {
			if (err) {
				console.error(err);
			} else {
				return null;
			}
		});
	}

	const myDirectory = await promises.opendir(directory);
	let currItem = myDirectory.readSync();

	while (currItem !== null) {
		const itemPath = join(directory, currItem.name);

		if (currItem.isFile() && extname(currItem.name) === ".js") {
			result.set(itemPath, currItem);
		}

		if (currItem.isDirectory()) {
			console.log("READING " + join(directory, currItem.name));
			await findFiles(itemPath, result);
		}

		currItem = myDirectory.readSync();
	}

	return result;
}
