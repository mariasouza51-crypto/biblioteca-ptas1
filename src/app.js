import express from 'express'

import * as emprestimoRoutes from './routes/Emprestimo.routes.js'

import * as leitorRoutes from './routes/Leitor.routes.js'

const app = express();
app.use(express.json());

app.use('/emprestimos', emprestimoRoutes);
app.use('/leitor', leitorRoutes);



