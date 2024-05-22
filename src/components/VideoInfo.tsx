import emotionStyled from "@emotion/styled";
import { AudioR, Video, VideoDownload } from "../models/VideoResponse";
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { getRelevantVideoInfo } from "../utils";
import React, { SyntheticEvent, useState } from "react";
import VideoRow from "./VideoRow";
import AudioRow from "./AudioRow";
import BasicVideoInfo from "./BasicVideoInfo";

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

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const {
    title,
    videos,
    audios
  } = getRelevantVideoInfo(video);

  const audio = audios.find(a => a.mimeType === 'audio/mp4; codecs="mp4a.40.5"');

  return (
    <VideoInfoWrapper>
      <BasicVideoInfo video={video} />
      <Box sx={{ ml: 2, flex: 0.8 }}>
        <Typography variant="h4">
          <a target='_blank' href={`https://www.youtube.com/watch?v=${video.videoDetails.videoId}`}>
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
                  <VideoRow key={idx} video={video} audio={audio} title={title} />
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
                {audios.map((audio: AudioR, idx: number) => (
                  <AudioRow key={idx} audio={audio} />
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