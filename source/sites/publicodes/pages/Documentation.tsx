import SearchButton from 'Components/SearchButton'
import { ScrollToTop } from 'Components/utils/Scroll'
import { utils } from 'publicodes'
import React, { Suspense, useState } from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { RootState } from 'Reducers/rootReducer'
import AnimatedLoader from '../../../AnimatedLoader'
import { WithEngine } from '../../../RulesProvider'
import { currentSimulationSelector } from '../../../selectors/storageSelectors'
import BandeauContribuer from '../BandeauContribuer'
import DocumentationLanding from './DocumentationLanding'
import QuickDocumentationPage from './QuickDocumentationPage'

const DocumentationPageLazy = React.lazy(() => import('./DocumentationPage'))

export default function () {
	const currentSimulation = useSelector(
		(state: RootState) => !!state.simulation?.url
	)
	const engineState = useSelector((state) => state.engineState)
	const engine = useEngine()

	const documentationPath = '/documentation'
	const { pathname: pathnameRaw } = useLocation(),
		pathname = decodeURIComponent(pathnameRaw)

	const url = useParams()['*']

	const [loadEngine, setLoadEngine] = useState(false)

	const engineState = useSelector((state) => state.engineState),
		parsedEngineReady =
			engineState.state === 'ready' && engineState.options.parsed

	if (pathname === '/documentation') {
		return <DocumentationLanding />
	}
	const encodedDottedName = pathname.split('/documentation/')[1],
		dottedName = utils.decodeRuleName(encodedDottedName)

	if (!dottedName || !rules[dottedName]) {
		return <Navigate to="/404" replace />
	}

	const rule = rules[dottedName]

	return (
		<div
			css={`
				@media (min-width: 800px) {
					max-width: 80%;
				}

				margin: 0 auto;
			`}
		>
			<ScrollToTop key={pathname} />
			<div
				css={`
					display: flex;
					justify-content: center;
					> * {
						margin-right: 2rem;
					}
				`}
			>
				{currentSimulation ? <BackToSimulation /> : <span />}
				<SearchButton key={pathname} />
			</div>

			{!parsedEngineReady && !loadEngine && (
				<div>
					<QuickDocumentationPage
						rule={rule}
						dottedName={dottedName}
						setLoadEngine={setLoadEngine}
						rules={allPublicRules}
					/>
				</div>
			)}
			{(engineReady || loadEngine) && (
				<WithEngine>
					<Suspense fallback={AnimatedLoader}>
						<DocumentationPageLazy dottedName={dottedName} />
					</Suspense>
				</WithEngine>
			)}

			<BandeauContribuer />
		</div>
	)
}

const DocPage = ({ engine: givenEngine }) => {
	const url = useParams()['*']
	const { i18n } = useTranslation()
	//console.log('engineParsedRules:', engine.context.parsedRules)
	console.log('url:', url)
	const documentationPath = '/documentation'

	return (
		<DocumentationStyle>
			<RulePage
				language={i18n.language}
				rulePath={url}
				engine={engine}
				documentationPath={documentationPath}
				renderers={{
					Head: Helmet,
					Link: Link,
					Text: ({ children }) => (
						<>
							{/* This isn't clean, created as many Helmets as there are text nodes. Should be integrated in publicodes as an option */}
							<Helmet>
								<meta
									property="og:image"
									content={`https://ogimager.osc-fr1.scalingo.io/capture/${encodeURIComponent(
										window.location.href
									)}/${encodeURIComponent('documentation-rule-root header')}`}
								/>
							</Helmet>
							<Markdown children={children} />
							{children.includes('<RavijenChart/>') && (
								<GraphContainer>
									<RavijenChart />
								</GraphContainer>
							)}
							{children.includes('<RavijenChartSocietaux/>') && (
								<GraphContainer>
									<RavijenChart target="services sociétaux" numberBottomRight />
								</GraphContainer>
							)}
						</>
					),
					References: References,
				}}
			/>
		</DocumentationStyle>
	)
}

// Not integratable yet, see https://github.com/betagouv/publicodes/issues/336
const GithubContributionLink = ({ dottedName }) => (
	<a
		href={`https://github.com/search?q=${encodeURIComponent(
			`repo:datagir/nosgestesclimat "${dottedName}:"`
		)} path:data&type=code`}
	>
		✏️ Contribuer
	</a>
)

function BackToSimulation() {
	const url = useSelector(currentSimulationSelector)?.url
	const navigate = useNavigate()

	console.log('url', url)

	return (
		<button
			className="ui__ simple small push-left button"
			onClick={() => {
				navigate(url)
			}}
		>
			<Trans>Reprendre la simulation</Trans>
		</button>
	)
}
