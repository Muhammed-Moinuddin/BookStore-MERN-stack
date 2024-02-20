import {Snackbar, Alert} from '@mui/material';

const AlertSnackbar = ({open, onClose, message}) => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
    >
        <Alert
        elevation={6}
        variant="filled"
        severity="info"
        sx={{ backgroundColor: "#E6D72A", color: '#000' }}
      >
        {message}
      </Alert>
      </Snackbar>
  )
}

export default AlertSnackbar;