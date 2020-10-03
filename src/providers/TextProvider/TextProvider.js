import React, { useCallback } from 'react';
import { TextContext } from 'Contexts';
import text from './source';

export const TextProvider = ({ children }) => {
  const getText = useCallback((key) => text[key] ?? key, []);
  return <TextContext.Provider value={{ getText }}>{children}</TextContext.Provider>;
};
