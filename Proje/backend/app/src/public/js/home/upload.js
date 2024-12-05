"user strict";

class UploadHandler {
    constructor() {
        this.form = document.querySelector('#uploadForm');
        this.fileInput = document.querySelector('#fileInput');
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
            location.href = "/preview";
            // reader.onload = (e) => {
            //     this.preview.innerHTML = `
            //         <h3>미리보기:</h3>
            //         <img src="${e.target.result}" alt="미리보기" style="max-width: 300px;">
            //     `;
            // };
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
                alert('파일이 성공적으로 업로드되었습니다.');
                location.href = "/preview";
                // this.preview.innerHTML = `
                //     <h3>업로드된 이미지:</h3>
                //     <img src="/uploads/${data.filename}" alt="업로드된 이미지" style="max-width: 300px;">
                // `;
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