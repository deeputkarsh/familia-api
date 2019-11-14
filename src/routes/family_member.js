import express from 'express'
import { FamilyMemberController } from '../controllers'
import { asyncMiddleware } from '../utils'
const router = express.Router()

router.get('/enums', asyncMiddleware(FamilyMemberController.getEnums))
router.post('/', asyncMiddleware(FamilyMemberController.create))
router.get('/:id?', asyncMiddleware(FamilyMemberController.get))
router.patch('/:id', asyncMiddleware(FamilyMemberController.update))
router.delete('/:id', asyncMiddleware(FamilyMemberController.remove))

export default router
