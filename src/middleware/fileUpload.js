import multer from "multer"

const option = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `upload/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
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


