import { Video } from "../models/VideoResponse";

export const VideoInfo = ({ video }: { video: Video }) => {
  console.log(video?.playerConfig?.audioConfig.loudnessDb);
  
  return (
    <h1>Video</h1>
  )
}

export default VideoInfo;