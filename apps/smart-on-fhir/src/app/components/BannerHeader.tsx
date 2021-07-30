import Hvit from '../logos/Hvit.svg';
import Person from '../logos/Person.svg';
import { Ingress } from 'nav-frontend-typografi';
import { useFhirContext } from '../context/fhirContext';
import { getPatientName } from '../utils/getPatientName';

export const BannerHeader = () => {
  const { patient } = useFhirContext();

  return (
    <div className="nav-header-container">
      <div className="patientNameContainer">
        <img id="person-logo" src={Person} alt="Person" />
        <Ingress id="patient-name">{getPatientName(patient)}</Ingress>
      </div>
      <img className="nav-logo" src={Hvit} alt="Hvit NAV-logo" />
      <div className="bandline"></div>
    </div>
  );
};
