import { Datepicker, isISODateString } from 'nav-datovelger';
import { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const handleOnChange = () => {};

const BasicDatepicker = () => {
  const [date, setDate] = useState('');
  return <Datepicker onChange={handleOnChange} value={date} />;
};

//Expects to receive an array with texts for "start" and "end"
const DatepickerItem = (props: any) => {
  const [date, setDate] = useState();
  const dateInfo: Array<any> = props.answeroptions;

  const d = new Date();
  const todayISO = `${d.getFullYear()}-${('0' + (d.getMonth() + 2)).slice(
    -2
  )}-01`;

  return (
    <>
      {dateInfo.map((item, id) => (
        <div>
          <Normaltekst>{item.text}</Normaltekst>
          <Datepicker
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
