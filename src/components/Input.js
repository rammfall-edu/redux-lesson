import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const Input = ({ name, label }) => {
  const [{ value, onBlur, onChange }, { error, touched }] = useField(name);

  return (
    <TextField
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      name={name}
      value={value}
      error={!!error && touched}
      helperText={touched ? error : ''}
    />
  );
};

export default Input;
