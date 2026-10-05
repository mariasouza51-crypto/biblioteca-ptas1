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

const emprestimos = [];
let proximoEmprestimoId = 1;

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

app.post('/emprestimos', (req, res) => {
    const { leitorId, livroId } = req.body;

    const leitor = leitores.find(l => l.id === leitorId);
    const livro = livros.find(l => l.id === livroId);

    if (!leitor || !livro) {
        return res.status(404).json({ erro: 'Leitor ou livro não encontrado' });
    }

    if (leitor.bloqueado) {
        return res.status(400).json({ erro: 'Leitor bloqueado' });
    }

    const ativos = emprestimos.filter(e =>
        e.leitorId === leitorId && !e.dataDevolucaoReal
    );

    if (ativos.length >= 3) {
        return res.status(400).json({
            erro: 'Limite de 3 empréstimos atingido'
        });
    }

    const novoEmprestimo = {
        id: proximoEmprestimoId++,
        leitorId,
        livroId,
        dataEmprestimo: new Date(),
        dataDevolucaoPrevista: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        dataDevolucaoReal: null
    };

    emprestimos.push(novoEmprestimo);

    res.status(201).json(novoEmprestimo);
});

app.post('/emprestimos/:id/devolver', (req, res) => {
    const id = Number(req.params.id);

    const emprestimo = emprestimos.find(e => e.id === id);

    if (!emprestimo) {
        return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }

    if (emprestimo.dataDevolucaoReal) {
        return res.status(400).json({ erro: 'Livro já devolvido' });
    }

    emprestimo.dataDevolucaoReal = new Date();

    const atraso = Math.ceil(
        (emprestimo.dataDevolucaoReal - emprestimo.dataDevolucaoPrevista) 
        / (1000 * 60 * 60 * 24)
    );

    let multa = 0;

    if (atraso > 0) {
        multa = atraso * 2;

        const leitor = leitores.find(l => l.id === emprestimo.leitorId);
        leitor.bloqueado = true;
    }

    res.json({
        mensagem: 'Devolução realizada',
        multa
    });
});

app.listen(PORTA, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
