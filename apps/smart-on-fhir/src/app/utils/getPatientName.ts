import {IPatient, HumanNameUseKind} from '@ahryman40k/ts-fhir-types/lib/R4'


export const getPatientName = (patient: IPatient) => {
    if (patient.name != undefined) {
    const nameObject = patient.name.find((elem) => elem.use === HumanNameUseKind._official);
    let fullName: string = "";
    nameObject?.given?.map((name: string) => fullName += name + " ");
    fullName += nameObject?.family;
    return fullName;
    }
    return "";
}