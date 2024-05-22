import {
  Button,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { Formik, FormikValues } from 'formik';
import { Video } from '../models/VideoResponse';
import { getVideoApi } from '../api';

interface FormProps {
  onSubmit: (item: Video) => void;
}

export const Form = ({ onSubmit }: FormProps) => {

  const handleSubmit = async (values: FormikValues) => {
    const videoResponse = await getVideoApi(values.link);
    console.log(videoResponse);
    
    onSubmit(videoResponse);
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(3rem, 10vw, 3.5rem)',
        }}
      >
        Free Download Youtube
        <Typography
          component="span"
          variant="h2"
          sx={{
            fontSize: 'inherit',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
          }}
        >
          Video
        </Typography>
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ margin: '20px 0', fontSize: 18 }}
      >
        Paste your YouTube link and we will take care of the rest
      </Typography>
      <Formik
        initialValues={{
          link: 'https://www.youtube.com/watch?v=Fw3RB7xnb80'
        }}
        onSubmit={handleSubmit}>
        {({ handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <InputLabel htmlFor="link-input" sx={visuallyHidden}>
              YouTube Link
            </InputLabel>
            <TextField
              id="link-input"
              hiddenLabel
              size="medium"
              variant="outlined"
              aria-label="Enter your Youtube link"
              placeholder="Your YouTube link"
              name='link'
              onChange={handleChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your Youtube link',
              }}
              style={{ marginRight: 4, flex: 0.8 }}
            />
            <Button variant="contained" color="primary" type='submit' style={{ flex: 0.2 }}>
              Download
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Form;