import {Router} from 'express'
import * as controller from '../controllers/Emprestimo.controllers.js'

const router = Router();

router.get('/', controller.listar)
router.post()
router.put()
router.patch()
router.delete()
