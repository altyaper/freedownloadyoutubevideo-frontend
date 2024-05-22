import { TableCell, TableRow } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { AudioR, VideoDownload } from "../models/VideoResponse";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { processVideoApi } from "../api";

interface VideoRowProps {
  video: VideoDownload;
  audio?: AudioR;
  title: string;
}

export interface UploadResponse {
  fileId: string;
}

export interface UploadRequest {
  title: string;
  videoLink: string;
  audioLink: string;
}

export const VideoRow = ({ video, audio, title }: VideoRowProps) => {

  const [shouldFetchVideo, setShouldFetchVideo] = useState(false);
  const [videoRequest, setVideoRequest] = useState<UploadRequest | null>(null);

  // Queries
  const {
    isFetching,
    data,
  } = useQuery({
    queryKey: ["video", videoRequest],
    queryFn: (): Promise<UploadResponse> => processVideoApi(videoRequest),
    enabled: shouldFetchVideo
  });

  if (data?.fileId) {
    window.open(`http://localhost:4000/api/download/${data.fileId}`);
  }

  const handleOnDownload = () => {
    if (!audio) return;
    setVideoRequest({
      videoLink: video.url,
      audioLink: audio?.url,
      title,
    });
    setShouldFetchVideo(true);
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
        <LoadingButton loading={isFetching} variant='contained' onClick={handleOnDownload}>
          Download
        </LoadingButton>
      </TableCell>
    </TableRow>
  )
}

export default VideoRow;