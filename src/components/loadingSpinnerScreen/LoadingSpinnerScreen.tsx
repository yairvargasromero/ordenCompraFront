import React from 'react'
import { CircularProgress, Backdrop } from '@mui/material';

interface Props {
  open: boolean;
}

const LoadingSpinnerScreen = ({ open }: Props) => {
  
    return (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );

}

export default LoadingSpinnerScreen