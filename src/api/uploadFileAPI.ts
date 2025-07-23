import { cloudinaryClient } from './clients/CloudinaryClient';

type UploadType = 'image' | 'video';

interface Payload {
  fileObject: File;
  type: UploadType;
}

export const uploadFileAPI = async ({ fileObject, type }: Payload): Promise<string> => {
  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!presetName) {
    throw new Error('Cloudinary preset 정보가 설정되어 있지 않습니다.');
  }

  const formData = new FormData();
  formData.append('file', fileObject);
  formData.append('upload_preset', presetName);

  const res = await cloudinaryClient.post(
    `https://api.cloudinary.com/v1_1/dxho7f5dm/${type}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data.secure_url;
};
