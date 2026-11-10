import * as service from '../services/Livro.services.js'

export function listar(req, res) {
    res.json(service.listar())
}

export function cadastrar(req, res) {
    res.json(service.cadastrar())
}

export function deletar (req, res) {
    res.json(service.deletar())
}

export function buscarId(req, res) {
    res.json(service.buscarId(req.params.id))
}
