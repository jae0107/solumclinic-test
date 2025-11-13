import { Cancel, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputAdornment, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FieldErrors, SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from '../../hooks/useSnackbar';

const validEmails = [
  {
    email: 'test@example.com',
    password: 'SecurePass1!',
  },
  {
    email: 'user@example.com',
    password: 'MyStrongPwd@9',
  },
];

/**
 * ^ → Start of string
 * (?=.*[A-Z]) → At least one uppercase letter
 * (?=.*[a-z]) → At least one lowercase letter
 * (?=.*\d) → At least one digit
 * (?=.*[\W_]) → At least one special character (non-word or underscore)
 * [A-Za-z\d\W_]{8,16} → Allowed characters and length between 8–16
 * $ → End of string
 */
const schema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required.' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required.' })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/,
      {
        message:
          'Password must be 8–16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    ),
});

interface LoginInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { dispatchCurrentSnackBar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = form;

  /**
   * Extracts all error messages from a React Hook Form `errors` object
   * and returns them as a single string separated by new lines.
   *
   * @param errors - FieldErrors<LoginInput> object containing validation errors
   * @returns A string with all error messages joined by '\n'
   */
  const getErrorMsg = (errors: FieldErrors<LoginInput>) => {
    if (errors) {
      return Object.keys(errors)
        .reduce((messages: string[], key) => {
          const index = key as keyof LoginInput;
  
          // Check if the current field has an error
          if (errors && errors[index]) {
            const error = errors[index];
            // If an error message exists, add it to the messages array
            error && error.message && messages.push(error.message);
          }

          return messages;
        }, [])
        .join('\n');
    }
    return '';
  };

  const onError: SubmitErrorHandler<LoginInput> = (errors) => {
    if (Object.keys(errors).length) {
      dispatchCurrentSnackBar({
        payload: {
          open: true,
          type: 'error',
          message: getErrorMsg(errors),
        },
      });
    }
  };

  /**
   * Handles form submission for login.
   * Validates the entered email and password against a predefined list of valid users.
   * Displays appropriate success or error messages using a snackbar.
   *
   * @param input - LoginInput object containing email and password
   */
  const onSubmit = (input: LoginInput) => {
    // Show loading state while processing
    setLoading(true);

    // Find user by email from the validEmails array
    const user = validEmails.find((item) => item.email === input.email);

    // If email does not exist, show error and stop execution
    if (!user) {
      dispatchCurrentSnackBar({
        payload: {
          open: true,
          type: 'error',
          message: 'Email does not exist.',
        },
      });
      setLoading(false);
      return;
    }

    // If email exists but password does not match, show error and stop execution
    if (user.password !== input.password) {
      dispatchCurrentSnackBar({
        payload: {
          open: true,
          type: 'error',
          message: 'Password does not match the email.',
        },
      });
      setLoading(false);
      return;
    }

    // If both email and password match, show success message
    dispatchCurrentSnackBar({
      payload: {
        open: true,
        type: 'success',
        message: `Welcome, ${input.email}!`,
      },
    });
    setSuccess(true); // Update success state
    setLoading(false); // Hide loading state
  };

  const onLogout = () => {
    reset();
    setSuccess(false);
  }

  return (
    <Box width={'100%'} padding={2}>
      {
        !success ?
        (
          <form 
            onSubmit={handleSubmit(onSubmit, onError)} 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
            }}
          >
            <Stack 
              spacing={4} 
              padding={5} 
              borderRadius={2} 
              boxShadow={2} 
              bgcolor={'#f4f6f8'}
              sx={{ width: { xs: '95%', sm: '500px' } }}
            >
              <Stack spacing={4}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <Login
                      color='primary'
                      sx={{
                        width: { xs: '30px', sm: '40px' },
                        height: { xs: '30px', sm: '40px' },
                      }}
                    />
                    <Typography 
                      variant={'h4'}
                      sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                    >
                      Login
                    </Typography>
                  </Stack>
                </Box>
                <Box width={'100%'}>
                  <InputLabel 
                    required 
                    sx={{ 
                      marginBottom: 1, 
                      fontSize: { xs: '0.8rem', sm: '1rem' }
                    }}
                  >
                    Email
                  </InputLabel>
                  <TextField
                    placeholder='Enter your email.'
                    {...register('email')}
                    type='email'
                    fullWidth
                    error={!!errors.email}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={() => setValue('email', '')}>
                              <Cancel sx={{ width: '15px', height: '15px' }}/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                      htmlInput: {
                        sx: { fontSize: { xs: '0.8rem', sm: '1rem' } },
                      },
                    }}
                  />
                </Box>
                <Box width={'100%'}>
                  <InputLabel 
                    required 
                    sx={{ 
                      marginBottom: 1, 
                      fontSize: { xs: '0.8rem', sm: '1rem' }
                    }}
                  >
                    Password
                  </InputLabel>
                  <TextField
                    placeholder='Enter your password.'
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    error={!!errors.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={() => setValue('password', '')} sx={{ mr: '2px' }}>
                              <Cancel sx={{ width: '15px', height: '15px' }}/>
                            </IconButton>
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff sx={{ width: '20px', height: '20px' }}/> : <Visibility sx={{ width: '20px', height: '20px' }}/>}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                      htmlInput: {
                        sx: { fontSize: { xs: '0.8rem', sm: '1rem' } },
                      },
                    }}
                    variant='outlined'
                  />
                </Box>
                <Button 
                  fullWidth 
                  type='submit' 
                  variant='contained'
                  loading={loading} 
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                >
                  Login
                </Button>
              </Stack>
              <Divider/>
              <Link href={'#'} variant={'body2'}>Forgot password?</Link>
            </Stack>
          </form>
        ) :
        (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Stack
              spacing={4} 
              padding={5} 
              borderRadius={2} 
              boxShadow={2} 
              bgcolor={'#f4f6f8'}
              display={'flex'}
              alignItems={'center'}
              sx={{ width: { xs: '95%', sm: '500px' } }}
            >
              <Typography variant={'h5'}>
                {`Welcome, ${watch('email')}!`}
              </Typography>
              <Button 
                fullWidth
                variant='contained'
                onClick={onLogout}
                sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        )
      }
    </Box>
  );
}

export default LoginForm;
