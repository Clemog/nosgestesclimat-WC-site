import SelectWeeklyDiet from './select/SelectWeeklyDiet'
import SelectDevices from './select/SelectDevices'
import SelectWeeklyTransport from './select/SelectWeeklyTransport'
import SelectVehicule from './select/SelectVehicule'
import SelectMoyenPro from './select/SelectMoyenPro'
import SelectAnnualPlane from './select/SelectAnnualPlane'
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
			dottedName.includes('numérique') && dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: "déplacements professionnels . véhicule fonction . liste véhicules",
		question:
			'Quel est le type de véhicule dont vous disposez ?',
		description: `
A compléter 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen . véhicule de fonction') &&
			dottedName.includes(' . détient'),
		component: SelectVehicule,
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
			dottedName.includes('déplacements domicile-travail . moyens de transport') &&
			dottedName.includes(' . pourcent'),
		component: SelectWeeklyTransport,
	},	
]

export default mosaicQuestions
