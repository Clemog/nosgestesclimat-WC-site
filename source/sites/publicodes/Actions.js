import { utils } from 'publicodes'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import tinygradient from 'tinygradient'
import Title from '../../components/Title'
import Meta from '../../components/utils/Meta'
import Action from './Action'
import ActionPlus from './ActionPlus'
import ActionsList from './ActionsList'
import CarbonImpact from './CarbonImpact'
import ListeActionPlus from './ListeActionPlus'

const { encodeRuleName, decodeRuleName } = utils

const gradient = tinygradient(['#0000ff', '#ff0000']),
	colors = gradient.rgb(20)

export default ({}) => {
	return (
		<>
			<Meta
				title="Passer à l'action"
				description="Découvrez les gestes qui vous permettent de réduire votre empreinte climat"
			/>
			<Title>Agir</Title>
			<CarbonImpact actionMode />
			<Switch>
				<Route exact path="/actions/plus">
					<ListeActionPlus />
				</Route>
				<Route path="/actions/plus/:encodedName+">
					<ActionPlus />
				</Route>
				<Route path="/actions/liste">
					<ActionsList display="list" />
				</Route>
				<Route path="/actions/:encodedName+">
					<Action />
				</Route>

				<Route path="/actions">
					<ActionsList display="list" />
				</Route>
			</Switch>
		</>
	)
}

const ActionList = animated(({}) => {
	const location = useLocation()
	let { category } = useParams()

	const rules = useSelector((state) => state.rules)
	const flatActions = rules['actions']

	const [radical, setRadical] = useState(true)

	const simulation = useSelector((state) => state.simulation)

	// Add the actions rules to the simulation, keeping the user's situation
	const config = {
		...(simulation?.config || {}),
		objectifs: ['bilan', ...flatActions.formule.somme],
	}

	const objectifs = useSelector(objectifsSelector)

	const engine = useContext(EngineContext)

	const targets = objectifs.map((o) => engine.evaluate(o))

	const stateConfig = useSelector(configSelector),
		configSet = stateConfig && Object.keys(stateConfig).length
	const answeredQuestions = useSelector(answeredQuestionsSelector)
	const mode = useSelector((state) => state.actionMode)

	const dispatch = useDispatch()
	useEffect(() => dispatch(setSimulationConfig(config)), [location.pathname])
	if (!configSet) return <div>Config not set</div>

	const [bilans, actions] = partition((t) => t.dottedName === 'bilan', targets)

	const filterByCategory = (actions) =>
		actions.filter((action) =>
			category ? splitName(action.dottedName)[0] === category : true
		)
	
	const individualActions = (a) =>
		actions.filter((a) =>
			rules[a.dottedName].type === 'individuel'
		)
	
	const collectiveActions = (a) =>
		actions.filter((a) =>
			rules[a.dottedName].type === 'collectif'
		)

	const effortScale = { conséquent: 3, modéré: 2, faible: 1, undefined: 0 }
	const sortedActionsByMode =
			mode === 'individuel'
				? sortBy((a) => effortScale[rules[a.dottedName].effort])(
					individualActions(actions).filter((a) => rules[a.dottedName].effort != null)
				  )
				: sortBy((a) => (radical ? -1 : 1) * correctValue(a))(collectiveActions(actions)),
		sortedActions = sortBy((action) => {
			const flatRule = rules[action.dottedName]
			return disabledAction(flatRule, action.nodeValue)
		}, sortedActionsByMode)

	const finalActions = filterByCategory(sortedActions)

	const categories = extractCategories(rules, engine)
	const countByCategoryIndividual = individualActions(actions).reduce((memo, next) => {
		const category = splitName(next.dottedName)[0]
		return { ...memo, [category]: (memo[category] || 0) + 1 }
	}, {})
	const countByCategoryCollective = collectiveActions(actions).reduce((memo, next) => {
		const category = splitName(next.dottedName)[0]
		return { ...memo, [category]: (memo[category] || 0) + 1 }
	}, {})

	return (
		<div
			css={`
				padding: 0 0.3rem 1rem;
				max-width: 600px;
				margin: 1rem auto;

				${sessionBarMargin}
			`}
		>
			<SessionBar />
			{!mode ? (
				<ModeChoice />
			) : (
				<>
					<h1 css="margin: 1rem 0 .6rem;font-size: 160%">
						Comment réduire mon empreinte ?
					</h1>
					<button
						className="ui__ small button"
						css={`
							margin-bottom: .8rem;
							display: inline-block;
						`}
						onClick={() => dispatch(setActionMode(null))}
					>
						<span css="font-size: 80%;">
							Revenir à la page précédente
						</span>
					</button>
					<CategoryFilters
						categories={categories}
						selected={category}
						countByCategory={mode === 'individuel' ? countByCategoryIndividual : countByCategoryCollective}
					/>
					{/* {mode === 'collectif' && (
						<button onClick={() => setRadical(!radical)}>
							Trié par :{' '}
							{radical ? (
								<span>le plus d'impact {emoji('📉')}</span>
							) : (
								<span>le moins d'impact{emoji('📈')}</span>
							)}
						</button>
					)} */}
					{finalActions.map((evaluation) => (
						<ActionVignette
							key={evaluation.dottedName}
							rule={rules[evaluation.dottedName]}
							evaluation={evaluation}
							total={bilans.length ? bilans[0].nodeValue : null}
							effort={
								mode === 'individuel' &&
								effortScale[rules[evaluation.dottedName].effort]
							}
						/>
					))}
					{mode === 'individuel' && (
					<div css="font-size: 100%; text-align: center">
						<em>en CO₂e / an et proportion de votre total</em>
					</div>
					)}
					{/* <IllustratedButton to={'/actions/plus'} icon="📚">
						<div>
							<div>Comprendre les actions</div>
							<p>
								<small>
									Au-delà d'un simple chiffre, découvrez les enjeux qui se
									cachent derrière chaque action.
								</small>
							</p>
						</div>
					</IllustratedButton> */}
				</>
			)}
		</div>
	)
})
