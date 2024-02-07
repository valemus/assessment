import { SxProps } from '@mui/material';

export const cardSx: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const confirmCardSx: SxProps = {
  ...cardSx,
  width: 300,
  height: 300,
};
