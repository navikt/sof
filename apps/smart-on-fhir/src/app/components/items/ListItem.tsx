import React, { FC, useState, useEffect } from 'react';
import { Fareknapp } from 'nav-frontend-knapper';

interface IProps {
  valueList: string[];
  setValueList: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ListItem: FC<IProps> = ({ valueList, setValueList }) => {
  const [tempValue, setTempValue] = useState('');

  const handleOnClick = (value: string) => {
    setTempValue(value);
  };

  useEffect(() => {
    const copiedList: string[] = [...valueList];
    copiedList.splice(copiedList.indexOf(tempValue), 1);
    setValueList(copiedList);
  }, [tempValue]);

  return (
    <>
      {valueList?.map((value: string) => {
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>{value}</p>
              <Fareknapp mini onClick={() => handleOnClick(value)}>
                X
              </Fareknapp>
            </div>
          </>
        );
      })}
    </>
  );
};
