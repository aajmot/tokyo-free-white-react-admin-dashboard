import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ToasterModel } from './ToasterModel';
import { Alert, AlertColor } from '@mui/material';

export default function Toaster(props: ToasterModel) {
  const [open, setOpen] = React.useState(props?.open);

  useEffect(() => {
    setOpen(props?.open);
  }, [props])


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={(props?.type == '' ? 'success' : props?.type) as AlertColor}
          variant="filled"
        >
          {props.body}
        </Alert>
      </Snackbar>
    </>
  );
}