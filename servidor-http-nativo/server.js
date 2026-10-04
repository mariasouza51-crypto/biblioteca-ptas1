const http = require ('node:http');
const PORTA = 3000;

const server = http.createServer((req, res) => {
    console.log(`requisicao recebida: ${req.method} ${req.url}`)

    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain; charset=utf-8')
   
 

if (req.url === '/livros' && req.method === 'GET'){
    const livros = [
        {id: 1, titulo: 'Dom Casmurro'},
        {id: 2, titulo: 'O Cortiço'}
    ];
    
    res.statusCode = 200;
    res.end(JSON.stringify(livros));
}

else{
    res.statusCode = 404;
      res.end(JSON.stringify({
        erro: 'Rota não encontrada'
      }));
}});
server.listen(PORTA, () => {
    console.log('Servidor rodando em http://localhost:3000');
})
 