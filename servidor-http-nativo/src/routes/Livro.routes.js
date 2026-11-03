import {Router} from 'express'
import * as controller from '../controllers/Livro.controllers.js'

const router = Router();

router.get('/', controller.listar)
router.post('/', controller.cadastrar)
