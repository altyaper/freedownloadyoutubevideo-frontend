import { Box } from "@mui/material";
import { Video } from "../models/VideoResponse";
import { getTimeBySeconds } from "../utils";
import { Link } from "@mui/icons-material";

interface BasicVideoInfo {
  video: Video
}

export const BasicVideoInfo = ({ video  }: BasicVideoInfo) => {
  return (
    <Box sx={{ flex: 0.2 }}>
      <img src={video.videoDetails.thumbnail.thumbnails[0].url} />
      <div>
        <strong>Author:</strong> <a target={'_blank'} href={`https://www.youtube.com/@${video.videoDetails.author}`}>
          {video.videoDetails.author}
        </a>
      </div>
      <div>
        <strong>Duration:</strong> {getTimeBySeconds(video.videoDetails.lengthSeconds)}
      </div>
      <div>
        <a style={{ display: 'flex' }} target='_blank' href={video.streamingData.adaptiveFormats.find(v => v.qualityLabel.includes('360p'))?.url}>
          Video <Link />
        </a>
        <a style={{ display: 'flex' }} target='_blank' href={video.streamingData.adaptiveFormats.find(v => v.mimeType.includes('audio/mp4'))?.url}>
          Audio <Link />
        </a>
      </div>
    </Box>
  )
}

export default BasicVideoInfo;