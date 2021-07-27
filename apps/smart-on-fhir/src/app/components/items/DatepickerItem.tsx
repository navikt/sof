import { Datepicker, isISODateString } from 'nav-datovelger';
import { useEffect, useState } from 'react';
import { Normaltekst, Undertittel, Element } from 'nav-frontend-typografi';
import { setValueDate } from '../../utils/answersToJson';

//Expects to receive an array with texts for "start" and "end"
const DatepickerItem = (props: any) => {
  const [date, setDate] = useState('åååå.mm.dd');
  const optionarray: Array<any> = props.answeroptions;
  console.log(optionarray.length);

  // When answers is updated: set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    console.log(props.answers);
    if (
      date === 'åååå.mm.dd' &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      setDate(props.answers.get(props.entity.linkId) as string);
    }
  }, [props.answers]);

  const d = new Date();
  const todayISO = `${d.getFullYear()}-${('0' + (d.getMonth() + 2)).slice(
    -2
  )}-01`;

  return (
    <div className="componentItems">
      <Element>{props.entity.text}</Element>
      <div
        className="outerContainer"
        style={{ display: 'flex', marginBottom: '20px' }}
      >
        {optionarray.map((item) => (
          <div className="innerContainer" style={{ marginRight: '30px' }}>
            <Normaltekst key={item}>{item}</Normaltekst>
            <Datepicker
              key={props.entity.linkId}
              locale={'nb'}
              inputId={props.entity.linkId}
              onChange={setDate}
              value={date}
              dayPickerProps={{}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatepickerItem;
