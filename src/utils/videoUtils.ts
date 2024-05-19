import { AdaptiveFormat, RelevantVideo, Video, VideoDownload } from "../models/VideoResponse";

export const getRelevantVideoInfo = (video: Video) => {

  const videos: VideoDownload[] = video.streamingData.adaptiveFormats.filter((format: AdaptiveFormat) => {
    return format.mimeType.includes('video/mp4');
  });

  const audios = video.streamingData.adaptiveFormats.filter((format: AdaptiveFormat) => {
    return format.mimeType.includes('audio/mp4');
  });

  return {
    videoId: video.videoDetails.videoId,
    title: video.videoDetails.title,
    thumbnails: video.videoDetails.thumbnail.thumbnails,
    videos,
    audios
  } as RelevantVideo
}

export const getTimeBySeconds = (lengthSeconds: string): string => {
  const parsed = parseInt(lengthSeconds);
  if (parsed > 60) {
    return `${(parsed / 60).toFixed(1)}m`;
  }
  return `${parsed}s`;
}