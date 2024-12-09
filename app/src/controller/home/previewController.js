"use strict";

const path = require('path');

class PreviewController {
    static async showPreview(req, res) {
        try {
            const fileName = req.params.fileName;
            
            // 파일 타입 확인
            const fileExt = path.extname(fileName).toLowerCase();
            let fileType;
            
            if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExt)) {
                fileType = 'image';
            } else if (fileExt === '.pdf') {
                fileType = 'pdf';
            } else {
                fileType = 'unknown';
            }

            // 파일 정보 (실제 구현시 DB에서 가져올 정보)
            const fileInfo = {
                originalName: fileName,
                uploadDate: new Date(),
                fileSize: '1MB',
                fileType: fileType
            };

            res.render('home/preview', {
                fileName: fileName,
                fileType: fileType,
                fileInfo: fileInfo
            });

        } catch (error) {
            console.error('미리보기 에러:', error);
            res.status(500).send('파일 미리보기 처리 중 오류가 발생했습니다.');
        }
    }
}

module.exports = PreviewController;