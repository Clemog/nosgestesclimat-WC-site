import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import emoji from 'react-easy-emoji'
import tinygradient from 'tinygradient'
import { animated, useSpring } from 'react-spring'
import ShareButton from 'Components/ShareButton'
import { findContrastedTextColor } from 'Components/utils/colors'
import { AddAnswer } from '../publicodes/API';
import { useEngine } from 'Components/utils/EngineContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import BallonGES from './images/ballonGES.svg'
import StartingBlock from './images/starting block.svg'
import SessionBar from 'Components/SessionBar'
import Chart from './chart'
import { Link } from 'react-router-dom'
import Meta from '../../components/utils/Meta'
import DefaultFootprint from './DefaultFootprint'
import { sessionBarMargin } from '../../components/SessionBar'
import { situationSelector } from 'Selectors/simulationSelectors'
import PopUpEnd from 'Components/PopUpEnd'
import { Degrees } from 'faunadb'

const gradient = tinygradient([
	{ color: '#ffbf79', pos: 0.2 },
	{ color: '#6ad7ca', pos: 0.3 },
	{ color: '#24D0CA', pos: 0.8 },
]),
	colors = gradient.rgb(20)

const getBackgroundColor = (score) =>
	colors[
	Math.round((score < 2000 ? 0 : score > 20000 ? 19000 : score - 2000) / 1000)
	]

const sumFromDetails = (details) =>
	details.reduce((memo, [name, value]) => memo + value, 0)

export default ({ }) => {
	const query = new URLSearchParams(useLocation().search)
	const details = query.get('details')

	// details=a2.6t2.1s1.3l1.0b0.8f0.2n0.1
	const encodedDetails = details,
		rehydratedDetails =
			encodedDetails &&
			encodedDetails
				.match(/[a-z][0-9]+\.[0-9][0-9]/g)
				.map(([category, ...rest]) => [category, 1000 * +rest.join('')])
				// Here we convert categories with an old name to the new one
				// 'biens divers' was renamed to 'divers'
				.map(([category, ...rest]) =>
					category === 'b' ? ['d', ...rest] : [category, ...rest]
				)

	const score = sumFromDetails(rehydratedDetails)
	const headlessMode =
		!window || window.navigator.userAgent.includes('HeadlessChrome')

	const { value } = headlessMode
		? { value: score }
		: useSpring({
			config: { mass: 1, tension: 150, friction: 150, precision: 1000 },
			value: score,
			from: { value: 0 },
		})

	return (
		<div>
			<IframeDataShareModal data={rehydratedDetails} />
			<Link
				to="/simulateur/bilan"
				css="display: block; text-align: center"
				onClick={() => {
					dispatch(goToQuestion(last(answeredQuestions)))
				}}
			>
				<button class="ui__ simple small push-left button">
					← Revenir à la simulation
				</button>
			</Link>
			<animate.appear>
				<AnimatedDiv
					value={value}
					score={score}
					details={Object.fromEntries(rehydratedDetails)}
					headlessMode={headlessMode}
				/>
			</animate.appear>
		</div>
	)
}

const AnimatedDiv = ({ score, value, details, headlessMode }) => {
	const backgroundColor = getBackgroundColor(value).toHexString(),
		backgroundColor2 = getBackgroundColor(value + 2000).toHexString(),
		textColor = findContrastedTextColor(backgroundColor, true),
		roundedValue = (value / 1000).toLocaleString('fr-FR', {
			maximumSignificantDigits: 2,
			minimumSignificantDigits: 2,
		}),
		integerValue = roundedValue.split(',')[0],
		decimalValue = roundedValue.split(',')[1],
		shareImage =
			'https://aejkrqosjq.cloudimg.io/v7/' +
			window.location.origin +
			'/.netlify/functions/ending-screenshot?pageToScreenshot=' +
			window.location



	let situation = useSelector(situationSelector),
		engine = useEngine(),
		evaluation = engine.evaluate('alimentation . plats . viande 1 . nombre'),
		{ nodeValue: rawNodeValue, dottedName, unit, rawNode } = evaluation
	const rules = useSelector((state) => state.rules)

	return (
		<div
			css={`
				padding: 0 0.3rem 1rem;
				max-width: 600px;
				margin: 0 auto;
			`}
		>
			<Meta
				title="Nos Gestes Climat"
				description={`Mon empreinte climat est de ${roundedValue} tonnes de CO2e. Mesure la tienne !`}
				image={shareImage}
				url={window.location}
			/>
			<motion.div
				animate={{ scale: [0.9, 1] }}
				transition={{ duration: headlessMode ? 0 : 0.6 }}
				className=""
				id="fin"
				css={`
					background: linear-gradient(
						109deg,
						#ffbf79 0%,
						#24D0CA 100%
					);
					color: ${textColor};
					margin: 0 auto;
					border-radius: 0.6rem;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;

					text-align: center;
					font-size: 110%;
				`}
			>
				<div id="shareImage" css="padding: 2rem 0 0">
					<div css="display: flex; align-items: center; justify-content: center">
						<BallonGES css="height: 10rem; width: auto" />
						<div
							css={`
								flex-direction: ${headlessMode ? 'column-reverse' : 'column'};
								display: flex;
								justify-content: space-evenly;
								height: 10rem;
							`}
						>
							<div css="font-weight: bold; font-size: 280%;">
								<span css="width: 4rem; text-align: right; display: inline-block">
									{integerValue}
									{score < 10000 && (
										<AnimatePresence>
											{(score - value) / score < 0.01 && (
												<motion.small
													initial={{ opacity: 0, width: 0 }}
													animate={{ opacity: 1, width: 'auto' }}
													css={`
														color: inherit;
														font-size: 60%;
													`}
												>
													,{decimalValue}
												</motion.small>
											)}
										</AnimatePresence>
									)}
								</span>{' '}
								tonnes
							</div>
							{/* <div
								css={`
									background: #ffffff3d;
									border-radius: 0.6rem;
									padding: 0.4rem 1rem;

									> div {
										display: flex;
										justify-content: space-between;
										flex-wrap: wrap;
									}
									strong {
										font-weight: bold;
									}
									> img {
										margin: 0 0.6rem !important;
									}
								`}
							>
								<div>
									<span>
										{emoji('🇫🇷 ')}
										Moyenne{' '}
									</span>{' '}
									<strong>
										{' '}
										<DefaultFootprint />{' '}
									</strong>
								</div>
								<div>
									<span>
										{emoji('🎯 ')}
										Objectif{' '}
									</span>
									<strong>2 tonnes</strong>
								</div>
								{!headlessMode && (
									<div css="margin-top: .2rem;justify-content: flex-end !important">
										<a
											css="color: inherit"
											href="https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/"
											target="_blank"
										>
											Comment ça ?
										</a>
									</div>
								)}
							</div> */}
						</div>
					</div>
					{!integratorActionText && (
						<ActionButton text="Passer à l'action" score={score} />
					)}
					<div css="padding: 1rem">
						<Chart
							noAnimation
							details={details}
							links
							color={textColor}
							noText
							noCompletion
							valueColor={textColor}
						/>
					</div>
				</div>

				{/* <div css="display: flex; flex-direction: column; margin: 1rem 0">
					<ShareButton
						text="Voilà mon empreinte climat. Mesure la tienne !"
						url={window.location}
						title={'Nos Gestes Climat'}
						color={textColor}
						label="Partager mes résultats"
					/>
				</div> */}
			</motion.div>
		</div>
	)
}
const ActionButton = () => (
	<Link
		to="/actions"
		className="ui__ button plain"
		onClick={() =>
			tracker.push([
				'trackEvent',
				'NGC',
				'Clic bouton action page /fin',
				null,
				score,
			])
		}
		css={`
			margin: 0.6rem auto;
			width: 90%;

	return (
		<Link
			to="/actions"
			className="ui__ button plain"
			onClick={() =>
				tracker.push([
					'trackEvent',
					'NGC',
					'Clic bouton action page /fin',
					null,
					score,
				])
			}
			css={`
				margin: 0.6rem auto;
				width: 90%;

				img {
					height: 2.6rem;
					filter: invert(100%);
					margin: 0 0.6rem;
					display: inline-block;
				}
				a {
					color: var(--textColor);
					text-decoration: none;
				}
			`}
		>
			<img src={StartingBlock} />
			Passez à l'action
		</div>
	</Link>

)

document.addEventListener('DOMContentLoaded', function () {
	AddAnswer(this.situation).then((response) => {
		console.log('API response', response)
		// set app state
	}).catch((error) => {
		console.log('API error', error)
	})

}, false);
