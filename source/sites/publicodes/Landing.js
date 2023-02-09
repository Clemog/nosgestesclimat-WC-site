import Illustration from 'Components/AnimatedIllustration'
import animate from 'Components/ui/animate'
import LogoADEME from 'Images/logoADEME.svg'
import React, { useContext, useState } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import NewsBanner from '../../components/NewsBanner'
import { openmojiURL } from '../../components/SessionBar'
import { IframeOptionsContext } from '../../components/utils/IframeOptionsProvider'
import Meta from '../../components/utils/Meta'
import useMediaQuery from '../../components/utils/useMediaQuery'
import { TrackerContext } from '../../components/utils/withTracker'
import DocumentationButton from './DocumentationButton'
import LandingContent from './LandingContent'
import LandingExplanations from './LandingExplanations'
import { useProfileData } from './Profil'

const fluidLayoutMinWidth = '1200px'

export default () => {
	const tracker = useContext(TrackerContext)
	const mobile = useMediaQuery(`(max-width: ${fluidLayoutMinWidth})`)
	const { isIframe } = useContext(IframeOptionsContext)

	return (
		<div
			css={`
				margin: 0 auto;
				border-radius: 1rem;
				padding: 0.4rem;
				h1 {
					margin-top: 0.3rem;
					font-size: 140%;
					line-height: 1.2em;
				}
				h2 {
					font-size: 100%;
					font-style: italic;
				}
				> div > a {
				}
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				min-height: 85vh;
				footer {
					margin-top: auto;
				}
			`}
		>
			<h1> Ce questionnaire permet aux salariés de calculer les émissions de CO2e liées à leur activité professionnelle. </h1>
	    <h2> Il est anonyme, seul les données agrégées seront exploitées. </h2>
			{/*<img src={Illustration} /> Suppression image landing */}
			<div css="margin-bottom: 1rem">
				<div css="margin: 1rem 0 .6rem;">
					<Link to="/simulateur/bilan" className="ui__ plain button">
						Lancer le calcul
					</Link>
				</div>
			{/*<div css="margin: .6rem 0 1rem;">
					<Link to="/conférence" className="ui__ button small">
						{emoji('👥')} Faire le test à plusieurs
					</Link>
				</div>  Suppression mode conférence pour le moment */}
				{/* <NewsBanner /> Suppression Bannières nouveautés*/}
			</div>

			<LandingContent background footer>
				<footer>
					{!isIframe && ( // would be a repetition with header logos
						<div
							css={`
								background: var(--lightestColor);
								display: flex;
								align-items: center;
								justify-content: center;
								margin-bottom: 1rem;
								img {
									margin: 0 0.6rem;
								}
							`}
						>
							<img
								src="/images/marianne.svg"
								alt="République Française"
								css="width: 7.5rem; height: auto; margin-right: .6rem"
								width="96"
								height="86"
							/>
							<a href="https://ademe.fr">
								<LogoADEME />
							</a>
							<a href="https://abc-transitionbascarbone.fr">
								<img
									css="width: 6rem; height: auto;margin-left: 1rem !important"
									src="https://abc-transitionbascarbone.fr/wp-content/uploads/2022/02/logo-ABC-web.png"
									alt="Logo de l'Association pour la transition Bas Carbone"
									width="86"
									height="29"
								/>
							</a>
						</div>
					)}
					<div
						css={`
							display: flex;
							justify-content: center;
							align-items: center;
							flex-wrap: wrap;
							> * {
								margin: 0 0.6rem;
							}
							img {
								font-size: 120%;
							}
						`}
					>
						<Link to="/à-propos">À propos</Link>
						<DocumentationButton />
						<Link to="/diffuser">Diffuser</Link>
						<ProfileLink />
					</div>
					<div
						css={`
							display: flex;
							justify-content: center;
							align-items: center;
							> * {
								margin: 0 0.6rem;
								font-size: 80%;
							}
						`}
					>
						<Link to="/accessibilite" style={{ textDecoration: 'none' }}>
							Accessibilité : partiellement conforme
						</Link>
					</div>
				</footer>
			</LandingContent>
		</div>
	)
}

const ProfileLink = () => {
	const { hasData } = useProfileData()
	if (!hasData) return null
	return (
		<animate.appear delay="1">
			<div
				css={`
					display: flex;
					justify-content: center;
					margin-top: 1rem;
				`}
			>
				<Link
					to="/profil"
					title="Page profil"
					className=""
					css={`
						width: 18rem !important;
						border-radius: 2rem !important;
						display: flex !important;
						align-items: center !important;
					`}
				>
					<img
						aria-hidden="true"
						src={openmojiURL('profile')}
						css="width: 1.5rem"
					/>
					<span
						css={`
							margin-left: 0.5rem;
						`}
					>
						Retrouver ma simulation
					</span>
				</Link>
			</div>
		</animate.appear>
	)
}
