import classnames from 'classnames'
import { ThemeColorsContext } from 'Components/utils/colors'
import React, { useCallback, useContext, useState } from 'react'
import { Explicable } from 'Components/conversation/Explicable'
import emoji from 'react-easy-emoji'
import { useDispatch, useSelector } from 'react-redux'
import { situationSelector } from 'Selectors/simulationSelectors'
import { updateSituation } from 'Actions/actions'
import { Mosaic } from './UI'
import NumberFormat from 'react-number-format'


// This is the number of possible answers in this very custom input component
const chipsTotal = 100

export default function SelectAnnualPlane({
	name,
	setFormValue,
	selectedRules,
	value: currentValue,
	question,
}) {
	const dispatch = useDispatch()
	const situation = useSelector(situationSelector)

	const choiceElements = (
		<div>
			<Mosaic
				css={`
				li {
					margin: 0 0.5rem 0;
				}
			`}
			>
				{selectedRules.map(
					([
						{
							name,
							title,
							rawNode: { description, icônes },
						},
						question,
					]) => {
						const situationValue = situation[question.dottedName],
							value =
								situationValue != null
									? situationValue
									: question.rawNode['par défaut']
						return (
							<li className="ui__ card" key={name}>
								<h4>{title}</h4>
								<div css={'{margin: .5rem; font-size: 200%}'}>
									{emoji(icônes)}
								</div>
								<p>{description.split('\n')[0]}</p>
								<div css={' span {margin: .5rem; font-size: 120%;}'}>
									<button
										className={`ui__ button small plain ${!value ? 'disabled' : ''
											}`}
										onClick={() =>
											value >= 5 &&
											dispatch(updateSituation(question.dottedName, value - 5))
										}
									>
										-
									</button>
									<span>
										<NumberFormat
											autoFocus
											className={'ui__ suffixed'}
											allowEmptyFormatting={false}
											style={{ border: `1px solid` }}
											value={value}
											suffix={'h'}
											autoComplete="off"
											onValueChange={({ floatValue }) =>
												dispatch(updateSituation(question.dottedName, floatValue))
											}
										/>
									</span>
									<button
										className="ui__ button small plain"
										onClick={() =>
											value <= 95 &&
											dispatch(updateSituation(question.dottedName, value + 5))
										}
									>
										+
									</button>
								</div>
							</li>
						)
					}
				)}
			</Mosaic>
		</div>
	)

	return (
		<div css="margin-top: 0.6rem; display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end">
			{choiceElements}
		</div>
	)
}