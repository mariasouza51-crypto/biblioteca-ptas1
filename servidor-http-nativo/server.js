const express = require("express");

const app = express();
app.use(express.json());

const PORTA = 3000;

const livros = [
    { id: 1, titulo: 'Dom Casmurro' },
    { id: 2, titulo: 'O Cortiço' }
];

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


app.listen(PORTA, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
