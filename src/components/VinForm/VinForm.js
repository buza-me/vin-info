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
        validatorRef.reset();
      }
    },
    [action]
  );

  const renderInputAndHelpers = useCallback(
    ({ onChange, onBlur, required, meta: { value, isValid } }) => (
      <>
        <Label required={required} htmlFor='vin-form__input'>
          {label}
        </Label>
        <Input
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id='vin-form__input'
          error={!isValid}
          placeHolder={inputPlaceholder}
        />
        <ErrorMessage hidden={isValid}>{validationError}</ErrorMessage>
      </>
    ),
    [validationError, label]
  );

  const inputWithValidator = useMemo(
    () => (
      <Validator
        ref={validatorRef}
        renderChildren={renderInputAndHelpers}
        validators={[validateVinCode]}
      />
    ),
    [renderInputAndHelpers]
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
