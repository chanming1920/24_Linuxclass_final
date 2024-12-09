"use strict";

class UploadHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.fileInput = document.querySelector('input[type="file"]');
        this.preview = document.querySelector('#preview');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.preview.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 300px; margin-top: 20px;">
                `;
            };
            reader.readAsDataURL(file);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                // 업로드 성공 시 미리보기 페이지로 이동
                window.location.href = `/preview/${data.filename}`;
            } else {
                throw new Error(data.message || '업로드 실패');
            }
        } catch (error) {
            alert('업로드 중 오류가 발생했습니다: ' + error.message);
        }
    }
}

// 페이지 로드 시 핸들러 초기화
window.addEventListener('load', () => {
    new UploadHandler();
});