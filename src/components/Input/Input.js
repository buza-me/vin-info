import './Input.css';
import React, { useCallback, useMemo } from 'react';

export const Input = ({
  className = '',
  id = '',
  name = '',
  placeholder = '',
  required = false,
  onChange = () => null,
  onFocus = () => null,
  onBlur = () => null,
  value,
  step,
  min,
  max,
  type = '',
  error = false,
  autocomplete = 'off',
}) => {
  const allowedTypes = useMemo(() => new Set(['text', 'password', 'email', 'number']), []);
  const getInputType = useCallback(() => (allowedTypes.has(type) ? type : 'text'), [
    type,
    allowedTypes,
  ]);
  return (
    <input
      className={`input__content ${className} ${error ? 'error' : ''}`}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      type={getInputType()}
      step={step}
      min={min}
      max={max}
      autoComplete={autocomplete}
    />
  );
};
