import express from 'express'
import { updateConvo ,getAllUsers , getConversation} from '../controllers/chats.js'

const router = express.Router()
router.get('/getallusers',getAllUsers)
router.get('/conversation',getConversation)
router.post('/updateconvo',updateConvo)

export default router