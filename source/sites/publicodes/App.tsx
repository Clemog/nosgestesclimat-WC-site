import Logo from 'Components/Logo'
import Route404 from 'Components/Route404'
import { sessionBarMargin } from 'Components/SessionBar'
import 'Components/ui/index.css'
import React, { Suspense, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import { TrackerContext } from '../../components/utils/withTracker'
import Provider from '../../Provider'
import { WithEngine } from '../../RulesProvider'
import {
	persistSimulation,
	retrievePersistedSimulation,
} from '../../storage/persistSimulation'
import Tracker, { devTracker } from '../../Tracker'
import {
	changeLangTo,
	getLangFromAbreviation,
} from './../../locales/translation'
import Actions from './Actions'
import Fin from './fin'
import Landing from './Landing'
//import Logo, { InlineLogo } from './Logo'
import Documentation from './pages/Documentation'
import Personas from './Personas.tsx'
import Profil from './Profil.tsx'
import Simulateur from './Simulateur'
import sitePaths from './sitePaths'
import wecount from './images/wecount.png'
const ConferenceLazy = React.lazy(() => import('./conference/Conference'))
const StatsLazy = React.lazy(() => import('./pages/Stats'))


const GuideGroupeLazy = React.lazy(() => import('./pages/GuideGroupe'))
const DocumentationContexteLazy = React.lazy(
	() => import('./pages/DocumentationContexte')
)
const News = React.lazy(() => import('Pages/News'))

let tracker = devTracker

if (NODE_ENV === 'production') {
	tracker = new Tracker()
}

export default function Root({ }) {
	const { language } = useTranslation().i18n
	const paths = sitePaths()

	const iframeShareData = new URLSearchParams(
		document?.location.search.substring(1)
	).get('shareData')

	const persistedSimulation = retrievePersistedSimulation()

	const navigatorLanguage = window.navigator.language

	return (
		<Provider
			tracker={tracker}
			sitePaths={paths}
			reduxMiddlewares={[]}
			onStoreCreated={(store) => {
				//persistEverything({ except: ['simulation'] })(store)
				persistSimulation(store)
			}}
			initialStore={{
				//...retrievePersistedState(),
				previousSimulation: persistedSimulation,
				iframeOptions: { iframeShareData },
				actionChoices: persistedSimulation?.actionChoices || {},
				tutorials: persistedSimulation?.tutorials || {},
				storedTrajets: persistedSimulation?.storedTrajets || {},
				localisation: persistedSimulation?.localisation,
			}}
			rulesURL={`https://${branch
				? `${branch}--`
				: pullRequestNumber
					? `deploy-preview-${pullRequestNumber}--`
					: ''
				}ngc-wc-model.netlify.app/co2.json`}
			dataBranch={branch || pullRequestNumber}
		>
			<Main />
		</Provider>
	)
}

const Router = ({ }) => {
	const location = useLocation()
	const isHomePage = location.pathname === '/',
		isTuto = location.pathname.indexOf('/tutoriel') === 0

	const tracker = useContext(TrackerContext)
	const largeScreen = useMediaQuery('(min-width: 800px)')

	useEffect(() => {
		tracker.track(location)
	}, [location])

	useEffect(() => {
		const lang = searchParams.get('lang')

		if (lang) {
			changeLangTo(i18n, getLangFromAbreviation(lang))
		} else {
			changeLangTo(i18n, currentLang)
			searchParams.set('lang', i18n.language)
			setSearchParams(searchParams)
		}
	}, [currentLang, searchParams])

	const fluidLayout = isFluidLayout(location.pathname)

	return (
		<div
			css={`
				@media (min-width: 800px) {
					display: flex;
					min-height: 100vh;
					padding-top: 1rem;
				}

				@media (min-width: 1200px) {
					${!fluidLayout &&
					`
						transform: translateX(-4vw);
						`}
				}
				${!fluidLayout && !isTuto && sessionBarMargin}
			`}
			className={fluidLayout ? '' : 'ui__ container'}
		>
			<Navigation fluidLayout={fluidLayout} />
			<main
				tabIndex="0"
				id="mainContent"
				css={`
					outline: none !important;
					padding-left: 0rem;
					@media (min-width: 800px) {
						flex-grow: 1;
						padding-left: 0.6rem;
					}
				`}
			>
				{isHomePage && (
					<nav
						css={`
							display: flex;
							align-items: center;
							justify-content: center;
							text-decoration: none;
							font-size: 170%;
							margin: 1rem auto;
						`}
					>
						<a href="https://www.wecount.io">
							<img
								css="height: 4.5rem"
								src={wecount}
							/>
						</a>
						{location.pathname === wecount}
					</Link>
					{location.pathname !== '/' && <SessionBar />}
				</nav>
				<main
					css={`
						@media (min-width: 800px) {
							flex-grow: 1;
							padding: 1rem;
						}
					`}
				>
					{location.pathname === '/' && (
						<nav
							css={`
								display: flex;
								align-items: center;
								justify-content: center;
								text-decoration: none;
								font-size: 170%;
								margin-bottom: 1rem;
							`}
						>
							<Logo />
						</nav>
					)}
					<Switch>
						<Route exact path="/" component={Landing} />
						{/* Removes trailing slashes */}
						<Route
							path={'/:url*(/+)'}
							exact
							strict
							render={({ location }) => (
								<Redirect
									to={location.pathname.replace(/\/+$/, location.search)}
								/>
							)}
						/>

						<Route path="/documentation" component={Documentation} />
						<Route path="/simulateur/:name+" component={Simulateur} />
						{/* Lien de compatibilité, à retirer par exemple mi-juillet 2020*/}
						<Route path="/fin/:score" component={Fin} />
						<Route path="/fin" component={Fin} />
						<Route path="/personas" component={Personas} />
						<Route path="/actions" component={Actions} />
						<Route path="/contribuer/:input?" component={Contribution} />
						<Route path="/à-propos" component={About} />
						<Route path="/partenaires" component={Diffuser} />
						<Route path="/diffuser" component={Diffuser} />
						<Route path="/vie-privée" component={Privacy} />
						<Route path="/nouveautés" component={News} />
						<Route path="/profil" component={Profil} />
						<Route path="/conférence/:room?">
							<Suspense fallback="Chargement">
								<ConferenceLazy />
							</Suspense>
						</Route>
						<Redirect from="/conference/:room" to="/conférence/:room" />
						<Route component={Route404} />
					</Switch>
				</main>
			</div>
		</>
	)
}
