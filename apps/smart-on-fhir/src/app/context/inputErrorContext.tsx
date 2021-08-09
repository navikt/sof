import React from 'react';
import { useState } from 'react';

type ContextProps = {
  foundError: boolean;
  checkedForError: boolean;
  setFoundError: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedForError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputErrorContext = React.createContext<Partial<ContextProps>>({});

export const useInputErrorContext = () => {
  const context = React.useContext(InputErrorContext);
  if (context === undefined) {
    throw new Error(
      'useInputErrorDispatch must be used within a InputErrorProvider'
    );
  }
  return context;
};

export const InputErrorContextProvider = (props: any) => {
  const [foundError, setFoundError] = useState<boolean>(false);
  const [checkedForError, setCheckedForError] = useState<boolean>(false);
  const context = {
    foundError,
    setFoundError,
    checkedForError,
    setCheckedForError,
  };
  return (
    <InputErrorContext.Provider value={context}>
      {props.children}
    </InputErrorContext.Provider>
  );
};
