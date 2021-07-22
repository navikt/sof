import { Datepicker, isISODateString } from 'nav-datovelger';
import { useState } from 'react';
import { Normaltekst, Undertittel, Element } from 'nav-frontend-typografi';

const handleOnChange = () => {};

//Expects to receive an array with texts for "start" and "end"
const DatepickerItem = (props: any) => {
  const [date, setDate] = useState();
  const optionarray: Array<any> = props.answeroptions;

  const d = new Date();
  const todayISO = `${d.getFullYear()}-${('0' + (d.getMonth() + 2)).slice(
    -2
  )}-01`;

  return (
    <>
      <Element>{props.question}</Element>
      {optionarray.map((item) => (
        <div>
          <Normaltekst key={item}>{item}</Normaltekst>
          <Datepicker
            key={props.question + item}
            locale={'nb'}
            inputId={''}
            value={date}
            onChange={handleOnChange}
            dayPickerProps={{}}
          />
        </div>
      ))}
    </>
  );
};

export default DatepickerItem;
