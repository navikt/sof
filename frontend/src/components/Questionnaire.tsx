import React, { useState } from "react";
import {
	IQuestionnaire,
	Questionnaire_ItemTypeKind,
	QuestionnaireStatusKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { ItemAnswer } from "./ItemAnswer";
import questionnaireResponse from "../questionnaireResponse.json";

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = () => {
	const [answers, setAnswers] = useState<Map<string, string>>(new Map());
	const response = questionnaireResponse;

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

	/**
	 * Function to save answers in the json file.
	 */
	const saveAnswers = () => {
		answers.forEach((value, key) => {
			const item = response.item.find((e) => e.linkId === key)
				? response.item.find((e) => e.linkId === key)
				: null;
			if (item) {
				item.answer[0].valueString = value;
			}
		});
		console.log(response); // Logs the json file
	};

	return (
		<>
			{questionnaire.item?.map((value) => {
				if (value.linkId) {
					return (
						<div key={value.linkId}>
							<p>{value.text}</p>
							<ItemAnswer
								linkId={value.linkId}
								answers={answers}
								setAnswers={setAnswers}
							/>
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
