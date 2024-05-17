import * as React from 'react';
import { Container, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar';
import Form from './Form';
import getLPTheme from '../getLPTheme';
import { VideoInfo } from '.';
import { Video } from '../models/VideoResponse';
import styled from '@emotion/styled';

const StyledForm = styled.div`
  width: 50%;
  margin: 0 auto;
`

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
      <Container sx={{
        margin: '0 auto',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: 20
      }}>
        <StyledForm>
          <Form onSubmit={handleOnSubmit} />
        </StyledForm>
        {video && <VideoInfo video={video as Video} />}
      </Container>
    </ThemeProvider>
  );
}


export default LandingPage;