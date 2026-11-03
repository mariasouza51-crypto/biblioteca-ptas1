import * as service from '../services/Leitor.services.js'

export function listar(req, res) {
    res.json(service.listar())
}
export function cadastrar(req, res) {
    res.json(service.cadastrar())
}


