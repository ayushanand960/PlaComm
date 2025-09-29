import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
  Link,
  styled,
} from '@mui/material';
import { Visibility, VisibilityOff, Info } from '@mui/icons-material';
import axiosInstance from '../api/axiosInstance';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for buttons and accents
    },
    secondary: {
      main: '#f50057', // Pink for errors
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
  },
});

// Styled container for the form
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '100%',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const RegistrationForm = () => {
  const [formType, setFormType] = useState('student');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Reset form data when formType changes
  useEffect(() => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rumNumber: '',
      phone: '',
      course: '',
      branch: '',
      year: '',
      gender: '',
      employeeId: '',
      department: '',
      designation: '',
      contact: '',
    });
    setErrors({});
  }, [formType]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  // Real-time field validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === 'rumNumber' && value && !/^RUM\d{7}$/.test(value)) {
      newErrors.rumNumber = 'RUM number must be "RUM" followed by 7 digits (e.g., RUM2201146).';
    } else if (name === 'rumNumber') {
      delete newErrors.rumNumber;
    }
    if (name === 'employeeId' && value && !/^[A-Z]{2}-[A-Z]{3}\/E\d{7}$/.test(value)) {
      newErrors.employeeId = 'Employee ID must be in the format "RG-MND/E0011314".';
    } else if (name === 'employeeId') {
      delete newErrors.employeeId;
    }
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (name === 'email') {
      delete newErrors.email;
    }
    if (name === 'password' && value && value.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (name === 'password') {
      delete newErrors.password;
    }
    if (name === 'confirmPassword' && value !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    } else if (name === 'confirmPassword') {
      delete newErrors.confirmPassword;
    }
    setErrors(newErrors);
  };

  // Display temporary message
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Form submission validation
  const validateForm = () => {
    const requiredFields = formType === 'student'
      ? ['firstName', 'lastName', 'password', 'confirmPassword', 'rumNumber', 'phone', 'course', 'branch', 'year', 'gender']
      : ['firstName', 'lastName', 'password', 'confirmPassword', 'employeeId', 'department', 'designation', 'contact'];
    
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });
    
    validateField('rumNumber', formData.rumNumber);
    validateField('employeeId', formData.employeeId);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('confirmPassword', formData.confirmPassword);
    
    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length === 0 && Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!validateForm()) {
      showMessage('Please fix the errors in the form.', 'error');
      setLoading(false);
      return;
    }

    try {
      const endpoint = formType === 'student' ? '/users/register/student/' : '/users/register/training-officer/';
      const payload = {
        user: {
          username: formData.email || `user_${formType}_${Date.now()}@example.com`,
          password: formData.password,
        },
        first_name: formData.firstName,
        middle_name: formData.middleName || null,
        last_name: formData.lastName,
        email: formData.email || null,
        ...(formType === 'student'
          ? {
              rum_number: formData.rumNumber,
              phone: formData.phone,
              course: formData.course,
              branch: formData.branch,
              year: formData.year,
              gender: formData.gender,
            }
          : {
              employee_id: formData.employeeId,
              department: formData.department,
              designation: formData.designation,
              contact: formData.contact,
            }),
      };

      const response = await axiosInstance.post(endpoint, payload, { withCredentials: true });
      console.log('Registration successful:', response.data);
      localStorage.setItem('access_token', response.data.access);
      showMessage('Registration successful! Redirecting to dashboard...', 'success');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      const errorMessage = error.response?.data?.detail ||
                          error.response?.data?.rum_number?.[0] ||
                          error.response?.data?.employee_id?.[0] ||
                          error.response?.data?.email?.[0] ||
                          'An error occurred during registration.';
      showMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const commonFields = (
    <>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
        sx={{ mb: 2 }}
        aria-required="true"
      />
      <TextField
        label="Middle Name"
        name="middleName"
        value={formData.middleName || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.lastName}
        helperText={errors.lastName}
        sx={{ mb: 2 }}
        aria-required="true"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        fullWidth
        error={!!errors.email}
        helperText={errors.email || 'Optional, used as username if provided.'}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password || ''}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.password}
        helperText={errors.password || 'Minimum 8 characters.'}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-required="true"
      />
      <TextField
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword || ''}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-required="true"
      />
    </>
  );

  const renderForm = () => {
    if (formType === 'student') {
      return (
        <FormContainer component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Student Registration
          </Typography>
          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
          {commonFields}
          <TextField
            label="RUM Number"
            name="rumNumber"
            value={formData.rumNumber || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.rumNumber}
            helperText={errors.rumNumber || (
              <Box display="flex" alignItems="center">
                <Typography variant="caption">e.g., RUM2201146</Typography>
                <Tooltip title="RUM number must start with 'RUM' followed by 7 digits.">
                  <Info fontSize="small" sx={{ ml: 1, cursor: 'pointer' }} />
                </Tooltip>
              </Box>
            )}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <TextField
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={formData.course || ''}
              onChange={handleChange}
              label="Course"
              error={!!errors.course}
            >
              <MenuItem value=""><em>Select Course</em></MenuItem>
              <MenuItem value="BTech">BTech</MenuItem>
              <MenuItem value="MTech">MTech</MenuItem>
              <MenuItem value="BSc">BSc</MenuItem>
              <MenuItem value="MSc">MSc</MenuItem>
            </Select>
            {errors.course && <Typography color="error" variant="caption">{errors.course}</Typography>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={formData.branch || ''}
              onChange={handleChange}
              label="Branch"
              error={!!errors.branch}
            >
              <MenuItem value=""><em>Select Branch</em></MenuItem>
              <MenuItem value="CSE">Computer Science</MenuItem>
              <MenuItem value="ECE">Electronics</MenuItem>
              <MenuItem value="ME">Mechanical</MenuItem>
              <MenuItem value="CE">Civil</MenuItem>
            </Select>
            {errors.branch && <Typography color="error" variant="caption">{errors.branch}</Typography>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={formData.year || ''}
              onChange={handleChange}
              label="Year"
              error={!!errors.year}
            >
              <MenuItem value=""><em>Select Year</em></MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
            </Select>
            {errors.year && <Typography color="error" variant="caption">{errors.year}</Typography>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              label="Gender"
              error={!!errors.gender}
            >
              <MenuItem value=""><em>Select Gender</em></MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Registering...' : 'Register as Student'}
          </Button>
          <Link href="/" variant="body2" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
            Back to Home
          </Link>
        </FormContainer>
      );
    } else {
      return (
        <FormContainer component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Training Officer Registration
          </Typography>
          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
          {commonFields}
          <TextField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.employeeId}
            helperText={errors.employeeId || (
              <Box display="flex" alignItems="center">
                <Typography variant="caption">e.g., RG-MND/E0011314</Typography>
                <Tooltip title="Employee ID must be in the format 'RG-MND/E0011314'.">
                  <Info fontSize="small" sx={{ ml: 1, cursor: 'pointer' }} />
                </Tooltip>
              </Box>
            )}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.department}
            helperText={errors.department}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.designation}
            helperText={errors.designation}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <TextField
            label="Contact"
            type="tel"
            name="contact"
            value={formData.contact || ''}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.contact}
            helperText={errors.contact}
            sx={{ mb: 2 }}
            aria-required="true"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Registering...' : 'Register as Training Officer'}
          </Button>
          <Link href="/" variant="body2" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
            Back to Home
          </Link>
        </FormContainer>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', gap: 2, Limits: 10 }}>
          <Button
            variant={formType === 'student' ? 'contained' : 'outlined'}
            onClick={() => setFormType('student')}
            sx={{ minWidth: 120 }}
          >
            Student
          </Button>
          <Button
            variant={formType === 'trainingOfficer' ? 'contained' : 'outlined'}
            onClick={() => setFormType('trainingOfficer')}
            sx={{ minWidth: 120 }}
          >
            Training Officer
          </Button>
        </Box>
        {renderForm()}
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationForm;