import {
  Box,
  Button,
  Container,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { Formik, FormikValues } from 'formik';
import getID from 'get-youtube-id';
import { Video } from '../models/VideoResponse';

interface FormProps {
  onSubmit: (item: Video) => void;
}
export const Form = ({
  onSubmit
}: FormProps) => {
  const handleSubmit = async (values: FormikValues) => {

    const videoId = getID(values.link);
    const reponse = await fetch("http://localhost:4000/api/youtube", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: videoId
      })
    }).then(res => res.json());

    onSubmit(reponse);

  }

  return (
    <Box
      id="hero"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            YouTube
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              do
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: { sm: '100%', md: '80%' } }}
          >
            Paste your youtube link and we will take care of it
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Formik
              initialValues={{
                link: ''
              }}
              onSubmit={handleSubmit}>
              {({ handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <InputLabel htmlFor="link-hero" sx={visuallyHidden}>
                    YouTube Link
                  </InputLabel>
                  <TextField
                    id="link-hero"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Enter your Youtube link"
                    placeholder="Your YouTube link"
                    name='link'
                    onChange={handleChange}
                    inputProps={{
                      autoComplete: 'off',
                      'aria-label': 'Enter your Youtube link',
                    }}
                  />
                  <Button variant="contained" color="primary" type='submit'>
                    Download
                  </Button>
                </form>
              )}
            </Formik>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Form;