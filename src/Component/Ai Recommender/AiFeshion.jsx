import { Autocomplete, TextField, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert, Typography, Box, Paper, Button } from '@mui/material';
import React, { useState } from 'react';

const AiFashion = () => {
  const [formState, setFormState] = useState({
    height: '',
    weight: '',
    skinTone: '',
    gender: 'male'
  });

  const [result, setResult] = useState({
    image: null,
    description: '',
    loading: false,
    error: null
  });

  // Enhanced options
  const weightOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (50 + i).toString(),
    label: `${50 + i} kg`
  }));

  const skinToneOptions = [
    { value: 'fair', label: 'Fair' },
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'olive', label: 'Olive' },
    { value: 'brown', label: 'Brown' },
    { value: 'dark', label: 'Dark' }
  ];

  const handleChange = (field) => (event, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value?.value || event.target.value
    }));
  };

  const handleSubmit = async () => {
    // Enhanced validation
    if (!formState.height || formState.height < 140 || formState.height > 220) {
      setResult(prev => ({ ...prev, error: 'Please enter valid height (140-220 cm)' }));
      return;
    }
    if (!formState.weight || formState.weight < 40 || formState.weight > 120) {
      setResult(prev => ({ ...prev, error: 'Please select valid weight (40-120 kg)' }));
      return;
    }
    if (!formState.skinTone) {
      setResult(prev => ({ ...prev, error: 'Please select skin tone' }));
      return;
    }

    setResult({ image: null, description: '', loading: true, error: null });

    try {
      // Generate description first
      const description = generateDescription(formState);
      
      // Use description as prompt for image generation
      const imageUrl = await generateMockImage(description);

      setResult({
        image: imageUrl,
        description: description,
        loading: false,
        error: null
      });
    } catch (error) {
      setResult({
        image: null,
        description: '',
        loading: false,
        error: error.message || 'Failed to generate recommendation. Please try again.'
      });
    }
  };

  // Mock image generator (replace with actual API call)
  const generateMockImage = async (description) => {
    // In a real implementation, you would call an AI API here
    // For demo purposes, we'll use a placeholder with the description
    return `https://via.placeholder.com/512/cccccc/000000?text=${encodeURIComponent(description.substring(0, 50))}`;
  };

  // Enhanced description generator
  const generateDescription = (data) => {
    const outfits = {
      male: {
        slim: [
          "a tailored navy suit with a light dress shirt and slim tie",
          "fitted chinos with a crisp white shirt and leather loafers",
          "a slim-fit blazer with dark jeans and Chelsea boots"
        ],
        average: [
          "a classic two-button suit in charcoal gray",
          "a sport coat with dress pants and Oxford shoes",
          "a bomber jacket with slim jeans and sneakers"
        ],
        athletic: [
          "a stretch-fit suit that accentuates your physique",
          "a fitted polo shirt with tailored shorts",
          "a muscle-fit dress shirt with dress pants"
        ]
      },
      female: {
        slim: [
          "a wrap dress that cinches at the waist",
          "high-waisted pants with a tucked-in blouse",
          "a pencil skirt with a fitted sweater"
        ],
        average: [
          "an A-line dress that flatters your figure",
          "wide-leg pants with a tucked-in top",
          "a fit-and-flare dress"
        ],
        athletic: [
          "a bodycon dress that shows off your curves",
          "tailored joggers with a crop top",
          "a structured blazer with skinny jeans"
        ]
      },
      other: {
        all: [
          "a gender-neutral suit with a modern cut",
          "a stylish jumpsuit with statement accessories",
          "a tailored blazer with wide-leg trousers"
        ]
      }
    };

    // Determine body type
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    let bodyType = "";
    
    if (bmi < 18.5) bodyType = "slim";
    else if (bmi < 25) bodyType = "average";
    else bodyType = "athletic";

    // Get appropriate outfit
    const genderOutfits = outfits[data.gender] || outfits.other;
    const bodyOutfits = genderOutfits[bodyType] || genderOutfits.all || outfits.other.all;
    const outfit = bodyOutfits[Math.floor(Math.random() * bodyOutfits.length)];

    // Color recommendations based on skin tone
    const colors = {
      fair: ["pastel blue", "soft pink", "lavender"],
      light: ["navy", "emerald green", "burgundy"],
      medium: ["royal blue", "forest green", "mustard yellow"],
      olive: ["teal", "terracotta", "gold"],
      brown: ["deep purple", "rich red", "gold"],
      dark: ["vibrant colors", "bright white", "metallics"]
    };

    const recommendedColors = colors[data.skinTone] || ["neutral tones"];

    // Accessory recommendations
    const accessories = {
      male: ["leather watch", "quality belt", "dress shoes"],
      female: ["statement necklace", "strappy heels", "designer handbag"],
      other: ["minimalist jewelry", "ankle boots", "structured bag"]
    };

    const genderAccessories = accessories[data.gender] || accessories.other;

    return (
      `For your ${bodyType} build (${data.height}cm, ${data.weight}kg), we recommend ` +
      `${outfit} in ${recommendedColors.join(" or ")} to complement your ${data.skinTone} skin tone. ` +
      `Complete the look with ${genderAccessories.join(" and ")} for a polished appearance.`
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: { xs: 2, md: 4 },
      bgcolor: 'background.default'
    }}>
      <Paper sx={{
        width: '100%',
        maxWidth: 'lg',
        p: 4,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          AI Fashion Advisor
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          {/* Form Section */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Height (cm)"
                type="number"
                variant="outlined"
                value={formState.height}
                onChange={(e) => handleChange('height')(e)}
                inputProps={{ min: 140, max: 220 }}
                fullWidth
                helperText="Enter height between 140-220 cm"
              />

              <Autocomplete
                options={weightOptions}
                getOptionLabel={(option) => option.label}
                onChange={handleChange('weight')}
                renderInput={(params) => (
                  <TextField {...params} label="Weight" helperText="Select weight between 40-120 kg" />
                )}
                fullWidth
              />

              <Autocomplete
                options={skinToneOptions}
                getOptionLabel={(option) => option.label}
                onChange={handleChange('skinTone')}
                renderInput={(params) => (
                  <TextField {...params} label="Skin Tone" />
                )}
                fullWidth
              />

              <RadioGroup
                row
                value={formState.gender}
                onChange={handleChange('gender')}
                sx={{ justifyContent: 'space-around' }}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={result.loading}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  mt: 2
                }}
              >
                {result.loading ? (
                  <>
                    <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                    Generating...
                  </>
                ) : (
                  'Get Fashion Recommendation'
                )}
              </Button>
            </Box>
          </Box>

          {/* Result Section */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                bgcolor: 'grey.50',
                minHeight: 300,
                border: '1px dashed',
                borderColor: 'divider'
              }}
            >
              {result.loading ? (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Creating your personalized fashion recommendation...
                  </Typography>
                </Box>
              ) : result.image ? (
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <img
                    src={result.image}
                    alt="Fashion recommendation"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '400px',
                      borderRadius: '8px',
                      boxShadow: 2
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Your AI-generated fashion recommendation will appear here
                </Typography>
              )}
            </Paper>

            {result.description && (
              <Paper sx={{ 
                p: 3,
                backgroundColor: 'primary.light',
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9))'
              }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  color: 'primary.dark',
                  fontWeight: 'bold'
                }}>
                  Your Personalized Recommendation
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {result.description}
                </Typography>
              </Paper>
            )}

            {result.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {result.error}
              </Alert>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AiFashion;