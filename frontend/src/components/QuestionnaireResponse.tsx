import React from "react";
import {
	IQuestionnaireResponse,
	QuestionnaireResponseStatusKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { ItemAnswer } from "./ItemAnswer";
import questionnaireResponse from "../questionnaireResponse.json";

export const QuestionnaireResponse = () => {
	//const [answer, setAnswer];
	const formTemplate = questionnaireResponse;
	//formTemplate.item[0].answer[0].valueString = answer;

	console.log(formTemplate);

	return <></>;
};
