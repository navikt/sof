import React from 'react';
import { Textarea } from 'nav-frontend-skjema';

const handleOnChange = () => {};

const TextareaItem = (question: string) => {
  return (
    <div>
      <Textarea
        label=""
        description={question}
        value={''}
        style={{ maxWidth: '690px' }}
        onChange={handleOnChange}
        maxLength={0}
      ></Textarea>
    </div>
  );
};

export default TextareaItem;
