import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import crypto from 'crypto'
import path from 'path'
import multer from 'multer'

const configBucket = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'figure'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)
                file.key = `${hash.toString('hex')}-${file.originalname}`; // eslint-disable-line
                cb(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'brainly-figure-course',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    })
}

export default {
    dest: path.resolve(__dirname, '..', 'tmp', 'profile'),
    storage: configBucket.s3,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gig'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('invalid file type.'))
        }
    }
}
