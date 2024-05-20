import emotionStyled from "@emotion/styled";
import { AudioR, Video, VideoDownload, VideoR } from "../models/VideoResponse";
import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { getRelevantVideoInfo, getTimeBySeconds } from "../utils";
import { processVideoApi, downloadVideoApi } from "../api";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "@mui/icons-material";
import VideoRow from "./VideoRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const VideoInfoWrapper = emotionStyled.div`
  margin-top: 70px;
  text-align: left;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d2d2d2;
  border-radius: 20px;
  display: flex;
  gap: 10;
`

interface VideoInfoProps {
  video: Video;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const VideoInfo = ({ video }: VideoInfoProps) => {

  const [value, setValue] = useState(0);
  
  // Queries
  const query = useQuery({ queryKey: ['video'], queryFn: async () => await processVideoApi, enabled: false })
  console.log(query);
  

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const {
    thumbnails,
    videoId,
    title,
    videos,
    audios
  } = getRelevantVideoInfo(video);

  const handleOnDownload = async (video: VideoDownload | AudioR) => {
    const audioLink = audios.find(a => a.mimeType === 'audio/mp4; codecs="mp4a.40.5"')?.url;
    if(!audioLink) return;

    const { fileId } = await processVideoApi({
      videoLink: video.url,
      audioLink
    });
    
    window.open(`http://localhost:4000/api/download/${fileId}`);
  }

  return (
    <VideoInfoWrapper>
      <Box sx={{ flex: 0.2 }}>
        <img src={thumbnails[1].url} />
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
      <Box sx={{ ml: 2, flex: 0.8 }}>
        <Typography variant="h4">
          <a target='_blank' href={`https://www.youtube.com/watch?v=${videoId}`}>
            {title}
          </a>
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Video" {...a11yProps(0)} />
            <Tab label="Audio" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Table aria-label="table to download the video">
              <TableHead>
                <TableRow>
                  <TableCell>Format</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Codec</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {videos.map((video: VideoDownload, idx: number) => (
                  <VideoRow key={idx} video={video} onClickDownload={handleOnDownload} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table aria-label="table to download the video">
              <TableHead>
                <TableRow>
                  <TableCell>Format</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audios.map((audio: AudioR) => (
                  <TableRow
                    key={audio.url}
                  >
                    <TableCell component="th" scope="audio">
                      <strong>{audio.quality}</strong>
                    </TableCell>
                    <TableCell component="th" scope="audio">
                      <strong>{audio.mimeType}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant='contained' onClick={() => handleOnDownload(audio)}>
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
    </VideoInfoWrapper>
  )
}

export default VideoInfo;