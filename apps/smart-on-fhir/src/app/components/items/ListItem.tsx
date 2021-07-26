import React, { FC, useState, useEffect } from 'react';
import { Xknapp } from 'nav-frontend-ikonknapper';

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
    console.log('Temp changed', tempValue);
  }, [tempValue]);

  return (
    <>
      {valueList?.map((value: string) => {
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>{value}</p>
              <Xknapp mini onClick={() => handleOnClick(value)} />;
            </div>
          </>
        );
      })}
    </>
  );
};
