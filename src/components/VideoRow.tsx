import { TableCell, TableRow } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { VideoDownload } from "../models/VideoResponse";
import { useState } from "react";
import { SplitscreenRounded } from "@mui/icons-material";

interface VideoRowProps {
  video: VideoDownload;
  onClickDownload: (video: VideoDownload) => void;
}

export const VideoRow = ({ video, onClickDownload }: VideoRowProps) => {

  const [isDownloading, setIsDownloading] = useState(false);

  const handleOnDownload = (video: VideoDownload) => {
    setIsDownloading(true);
    onClickDownload(video);
  }

  return (
    <TableRow
      key={video.url}
    >
      <TableCell component="th" scope="qualityLabel">
        <strong>{video.qualityLabel}</strong>
      </TableCell>
      <TableCell component="th" scope="type">
        <strong>{video.mimeType.split(';')[0]}</strong>
      </TableCell>
      <TableCell component="th" scope="codec">
        <strong>{video.mimeType.split(';')[1].split('"')[1]}</strong>
      </TableCell>
      <TableCell align="right" scope='action'>
        <LoadingButton loading={isDownloading} variant='contained' onClick={() => handleOnDownload(video)}>
          Download
        </LoadingButton>
      </TableCell>
    </TableRow>
  )
}

export default VideoRow;