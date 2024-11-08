from django.shortcuts import render 
from django.core.files.storage import FileSystemStorage 

def file_upload_view(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_url = fs.url(filename)
        
        if uploaded_file.content_type.startwith('image'):
            file_type = 'image'
        elif uploaded_file.content_type.startwith('video'):
            file_type = 'video'
            
        else:
            file_type = 'unknown' # 영상이나 이미지 아니면 처리 안함
            
        return render(request, 'file_upload.html', {'file_url' : file_url,'filename' : uploaded_file.name})
    
    return render(request, 'file_upload.html')
