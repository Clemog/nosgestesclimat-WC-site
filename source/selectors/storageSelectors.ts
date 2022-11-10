import { RootState, Simulation } from 'Reducers/rootReducer'
import { DottedName } from 'Rules'
import { Lang } from '../locales/translation'

export type SavedSimulation = {
	situation: Simulation['situation']
	foldedSteps: Array<DottedName> | undefined
	actionChoices: Object
	persona: string
	introTutorials: Object
	storedTrajets: Object
	url: string
	localisation: Object | undefined
}

export const currentSimulationSelector = (
	state: RootState
): SavedSimulation => {
	return {
		situation: state.simulation?.situation ?? {},
		foldedSteps: state.simulation?.foldedSteps,
		actionChoices: state.actionChoices,
		persona: state.simulation?.persona,
		introTutorials: state.tutorials.testIntro,
		storedTrajets: state.storedTrajets,
		url: state.simulation?.url,
		localisation: state.localisation,
	}
}

export const createStateFromSavedSimulation = (
	state: RootState
): Partial<RootState> => {
	if (!state.previousSimulation) return {}

	return {
		simulation: {
			...state.simulation,
			situation: state.previousSimulation.situation || {},
			foldedSteps: state.previousSimulation.foldedSteps || [],
			persona: state.previousSimulation.persona,
		} as Simulation,
		previousSimulation: null,
	}
}
