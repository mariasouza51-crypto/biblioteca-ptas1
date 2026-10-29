import * as service from '../services/Emprestimo.services.js'

export function listar(req, res) {
    res.json(service.listar())
}