import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState } from 'react';

function AiFashion() {
  // Single state object to manage all form inputs
  const [formState, setFormState] = useState({
    height: '',
    weight: null,
    skinTone: null,
    gender: 'male',
  });

  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const weightOptions = [
    { title: '50 kg' }, { title: '55 kg' }, { title: '60 kg' },
    { title: '65 kg' }, { title: '70 kg' }, { title: '75 kg' }, { title: '80 kg' }
  ];

  const skinToneOptions = [
    { title: 'Fair' }, { title: 'Dark' }, { title: 'Brown' }, { title: 'White' }
  ];

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRecommendation = async () => {
    if (!formState.height || !formState.weight || !formState.skinTone || !formState.gender) {
      alert('Please fill all the fields');
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `A ${formState.gender} with height ${formState.height} cm, weight ${formState.weight}, and ${formState.skinTone} skin tone, wearing fashionable clothes.`;
      console.log('Prompt:', prompt);

      const mockImageUrl = `https://via.placeholder.com/400?text=${encodeURIComponent(prompt)}`;
      setGeneratedImage(mockImageUrl); 
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row text-black gap-6">
          <form className="md:w-1/2 space-y-4">
            {/* Height Input */}
            <TextField
              label="Height (cm)"
              variant="outlined"
              fullWidth
              value={formState.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
            />

            {/* Weight Autocomplete */}
            <Autocomplete
              options={weightOptions}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => handleInputChange('weight', newValue?.title)}
              renderInput={(params) => <TextField {...params} label="Weight" fullWidth />}
            />

            {/* Skin Tone Autocomplete */}
            <Autocomplete
              options={skinToneOptions}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => handleInputChange('skinTone', newValue?.title)}
              renderInput={(params) => <TextField {...params} label="Skin Tone" fullWidth />}
            />

            {/* Gender Radio Group */}
            <FormControl component="fieldset">
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={formState.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleRecommendation}
              disabled={isLoading} // Disable button while loading
              className="w-full bg-blue-500 text-white shadow-lg shadow-slate-700 px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? 'Generating...' : 'Get AI Recommendation'}
            </button>
          </form>

          {/* Result Section */}
          <div className="md:w-1/2 flex items-center shadow-2xl shadow-slate-700 justify-center bg-gray-200 h-64 rounded-lg">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated Fashion"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-600 ">Here is your image</p>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-gray-700 border-2 shadow-lg shadow-slate-400">
          <h1 className='text-2xl border-b-2 border-slate-500 mb-4 w-fit'>Image description</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ex, nesciunt corporis quibusdam nemo error.</p>
        </div>
      </div>
    </div>
  );
}

export default AiFashion;