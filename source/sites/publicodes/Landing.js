import React, { useState } from 'react'
import animate from 'Components/ui/animate'
import LogoADEME from 'Images/logoADEME.svg'
import { useContext, Suspense } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import NewsBanner from '../../components/NewsBanner'
import { openmojiURL } from '../../components/SessionBar'
import Meta from '../../components/utils/Meta'
import { TrackerContext } from '../../components/utils/withTracker'
import DocumentationButton from './DocumentationButton'
import Illustration from 'Components/AnimatedIllustration'
import { useProfileData } from './Profil'
import landingMd from 'raw-loader!./landing.md'
import avantages from './avantages.yaml'
import Markdown from 'markdown-to-jsx'
import useMediaQuery from '../../components/utils/useMediaQuery'
import LandingContent from './LandingContent'

const SurveyModal = React.lazy(() => import('./SurveyModal'))

export default () => {
	const tracker = useContext(TrackerContext)
	const [showSurveyModal, setShowSurveyModal] = useState(false)
	const mobile = useMediaQuery('(max-width: 800px)')

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
							css="height: 6rem; margin-right: .6rem"
							width="96"
							height="86"
						/>
						<a href="https://ademe.fr">
							<LogoADEME />
						</a>
						<a href="https://abc-transitionbascarbone.fr">
							<img
								css="height: 2rem; margin-left: 1rem !important"
								src="https://abc-transitionbascarbone.fr/wp-content/uploads/2022/02/logo-ABC-web.png"
								alt="Logo de l'Association pour la transition Bas Carbone"
								width="86"
								height="29"
							/>
						</a>
					</div>
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
		<animate.fromTop delay="1">
			<div
				css={`
					button {
						padding: 0 0.2rem !important;
						border-radius: 1rem !important;
					}
				`}
			>
				<Link
					to="/profil"
					title="Page profil"
					className="ui__ button plain small"
					css="border-radius: 2rem !important"
				>
					<img
						aria-hidden="true"
						src={openmojiURL('profile')}
						css="width: 2rem"
					/>
				</Link>
			</div>
		</animate.fromTop>
	)
}
