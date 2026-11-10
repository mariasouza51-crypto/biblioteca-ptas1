import * as service from '../services/Emprestimo.services.js'

export function cadastrar(req, res) {
    res.json(service.cadastrar())
}


export function devolver(req, res) {
    res.json(service.devolver())
}