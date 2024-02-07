import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Projekt } from '../../../types/types';
import { sortProjects } from '../../utils';
import { paperSx } from './Projects.styles';

type Props = {
  onProjectChange: (project?: Projekt) => void;
};

export const Projects = ({ onProjectChange }: Props) => {
  const [projects, setProjects] = useState<Projekt[]>([]);
  // holding the selectedProject twice instead of just the index for better readability
  const [selectedProject, setSelectedProject] = useState<Projekt>();

  useEffect(() => {
    onProjectChange(selectedProject);
  }, [onProjectChange, selectedProject]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/projekte.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Projekt[] = await response.json();

        sortProjects(data);
        setProjects(data);
        setSelectedProject(data[0]);
      } catch (error) {
        // handleError(error);
      }
    };

    fetchData();
  }, []);

  if (!selectedProject) {
    return <Skeleton variant="rounded" height={160} />;
  }

  return (
    <Paper elevation={1} sx={paperSx}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="project-select-label">
          {selectedProject.name}
        </InputLabel>
        <Select
          labelId="project-select-label"
          id="project-select"
          value={selectedProject}
          label={selectedProject.name}
          onChange={(event) => {
            setSelectedProject(event.target.value as Projekt);
          }}
        >
          {projects.map((project) => (
            //@ts-ignore
            <MenuItem key={project.id} value={project}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="text-field-projektleiter"
        value={selectedProject.projektleiter}
        variant="outlined"
        disabled
        sx={{ minWidth: 200 }}
      />
      <TextField
        id="text-field-beschreibung"
        value={selectedProject.beschreibung}
        variant="outlined"
        multiline
        disabled
        rows={4}
        sx={{ width: '100%' }}
      />
    </Paper>
  );
};
