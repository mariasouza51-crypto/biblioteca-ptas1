import {Router} from 'express'
import * as controller from '../controllers/Emprestimo.controllers.js'

const router = Router();

router.post('/', controller.cadastrar())
router.post('/', controller.devolver())