import fs from "node:fs/promises";
import path from "node:path";
import { getData } from "./getData.js";

export async function processPurchase(newPurchase) {

    try {
        const purchases = await getData();
        purchases.push(newPurchase);
        const pathJSON = path.join("data", "purchases.json");
        await fs.writeFile(
            pathJSON,
            JSON.stringify(purchases, null, 2),
            "utf-8"
        )
    } catch (err) {
        throw new Error(err);
    }
}