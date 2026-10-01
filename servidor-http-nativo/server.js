const http = require ('node: http');
const PORTA = 3000;

const server = http.createServer((req, res) => {
    console.log(`requisicao recebida: ${req.method} ${req.url}`)

    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end('servidor HTTP nativo funcionando!\n') 
})