import multer from "fastify-multer";
import path from "node:path";
import crypto from 'node:crypto'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp')

const storage = multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const filename = `${fileHash}-${file.originalname}`
        
        return callback(null, filename)
    }
})

export default {
    storage, 
    directory: tempFolder
}