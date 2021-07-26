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
    // Sjekker om ønsket element er i listen før fjerning av elementet
    if (copiedList.indexOf(tempValue) >= 0) {
      copiedList.splice(copiedList.indexOf(tempValue), 1);
    }
    setValueList(copiedList);
  }, [tempValue]);

  return (
    <>
      {valueList?.map((value: string) => {
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Xknapp mini onClick={() => handleOnClick(value)} />
              <p className="typo-normal">{value}</p>
            </div>
          </>
        );
      })}
    </>
  );
};
