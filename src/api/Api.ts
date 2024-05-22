import getID from 'get-youtube-id';
import { UploadRequest } from '../components';

export const getVideoApi = async (link: string) => {
  const videoId = getID(link);
  return await fetch("http://localhost:4000/api/youtube", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId })
  }).then(res => res.json());
}

export const processVideoApi = async (uploadRequest: UploadRequest | null) => {
  if (!uploadRequest) return;
  return await fetch('http://localhost:4000/api/download', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadRequest)
  }).then(res => res.json());
}