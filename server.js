import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { handleGoldPrice, handlePost } from "./handlers/routeHandlers.js";

const PORT = 3000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    
    if (req.url === "/price") {
        await handleGoldPrice(res);
    } else if (req.url === "/api" && req.method === "POST") {
        await handlePost(req, res);
    } else {
        await serveStatic(req, res, __dirname);
    }
 
});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));