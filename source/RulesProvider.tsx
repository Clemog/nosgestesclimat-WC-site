import {
	EngineProvider,
	SituationProvider,
} from 'Components/utils/EngineContext'
import {
	configSituationSelector,
	situationSelector,
} from 'Selectors/simulationSelectors'

import useBranchData from 'Components/useBranchData'
import Engine from 'publicodes'
import { ReactNode, useEffect, useMemo } from 'react'
import { Trans } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import useRules from './components/useRules'
import { RulesOptions } from './reducers/rootReducer'

export default ({ children }) => {
	const { i18n } = useTranslation()
	const currLangAbrv = getCurrentLangAbrv(i18n)
	const branchData = useBranchData()
	const rules = useSelector((state) => state.rules)

	const dispatch = useDispatch()

	const setRules = (rules) => dispatch({ type: 'SET_RULES', rules })

	useEffect(() => {
		if (!branchData.loaded) return
		//This NODE_ENV condition has to be repeated here, for webpack when compiling. It can't interpret shouldUseLocalFiles even if it contains the same variable
		if (NODE_ENV === 'development' && branchData.shouldUseLocalFiles) {
			// TODO: find a way to use compressed models in dev mode
			console.log(
				'===== DEV MODE : the model is on your hard drive on ./nosgestesclimat ======='
			)
			// Rules are stored in nested yaml files
			const req = require.context(
				'../../nosgestesclimat-WC-model/data/',
				true,
				/\.(yaml)$/
			)

			// Bigger rule explanations are stored in nested .md files
			const reqPlus = require.context(
				'raw-loader!../../nosgestesclimat-WC-model/data/actions/plus/',
				true,
				/\.(md)$/
			)

			const plusDottedNames = Object.fromEntries(
				reqPlus
					.keys()
					.map((path) => [
						path.replace(/(\.\/|\.md)/g, ''),
						reqPlus(path).default,
					])
			)

			const rules = req.keys().reduce((memo, key) => {
				const jsonRuleSet = req(key).default || {}
				return { ...memo, ...jsonRuleSet }
			}, {})

			setRules(rules, branchData.deployURL)
		} else {
			const url =
				branchData.deployURL +
				// TODO: find a better way to manage 'en'
				`/co2-${i18n.language === 'en' ? 'en-us' : currLangAbrv}-opti.json`
			console.log('fetching:', url)
			fetch(url, { mode: 'cors' })
				.then((response) => response.json())
				.then((json) => {
					setRules(json, branchData.deployURL)
				})
		}
	}, [
		branchData.deployURL,
		branchData.loaded,
		branchData.shouldUseLocalFiles,
		i18n.language,
	])

	return <EngineWrapper rules={rules}>{children}</EngineWrapper>
}

const EngineWrapper = ({ children }) => {
	const engineState = useSelector((state) => state.engineState)
	const engineRequested = engineState !== null
	const rules = useSelector((state) => state.rules)
	const dispatch = useDispatch()
	const branchData = useBranchData()

	const engine = useMemo(() => {
		const shouldParse = engineRequested && rules
		if (shouldParse) {
			console.log(
				`⚙️ will parse ${Object.keys(rules).length} rules,  expensive operation`
			)
			console.time('⚙️ parsing rules')
			const engine = new Engine(rules)
			console.timeEnd('⚙️ parsing rules')

			return engine
		}
		return false
		// We rely on this useMemo hook to store multiple Engines.
		// Say the test component requests the optimized parsed rules,
		// then the documentation loads the complete rules, then the user
		// goes back to the test component : the Engine shouldn't be parsed again
		// but picked from the hook'e memo.
		// TODO : test this : React says we shouldn't rely on this feature
	}, [engineRequested, branchData.deployURL, rules])

	useEffect(() => {
		if (engine) dispatch({ type: 'SET_ENGINE', to: 'ready' })
		return
	}, [engine])

	const userSituation = useSelector(situationSelector),
		configSituation = useSelector(configSituationSelector),
		situation = useMemo(
			() => ({
				...configSituation,
				...userSituation,
			}),
			[configSituation, userSituation]
		)

	return (
		<EngineProvider value={engine}>
			<SituationProvider situation={situation}>{children}</SituationProvider>
		</EngineProvider>
	)
}

export const WithEngine = ({ children, fallback = null }) => {
	const dispatch = useDispatch()
	const engineState = useSelector((state) => state.engineState)
	const currentRulesOptions = useSelector((state) => state.rulesOptions)

	useRules(options)

	useEffect(() => {
		if (engineState && currentRulesOptions?.optimized === false) return // if the full set of rules is loaded, don't reload the optimzed set, since the former includes the latter
		dispatch({ type: 'SET_ENGINE', to: 'requested' })
		return
	}, [])

	if (engineState !== 'ready') return <div>Chargement du modèle de calcul</div>
	return children
}
