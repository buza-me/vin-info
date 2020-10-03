import './VinForm.css';
import React, { useMemo, useCallback, useRef } from 'react';
import { Input, ErrorMessage, Validator, Button, Label } from 'Components';
import { validateVinCode } from 'Utils';

export const VinForm = ({ action, label, validationError, inputPlaceholder }) => {
  const validatorRef = useRef(null);

  const submitCallback = useCallback(
    (event) => {
      event.preventDefault();
      const meta = validatorRef?.current?.getMeta?.();
      if (meta?.isValid) {
        action.callback(meta.value);
        validatorRef?.current?.reset();
      }
    },
    [action]
  );

  const renderInputAndHelpers = useCallback(
    ({ onChange, onBlur, meta }) => (
      <>
        <Label htmlFor='vin-form__input' className='vin-form__label'>
          {label}
        </Label>
        <Input
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          value={meta.value || ''}
          id='vin-form__input'
          error={!meta.isValid}
          placeholder={inputPlaceholder}
          type='text'
        />
        <ErrorMessage hidden={meta.isValid}>{validationError}</ErrorMessage>
      </>
    ),
    []
  );

  const inputWithValidator = useMemo(
    () => (
      <Validator
        ref={validatorRef}
        renderChildren={renderInputAndHelpers}
        validators={[validateVinCode]}
        validOnBlur
      />
    ),
    [validationError, label]
  );

  const button = useMemo(
    () => (
      <Button type='submit' className='vin-form__submit'>
        {action?.title}
      </Button>
    ),
    [action]
  );

  return (
    <form className='vin-form__container' onSubmit={submitCallback}>
      {inputWithValidator}
      {button}
    </form>
  );
};
