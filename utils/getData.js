import path from "node:path";
import fs from "node:fs/promises";

export async function getData() {
    try {
        const pathJSON = path.join("data", "purchases.json");
        const data = await fs.readFile(pathJSON, "utf-8");
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (err) {
        console.log(err);
        return [];
    }
}