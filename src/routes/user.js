import express from 'express'
import { UserController } from '../controllers'
import { asyncMiddleware } from '../utils'
const router = express.Router()

router.post('/signup', asyncMiddleware(UserController.signup))
router.get('/', asyncMiddleware(UserController.getUserData))
router.put('/', asyncMiddleware(UserController.updateProfile))
router.get('/login', asyncMiddleware(UserController.login))
router.get('/logout', asyncMiddleware(UserController.logout))

export default router
