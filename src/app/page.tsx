import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // <-- use this
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Hero3D from '@/components/Hero3D';
import YouTubeSection from '@/components/YouTubeSection';

export default function Page() {
  return (
    <main>
      {/* Navigation bar */}
      <Container
        sx={{
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.02em' }}>
          Vignam
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary' }}>
          <a href="#features">Features</a>
          <a href="#video">Video</a>
          <a href="#cta">Get Started</a>
        </Box>
      </Container>

      {/* Hero with 3D model */}
      <Hero3D />

      {/* Required video section */}
      <YouTubeSection />

      {/* Features section */}
      <Box
        id="features"
        component="section"
        sx={{ px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 } }}
      >
        <Typography
          variant="h2"
          sx={{ mb: 3, fontSize: { xs: 28, md: 40 } }}
        >
          Features
        </Typography>

        {/* New Grid API (v7): no `item`, pass xs/md directly */}
        <Grid container spacing={3}>
          {[1, 2, 3].map((num) => (
            <Grid item xs={12} md={4} key={num}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://picsum.photos/seed/${num + 10}/800/500`}
                  alt={`Placeholder ${num}`}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Card title {num}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Replace copy/spacing/typography to match the video exactly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        id="cta"
        component="section"
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Ready to explore?
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          Mirror the exact CTA wording, size, weight, and spacing from the design.
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            px: 4,
            py: 1.8,
            bgcolor: 'primary.main',
            fontWeight: 700,
            borderRadius: 2,
            cursor: 'pointer'
          }}
        >
          Get Started
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ py: 6, textAlign: 'center', color: 'text.disabled' }}
      >
        © {new Date().getFullYear()} Vignam
      </Box>
    </main>
  );
}
