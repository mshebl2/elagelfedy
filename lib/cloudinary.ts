import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadToCloudinary(fileBuffer: Buffer, folder: string = 'aacc_ksa'): Promise<string> {
  if (cloudName && apiKey && apiSecret) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Cloudinary upload returned undefined result'));
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  // Fallback if Cloudinary is not configured: convert to Base64 Data URL or return placeholder
  const mimeType = 'image/jpeg';
  const base64 = fileBuffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

export default cloudinary;
