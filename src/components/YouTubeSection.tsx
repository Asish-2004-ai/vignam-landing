'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function YouTubeSection() {
  // Required link: https://www.youtube.com/watch?v=E1czmX6bjFA&t=10s
  // Use embed with start=10 to match
  return (
    <Box id="video" component="section" sx={{ px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: 28, md: 40 } }}>
        Vignam — Text to Simulations
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1120,
          aspectRatio: '16 / 9',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/E1czmX6bjFA?start=10&rel=0"
          title="Vignam — Text to Simulations"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </Box>
    </Box>
  );
}
