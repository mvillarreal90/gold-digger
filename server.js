import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

const PORT = 3000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    
    await serveStatic(req, res, __dirname);
 
});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));