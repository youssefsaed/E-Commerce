import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
const option = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `upload/${folderName}`)
        },
        filename: function (req, file, cb) {
      
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new Error('images only', { cause: 400 }), false)
        }

    }

    return multer({ fileFilter, storage })
}

export const uploadSingleFile = (fieldName, folderName) => option(folderName).single(fieldName)


export const uploadFiles = (arrayOfFields, folderName) => option(folderName).fields(arrayOfFields)


