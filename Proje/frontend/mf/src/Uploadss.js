import React, { useState } from 'react';

const Uploadss = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // 미리보기 이미지 URL 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (image) {
      alert('이미지가 업로드되었습니다!');
    } else {
      alert('이미지를 선택하세요.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>이미지 업로드</h2>
      <form onSubmit={handleUploadSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ margin: '20px 0' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          업로드
        </button>
      </form>
      {preview && (
        <div>
          <h3>미리보기:</h3>
          <img
            src={preview}
            alt="미리보기"
            style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Uploadss;