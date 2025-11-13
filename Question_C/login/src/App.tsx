import LoginForm from './components/LoginForm/LoginForm';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
      width={'100vw'}
    >
      <LoginForm/>
    </Box>
  );
}

export default App;
