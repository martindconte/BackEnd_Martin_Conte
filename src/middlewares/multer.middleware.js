import multer from "multer"
import __dirname from "../utils.js"

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        console.log('desde multer -----------------------------------------------------------------');

        let destinationFolder = ''
        if( req.originalUrl.includes('documents') ) {
            destinationFolder = '/documents'
        }
        if( req.originalUrl.includes('profile-img') ) {
            destinationFolder = '/profiles'
        }

        console.log('destination ------------------------->', destinationFolder);

      cb(null, `${__dirname}/../src/public/files/${destinationFolder}`)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`)
    }
  })
  
  export const upload = multer({ storage: storage })