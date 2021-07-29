import toast from 'react-hot-toast';
import axios from 'axios';

export default function uploadImage(files, setValue) {
  const file = files[0];

  // if the file is is not an png, jpg or jpeg, reject it
  if (!file.type.match(/^image\/(png|jpe?g)$/)) {
    toast.error('Only png, jpg and jpeg images are allowed!');
    return;
  }

  // if the file is too big, reject it
  if (file.size > 10 * 1024 * 1024) {
    toast.error('The image is too big!');
    return;
  }

  const reader = new FileReader();
  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');
  reader.onload = () => {
    const binaryStr = reader.result;
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', binaryStr);
    formData.append(
      'image',
      // @ts-ignore
      reader.result.slice(file.type === 'image/png' ? 22 : 23)
    );
    formData.append('name', file.name);
    formData.append('key', process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY);
    const upload = axios
      .post('https://api.imgbb.com/1/upload', formData)
      .then(({ data }) => {
        setValue('ogImageUrl', data.data.url);
        console.log(data.data.url);
      });
    toast.promise(upload, {
      loading: 'Uploading...',
      error:
        'Upload failed! Please try again. Try changing the name of file. Sorry for the inconvenience',
      success: 'Upload successful!',
    });
  };
  reader.readAsDataURL(file);
}
