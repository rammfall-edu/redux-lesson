import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { Box, Container } from '@mui/material';

const Application = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          paddingTop: '80px',
        }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Application;
