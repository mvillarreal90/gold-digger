import { getGoldPrice } from "../utils/getGoldPrice.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { processPurchase } from "../utils/processPurchase.js"; 

export async function handleGoldPrice(res) {   
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
    
        setInterval(() => {
            const price = getGoldPrice();
            res.write(
                `data: ${JSON.stringify({ event: "price-updated", price: price})}\n\n`
            );
        }, 3000);
    } catch (err) {
        sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</h1><h2>Unable to get gold price.</h2></html>`)
    }
}

export async function handlePost(req, res, __dirname) {

    try {
        const parsedBody = await parseJSONBody(req);
        processPurchase(parsedBody);
        sendResponse(res, 200, "application/json", JSON.stringify(parsedBody));
    } catch (err) {
        sendResponse(res, 400, "application/json", JSON.stringify({ error: "jaja" }))
    }

}