import * as model from '../models/emprestimos.model.js'


const emprestimos = []
let proximoId = 0

export function cadastrar(){
    return emprestimos
}

export async function listar (){
    const resultado = await model.buscarTodas()

    return resultado
}