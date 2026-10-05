const express = require("express");

const app = express();
app.use(express.json());

const PORTA = 3000;

const livros = [
    { id: 1, titulo: 'Dom Casmurro' },
    { id: 2, titulo: 'O Cortiço' }
];

const leitores = [
    { id: 1, nome: "João", bloqueado: false },
    { id: 2, nome: "Maria", bloqueado: false }
];

let proximoLeitorId = 3;

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const id = Number(req.params.id);

    const livro = livros.find(livro => livro.id === id);

    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({
            erro: 'Livro não encontrado'
        });
    }
});

app.post('/livros', (req, res) => {
    const novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
    const id = Number(req.params.id);

    const livro = livros.find(livro => livro.id === id);

    if (livro){
        livro.titulo = req.body.titulo;
        res.json(livro);
    } else {
        res.status(404).json({
            erro: 'livro não encontrado'
        });
    }
});

app.delete('/livros/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = livros.findIndex(livro => livro.id ===id);

    if (indice !== -1) {
        livros.splice(indice, 1)

        res.json({
            mensagem: 'Livro excluido com sucesso'
        })
    } else{
        res.status(404).json({
            erro: 'Livro não encontrado'
        })
    }
});

app.get('/leitores', (req, res) => {
    res.json(leitores);
});

app.post('/leitores', (req, res) => {
    if (!req.body.nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const novoLeitor = {
        id: proximoLeitorId++,
        nome: req.body.nome,
        bloqueado: false
    };

    leitores.push(novoLeitor);
    res.status(201).json(novoLeitor);
});

app.listen(PORTA, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
