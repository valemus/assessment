import { Box } from '@mui/material';
import { Projects } from '../Projects/Projects';
import { Tabs } from '../Tabs/Tabs';
import { useState } from 'react';
import { Projekt } from '../../../types/types';

export const Main = () => {
  const [selectedProject, setSelectedProject] = useState<Projekt>();

  return (
    <Box>
      <Projects onProjectChange={setSelectedProject} />
      <Tabs selectedProject={selectedProject} />
    </Box>
  );
};
