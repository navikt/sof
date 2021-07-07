import React, { useState } from "react";
import {
	IQuestionnaire,
	Questionnaire_ItemTypeKind,
	QuestionnaireStatusKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { ItemAnswer } from "./ItemAnswer";
import { QuestionnaireResponse } from "./QuestionnaireResponse";

export const Questionnaire = () => {
	const [answers, setAnswers] = useState<Map<string, string>>(new Map());

	const questionnaire: IQuestionnaire = {
		resourceType: "Questionnaire",
		status: QuestionnaireStatusKind._draft,
		item: [
			{
				linkId: "1",
				text: "Hva heter du?",
				type: Questionnaire_ItemTypeKind._string,
			},
			{
				linkId: "2",
				text: "Hva er din favorittårstid?",
				type: Questionnaire_ItemTypeKind._string,
			},
		],
	};

	const saveAnswers = () => {};

	return (
		<>
			{questionnaire.item?.map((value) => {
				if (value.linkId) {
					return (
						<div key={value.linkId}>
							<p>{value.text}</p>
							<ItemAnswer linkId={value.linkId} setAnswers={setAnswers} />
						</div>
					);
				} else {
					return <></>;
				}
			})}
			<button onClick={saveAnswers}>Save</button>
		</>
	);
};
