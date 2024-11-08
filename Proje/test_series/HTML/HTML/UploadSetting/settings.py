import os

# 업로드된 파일을 저장할 기본 경롤 설정
MEDIA_URL = '/media' # 웹에서 접근
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # 실제 파일 저장 경로

MAX_UPLOAD_SIZE = 500 * 1024 * 1024 # 10MB 파일 크기 제한