import { Box, Tabs as MuiTabs, Paper, Skeleton, Tab } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Projekt } from '../../../types/types';

type Props = {
  selectedProject?: Projekt;
};

export const Tabs = ({ selectedProject }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return 0;
      case '/aufgabenplanung':
        return 1;
      default:
        return -1;
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === activeTab) {
      return;
    }

    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/aufgabenplanung');
        break;
    }
  };

  if (activeTab < 0) {
    return <Skeleton variant="rounded" height={600} />;
  }

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={activeTab} onChange={handleChange} aria-label="tabs">
          <Tab label="Finanzierung" />
          <Tab label="Aufgabenplanung" />
        </MuiTabs>
      </Box>
      <Box height={500} p={2}>
        <Outlet context={selectedProject} />
      </Box>
    </Paper>
  );
};
