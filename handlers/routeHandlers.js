import { getGoldPrice } from "../utils/getGoldPrice.js";
import { sendResponse } from "../utils/sendResponse.js";

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