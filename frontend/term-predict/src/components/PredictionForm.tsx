import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

const jobs = ['admin.', 'blue-collar', 'entrepreneur', 'housemaid', 'management', 'retired', 'self-employed', 'services', 'student', 'technician', 'unemployed', 'unknown'];
const maritals = ['single', 'married', 'divorced'];
const educations = ['primary', 'secondary', 'tertiary', 'unknown'];
const binaryOptions = ['yes', 'no', 'unknown'];
const contacts = ['cellular', 'telephone', 'unknown'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const poutcomes = ['success', 'failure', 'other', 'unknown'];

interface FormData {
  age: string;
  job: string;
  marital: string;
  education: string;
  default: string;
  balance: string;
  housing: string;
  loan: string;
  contact: string;
  day: string;
  month: string;
  duration: string;
  campaign: string;
  pdays: string;
  previous: string;
  poutcome: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    job: '',
    marital: '',
    education: '',
    default: '',
    balance: '',
    housing: '',
    loan: '',
    contact: '',
    day: '',
    month: '',
    duration: '',
    campaign: '',
    pdays: '',
    previous: '',
    poutcome: '',
  });

  const [result, setResult] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
      setResult('Error making prediction.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 24, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Term Deposit Prediction
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(formData).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            {(() => {
              if (key === 'job') return (
                <TextField select fullWidth label="Job" name={key} value={value} onChange={handleChange}>
                  {jobs.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (key === 'marital') return (
                <TextField select fullWidth label="Marital" name={key} value={value} onChange={handleChange}>
                  {maritals.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (key === 'education') return (
                <TextField select fullWidth label="Education" name={key} value={value} onChange={handleChange}>
                  {educations.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (['default', 'housing', 'loan'].includes(key)) return (
                <TextField select fullWidth label={key.charAt(0).toUpperCase() + key.slice(1)} name={key} value={value} onChange={handleChange}>
                  {binaryOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (key === 'contact') return (
                <TextField select fullWidth label="Contact" name={key} value={value} onChange={handleChange}>
                  {contacts.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (key === 'month') return (
                <TextField select fullWidth label="Month" name={key} value={value} onChange={handleChange}>
                  {months.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              if (key === 'poutcome') return (
                <TextField select fullWidth label="Previous Outcome" name={key} value={value} onChange={handleChange}>
                  {poutcomes.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              );
              return (
                <TextField
                  fullWidth
                  type="number"
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              );
            })()}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Predict
          </Button>
        </Grid>
        {result && (
          <Grid item xs={12}>
            <Typography variant="h6">Prediction Result: {result}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PredictionForm;