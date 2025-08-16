// components/Loader.tsx
'use client';

import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html center>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          padding: 3,
          borderRadius: 2,
          color: 'white',
        }}
      >
        <CircularProgress />
        <Typography variant="body2">Loading 3D assets — {Math.round(progress)}% </Typography>
        {errors && errors.length > 0 && (
          <Typography variant="caption" sx={{ color: 'error.main' }}>
            Error loading asset
          </Typography>
        )}
      </Box>
    </Html>
  );
}
