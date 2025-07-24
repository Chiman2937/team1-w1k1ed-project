import axios from 'axios';

export const cloudinaryClient = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/your-cloud-name',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

cloudinaryClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const cloudinaryMsg = error.response?.data?.error?.message;

    if (cloudinaryMsg) {
      console.error('Cloudinary 응답 오류:', cloudinaryMsg);
      return Promise.reject(new Error(cloudinaryMsg));
    }

    if (error.response) {
      console.error('서버 응답 오류:', error.message);
    } else if (error.request) {
      console.error('서버로부터 응답 없음:', error.message);
    } else {
      console.error('요청 구성 오류:', error.message);
    }

    return Promise.reject(error);
  },
);
