import {Router} from 'express'
import * as controller from '../controllers/Livro.controllers.js'

const router = Router();

router.get('/', controller.listar)
router.get('/', controller.buscarId)
router.post('/', controller.cadastrar)
router.put('/', controller.adicionar)
router.delete('/', controller.deletar)
