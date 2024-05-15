import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Form from './components/Form';
import getLPTheme from './getLPTheme';
import { VideoInfo } from './components';
import { Video } from './models/VideoResponse';

export const LandingPage = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [video, setVideo] = React.useState <Video | null>(null);
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOnSubmit = (video: Video) => {
    setVideo(video);
  }

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Form onSubmit={handleOnSubmit} />
      {video && <VideoInfo video={video as Video} />}
    </ThemeProvider>
  );
}


export default LandingPage;