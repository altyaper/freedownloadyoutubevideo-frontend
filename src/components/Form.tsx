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
import { styled } from '@mui/material/styles';
import { Formik, FormikHelpers, FormikValues } from 'formik';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 0 12px 8px hsla(220, 25%, 80%, 0.2)'
      : '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
  outline: '1px solid',
  backgroundImage: `url(${
    theme.palette.mode === 'light'
      ? '/static/images/templates/templates-images/hero-light.png'
      : '/static/images/templates/templates-images/hero-dark.png'
  })`,
  backgroundSize: 'cover',
  outlineColor:
    theme.palette.mode === 'light'
      ? 'hsla(220, 25%, 80%, 0.5)'
      : 'hsla(210, 100%, 80%, 0.1)',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export const Form = () => {

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    
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
            Explore our cutting-edge dashboard, delivering high-quality solutions
            tailored to your needs. Elevate your experience with top-tier features
            and services.
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