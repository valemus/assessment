import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Geldeinlage, Kategorie, Projekt } from '../../../types/types';
import { loadFundingsByProject, saveFunding, toNumber } from '../../utils';
import { FundingModal } from '../Modals/FundingModal';
import { FundingTable } from './FundingTable';

const initialFormData: Geldeinlage = {
  id: '',
  projekt: '',
  bezeichnung: '',
  kategorie: '',
  datum: new Date().toISOString().slice(0, 10), // Initial value in YYYY-MM-DD format
  geldgeber: '',
  betrag: '',
  notizen: '',
};

export const Funding = () => {
  const [title, setTitle] = useState('Neue Geldeinlage erfassen');
  const [formData, setFormData] = useState<Geldeinlage>(initialFormData);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Kategorie[]>([]);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const selectedProject: Projekt | undefined = useOutletContext();

  const fundings = useMemo(() => {
    if (selectedProject) {
      return loadFundingsByProject(selectedProject.id);
    }
    return [];
  }, [selectedProject]);

  const clearForm = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/kategorien.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Kategorie[] = await response.json();

        setCategories(data);
      } catch (error) {
        // handleError(error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (formData: Geldeinlage) => {
    if (!selectedProject) return;

    let invalidFields = [];
    for (const [field, value] of Object.entries(formData)) {
      if (field === 'id' || field === 'notizen' || field === 'projekt') {
        continue;
      }
      // also validates empty field with spaces
      if (toNumber(value) === 0) {
        invalidFields.push(field);
      }
    }

    if (invalidFields.length > 0) {
      setEmptyFields(invalidFields);
    } else {
      const res = await saveFunding(formData, selectedProject);
      if (res.status === 200) {
        setEmptyFields([]);
        setOpen(false);
        clearForm();
      }
    }
  };

  const handleCreate = () => {
    setTitle('Neue Geldeinlage erfassen');
    clearForm();
    setOpen(true);
  };

  const handleEdit = (formData: Geldeinlage) => {
    setTitle('Finanzierung bearbeiten');
    setFormData(formData);
    setOpen(true);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleCreate}>
        Neue Geldeinlage erfassen
      </Button>
      <FundingTable fundings={fundings} onEdit={handleEdit} />
      <FundingModal
        title={title}
        formData={formData}
        onFormDataChange={setFormData}
        open={open}
        emptyFields={emptyFields}
        categories={categories}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        onConfirmCancel={() => {
          setOpen(false);
          setEmptyFields([]);
          clearForm();
        }}
      />
    </Box>
  );
};
