import React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

const handleOnChange = () => {};

const TextareaItem = (props: any) => {
  return (
    <>
      {props.helptext !== undefined ? (
        <div>
          <Textarea
            label={
              <div style={{ display: 'flex' }}>
                {props.question}
                <Hjelpetekst style={{ marginLeft: '10px' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            }
            value={''}
            style={{ maxWidth: '690px', marginBottom: '10px' }}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      ) : (
        <div>
          <Textarea
            label=""
            description={props.question}
            value={''}
            style={{ maxWidth: '690px', marginBottom: '10px' }}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      )}
    </>
  );
};

export default TextareaItem;