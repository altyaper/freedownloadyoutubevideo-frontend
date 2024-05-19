import getID from 'get-youtube-id';

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

export const processVideoApi = async ({ videoLink, audioLink }: { videoLink: string, audioLink: string }) => {
  return await fetch('http://localhost:4000/api/download', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoLink,
      audioLink
    })
  }).then(res => res.json());
}

export const downloadVideoApi = async (fileId: string) => {
  return await fetch(`http://localhost:4000/api/download/${fileId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
}