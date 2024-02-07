import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import type { Geldeinlage, Kategorie } from '../../../types/types';
import { formatAmount } from '../../utils';
import { confirmCardSx } from './Funding.styles';

type Props = {
  formData: Geldeinlage;
  onFormDataChange: (formData: Geldeinlage) => void;
  categories: Kategorie[];
  onSave: (formData: Geldeinlage) => void;
  onConfirmCancel: () => void;
};

export const FundingForm = ({
  formData,
  onFormDataChange,
  categories,
  onSave,
  onConfirmCancel,
}: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let _value = value;

    if (name === 'betrag') {
      _value = formatAmount(value);
    }

    onFormDataChange({ ...formData, [name]: _value });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="bezeichnung"
            label="Bezeichnung der Geldeinlage"
            value={formData.bezeichnung}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="kategorie-label">Kategorie</InputLabel>
            <Select
              labelId="kategorie-label"
              name="kategorie"
              value={formData.kategorie}
              defaultValue=""
              onChange={handleChange}
              required
              notched={true}
            >
              <MenuItem value="" sx={{ height: 34 }}></MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="datum"
            label="Datum"
            value={formData.datum}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="geldgeber"
            label="Geldgeber"
            value={formData.geldgeber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            name="betrag"
            label="Betrag"
            value={formData.betrag}
            allowNegative={false}
            allowedDecimalSeparators={['.']}
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            customInput={TextField}
            onChange={handleChange}
            required
          />
          <TextField
            name="betrag"
            type="text"
            variant="standard"
            value={formatAmount(formData.betrag)}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              height: '100%',
              display: 'inline-flex',
              justifyContent: 'space-around',
              ml: 3,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="notizen"
            label="Notizen"
            value={formData.notizen}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} textAlign={'right'}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => onSave(formData)}
          >
            Speichern
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenConfirm(true)}
            sx={{ ml: 2 }}
          >
            Abbrechen
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="modal-confirm-title"
        aria-describedby="modal-confirm-description"
      >
        <Card sx={confirmCardSx}>
          <Typography variant="h5" component="div" sx={{ my: 2 }}>
            Bitte bestätigen
          </Typography>
          <Typography component="div" sx={{ my: 2 }}>
            Wollen Sie die Eingabe wirklich verwerfen?
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              onConfirmCancel();
              setOpenConfirm(false);
            }}
          >
            Ja
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenConfirm(false)}
            sx={{ ml: 2 }}
          >
            Nein
          </Button>
        </Card>
      </Modal>
    </form>
  );
};
