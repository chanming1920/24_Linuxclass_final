const multer = require('multer');
const path = require('path');

class Upload {
    static #storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    static #upload = multer({
        storage: this.#storage,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB 제한
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
            }
        }
    });

    static getUploader() {
        return this.#upload;
    }



    // 추가로 미리 보기 기능 추가 
}

module.exports = Upload;