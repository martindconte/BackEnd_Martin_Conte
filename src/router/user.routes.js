import express from "express"
import { changeRole, uploadDocuments, profileImg, getAllUsers, deleteUser, deleteInactiveUsers } from "../controllers/user.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

//api/user

router.get('/', checkRole(['ADMIN']), getAllUsers)
router.post('/premium/:uid', checkRole(['user', 'PREMIUM']), changeRole)
// router.post('/:uid/documents', upload.array('document') ,uploadDocuments)
router.post('/:uid/profile-img', upload.single('profile'), profileImg)
router.post('/:uid/documents', upload.fields([
    { name: 'identificacion', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'cuenta', maxCount: 1 }
]), uploadDocuments)
router.delete('/:uid', checkRole(['ADMIN']), deleteUser)
router.delete('/', checkRole(['ADMIN']), deleteInactiveUsers)

export default router 