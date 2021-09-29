import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  errors: string;
  resetError: () => void;
};

const BasicModal: React.FC<PropsType> = (props) => {
  const { errors, resetError } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetError());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (errors.length !== 0) {
      setOpen(true);
    }
  }, [errors]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Error
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {errors}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
