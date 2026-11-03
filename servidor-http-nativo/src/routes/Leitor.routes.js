import {Router} from 'express'
import * as controller from '../controllers/Leitor.controllers.js'

const router = Router();


router.get('/', controller.listar)
router.post('/', controller.cadastrar)
