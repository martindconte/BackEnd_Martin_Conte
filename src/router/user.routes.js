import express from "express"
import { changeRole, uploadDocuments, profileImg } from "../controllers/user.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

//api/user

router.post('/premium/:uid', checkRole(['user', 'PREMIUM']), changeRole)
// router.post('/:uid/documents', upload.array('document') ,uploadDocuments)
router.post('/:uid/profile-img', upload.single('profile'), profileImg)
router.post('/:uid/documents', upload.fields([
    { name: 'identificacion', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'cuenta', maxCount: 1 }
]), uploadDocuments)


export default router 