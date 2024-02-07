import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Valemus Assessment
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
  );
};
