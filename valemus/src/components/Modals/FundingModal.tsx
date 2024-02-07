import { Alert, Card, Modal, Typography } from '@mui/material';
import { Geldeinlage, Kategorie } from '../../../types/types';
import { cardSx } from '../Funding/Funding.styles';
import { FundingForm } from '../Funding/FundingForm';

type Props = {
  title: string;
  formData: Geldeinlage;
  onFormDataChange: (formData: Geldeinlage) => void;
  open: boolean;
  emptyFields: string[];
  categories: Kategorie[];
  onClose: () => void;
  onSave: (formData: Geldeinlage) => void;
  onConfirmCancel: () => void;
};

export const FundingModal = ({
  title,
  formData,
  onFormDataChange,
  open,
  emptyFields,
  categories,
  onClose,
  onSave,
  onConfirmCancel,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Card sx={cardSx}>
        {emptyFields.length > 0 && (
          <Alert severity="warning" sx={{ my: 2 }}>
            {`Folgende Pflichtfelder sind noch nicht gültig befüllt: ${emptyFields}`}
          </Alert>
        )}
        <Typography variant="h5" component="div" sx={{ my: 2 }}>
          {title}
        </Typography>
        <FundingForm
          formData={formData}
          onFormDataChange={onFormDataChange}
          categories={categories}
          onSave={onSave}
          onConfirmCancel={onConfirmCancel}
        />
      </Card>
    </Modal>
  );
};
