import SelectWeeklyDiet from './select/SelectWeeklyDiet'
import SelectDevices from './select/SelectDevices'
import SelectAgeDevice from './select/SelectAgeDevice'
import SelectWeeklyTransport from './select/SelectWeeklyTransport'
import SelectWeeklyTrain from './select/SelectWeeklyTrain'
import SelectMoyenPro from './select/SelectMoyenPro'
import SelectAnnualPlane from './select/SelectAnnualPlane'
import SelectAnnualTrain from './select/SelectAnnualTrain'
import SelectWeeklyMetroBus from './select/SelectWeeklyMetroBus'
import { DottedName } from 'Rules'

const mosaicQuestions: Array<{
	question: string
	description: string
	isApplicable: Function
	component: React.FunctionComponent
	dottedName: DottedName
}> = [
	{
		dottedName: "numérique . liste d'appareils",
		question: 'Dans le cadre professionnel, de quels équipements disposez-vous ',
		description: `
L'essentiel de l'empreinte du numérique provient des appareils eux-mêmes.

Renseignez ici vos appareils parmi ces choix limités.

> 📡 Nous ajouterons au fur et à mesure d'autres types d'appareils.
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('numérique . équipements') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: "déplacements professionnels . moyen . liste moyens",
		question:
			'Quel(s) moyen(s) de transport utilisez-vous pour vos déplacements professionnels  ?',
		description: `
A compléter 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen') &&
			dottedName.includes(' . présent'),
		component: SelectMoyenPro,
	},
	{
		dottedName: "déplacements professionnels . moyen . avion . heures",
		question:
			'Combien d’heures par an voyagez-vous en avion dans le cadre de vos déplacements professionnels ?',
		description: `
A compléter 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen . avion') &&
			dottedName.includes(' . heures'),
		component: SelectAnnualPlane,
	},
	{
		dottedName: "déplacements professionnels . moyen . train . heures",
		question:
			'Combien d’heures par an voyagez-vous en train dans le cadre de vos déplacements professionnels ?',
		description: `
A compléter 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen . train') &&
			dottedName.includes(' . heures'),
		component: SelectAnnualTrain,
	},
	{
		dottedName: "déplacements professionnels . moyen . transports en commun . heures",
		question:
			'Combien d’heures par semaine voyagez-vous en transports en commun dans le cadre de vos déplacements professionnels ?',
		description: `
A compléter 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen . transports en commun') &&
			dottedName.includes(' . heures'),
		component: SelectWeeklyMetroBus,
	},
	{
		dottedName: 'alimentation . régime',
		question:
			'Choisissez les plats de vos midis pour une semaine type dans le cadre professionnel (5 repas) ',
		description: `

Choisissez 5 plats qui représentent votre semaine type dans le cadre professionnel: 5 repas du midi. 

> Bien sûr, toute la diversité des régimes ne peut-être simplifiée en 4 boutons : il manque par exemple le poisson... le menu du pêcheur arrive bientôt ! 

			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('alimentation . plats') &&
			dottedName.includes(' . nombre'),
		component: SelectWeeklyDiet,
	},
	{
		dottedName: 'transport . domicile-travail . moyens de transport',
		question:
			'Quelle à la répartition d’usage des différents modes de transports que vous utilisez ? ',
		description: `

A compléter 

> A compléter

		`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('trajets domicile-travail . moyens de transport') &&
			dottedName.includes(' . pourcent'),
		component: SelectWeeklyTransport,
	},
	{
		dottedName: 'transport . domicile-travail . moyens de transport . train',
		question:
			'Combien de temps (en heures), en moyenne, dure votre trajet domicile-travail en train (aller simple) ? ',
		description: `

A compléter 

> A compléter

		`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('trajets domicile-travail . moyens de transport . train') &&
			dottedName.includes(' . heures par trajet'),
		component: SelectWeeklyTrain,
	},		
]

export default mosaicQuestions