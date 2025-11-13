import { Close } from '@mui/icons-material';
import {
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { createContext, forwardRef, useContext, useReducer } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export type SnackbarType = 'success' | 'error';

interface SnackBarOption {
  message: string;
  type: SnackbarType;
  open: boolean;
  anchorOrigin?: SnackbarOrigin;
}

interface SnackbarPayload {
  payload: Partial<SnackBarOption>;
}

/**
 * Reducer function to update snackbar state.
 * It merges the current state with the new payload.
 */
const snackBarReducer = (state: SnackBarOption, action: SnackbarPayload) => {
  return {
    ...state,
    ...action.payload,
  };
}


/**
 * Custom Alert component using MUI's forwardRef for Snackbar.
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  }
);


/**
 * Context to provide snackbar state and dispatcher throughout the app.
 */
const SnackbarContext = createContext({
  currentSnackBar: {
    open: false,
    message: '',
    type: 'success',
  },
  dispatchCurrentSnackBar: (_action: SnackbarPayload) => {},
});


/**
 * Global dispatcher reference for triggering snackbar outside React tree.
 */
export let dispatchSnackBar: (action: SnackbarPayload) => void;


/**
 * SnackbarProvider component wraps the app and provides snackbar functionality.
 */
const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  // useReducer to manage snackbar state
  const [currentSnackBar, dispatchCurrentSnackBar] = useReducer(
    snackBarReducer,
    {
      open: false,
      message: '',
      type: 'success',
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'bottom',
      },
    } as SnackBarOption
  );

  // Assign dispatcher to global variable for external usage
  dispatchSnackBar = dispatchCurrentSnackBar;

  return (
    <SnackbarContext.Provider
      value={{
        currentSnackBar,
        dispatchCurrentSnackBar,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={currentSnackBar.anchorOrigin}
        open={currentSnackBar.open}
        autoHideDuration={6000}
        onClose={() =>
          dispatchCurrentSnackBar({
            payload: {
              open: false,
            },
          })
        }
      >
        <Alert
          severity={currentSnackBar.type}
          sx={{ 
            width: { xs: '95%', sm: '100%' },
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          action={
            <IconButton
              sx={{
                color: currentSnackBar.type === 'success' ? '#ffffff' : 'black',
              }}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() =>
                dispatchCurrentSnackBar({
                  payload: {
                    open: false,
                  },
                })
              }
            >
              <Close
                fontSize="small"
                sx={{
                  color: '#ffffff',
                  width: { xs: '15px', sm: '20px' },
                  height: { xs: '15px', sm: '20px' },
                }}
              />
            </IconButton>
          }
        >
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', sm: '1rem' },
              whiteSpace: 'pre-line',
              color: '#ffffff',
            }}
          >
            {currentSnackBar.message}
          </Typography>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

/**
 * Custom hook to access snackbar context.
 */
const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
}

export { useSnackbar, SnackbarProvider };
