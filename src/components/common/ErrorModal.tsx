import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TextErrorContainer } from './ErrorModal styled';

type PropsType = {
  errors: string;
  resetError: () => void;
};

const ErrorModal: React.FC<PropsType> = ({ errors, resetError }: PropsType): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (): void => {
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
        <TextErrorContainer>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Error
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {errors}
          </Typography>
        </TextErrorContainer>
      </Modal>
    </div>
  );
};

export default ErrorModal;
