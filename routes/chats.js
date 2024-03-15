import express from 'express'
import { initNewConvo, updateConvo ,getAllUsers , getConversation} from '../controllers/chats.js'

const router = express.Router()
router.get('/getallusers',getAllUsers)
router.get('/conversation',getConversation)
router.post('/newconvo', initNewConvo)
router.post('/updateconvo',updateConvo)

export default router