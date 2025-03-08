const http = require("http"); // traz o valor do http
const url = require("url") //traz o valor da url
const fs = require("fs")
const path = require("path");

function Routes(request, response) {
    const URL = url.parse(request.url, true)
    const filePath = path.join(__dirname, "..", "mock", "alunos.json")

    if (request.method === "GET" && URL.pathname === "/") {
        response.writeHead(200, { "Content-Type": "text/plain" })
        response.end("Hi Bitch");
        return;
    }

    if (request.method === "GET" && URL.pathname === "/alunos") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err)
                response.writeHead(500, { "Content-Type": "text/plain" })
                return response.end(
                    JSON.stringify({ error: "Erro ao ler este caralho" }));
                }
                
                
                response.end(data);
                return;
        });

        return;
    }

    response.writeHead(404, { "Content-Type": "text/plain" })
    response.end("Content Not Found");

}

const server = http.createServer(Routes)

server.listen(3000, () => console.log("!Servidor caiu, imbecil"))
