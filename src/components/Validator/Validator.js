import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react';

const defaultStrategy = ({ value, validators, required }) =>
  (!required || !!value) &&
  (!validators || !validators.length || validators.some((validator) => validator(value)));

const ValidatorBase = (
  { renderChildren, validators, required, strategy = defaultStrategy },
  ref
) => {
  const [meta, setMeta] = useState({
    value: '',
    isValid: true,
  });

  const validate = useCallback((value) => strategy({ value, required, validators }), [
    required,
    validators,
    strategy,
  ]);

  useImperativeHandle(ref, () => ({
    getMeta: () => {
      const newMeta = {
        ...meta,
        isValid: validate(meta.value),
      };
      setMeta(newMeta);
      return newMeta;
    },
    reset: () => {
      setMeta({
        value: '',
        isValid: true,
      });
    },
  }));

  const changeListener = useCallback(
    (value) =>
      setMeta({
        ...meta,
        isValid: true,
        value,
      }),
    [meta]
  );

  const blurListener = useCallback(
    () =>
      setMeta({
        ...meta,
        isValid: validate(meta.value),
      }),
    [meta, validate]
  );

  const children = renderChildren({
    onChange: changeListener,
    onBlur: blurListener,
    required,
    meta,
  });

  return (
    <div ref={ref} className='validator__wrapper'>
      {children}
    </div>
  );
};

export const Validator = forwardRef(ValidatorBase);
