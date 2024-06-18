import express from "express"
import { changeRole, uploadDocuments, profileImg } from "../controllers/user.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

//api/users

router.post('/premium/:uid', checkRole(['user', 'PREMIUM']) ,changeRole)
router.post('/:uid/documents', upload.array('document') ,uploadDocuments)
router.post('/:uid/profile-img', upload.single('profile') , profileImg)


export default router 