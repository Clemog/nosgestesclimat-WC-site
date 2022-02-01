import NumberedMosaic from './select/NumberedMosaic'
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
		question: 'Dans le cadre professionnel, de quels équipements informatiques disposez-vous ?',
		description: `
Indiquez, ici, les équipements mis à disposition par votre organisation pour votre activité professionnelle. 
La majorité de l’impact du numérique ne provient pas de l’usage mais bien de l’équipement. 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('numérique . équipements') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: "déplacements professionnels . moyen . liste moyens",
		question:
			'Quel(s) moyen(s) de transport utilisez-vous pour vos déplacements professionnels ?',
		description: `
Indiquez, ici, les moyens de transports que vous utilisez pour effectuer vos déplacements professionnels. 
Ces moyens de transports ont des impacts différents, c’est pourquoi nous vous demandons de sélectionner ceux que vous utilisez. 
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
Indiquez, ici, le nombre d’heures moyen que vous passez en court, moyen et long courrier. 
L’avion est de loin le mode de transport le plus polluant. Ainsi, même si vous n’avez effectué qu’un court courrier au cours de l’année, merci de l’indiquer. 
De plus, les vols court, moyen et long courriers n’ont pas le même impact sur l’environnement, c’est pourquoi nous vous demandons de les différencier. 
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
Ces moyens de transports ont des impacts différents, c’est pourquoi nous vous demandons d’indiquer le nombre d’heures moyen que vous passez dans ces différents transports pour effectuer vos déplacements professionnels.  
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements professionnels . moyen . transports en commun') &&
			dottedName.includes(' . heures'),
		component: SelectWeeklyMetroBus,
	},
	{
		dottedName: 'transport . vacances',
		options: { defaultsToFalse: true },
		question: 'Que possédez-vous pour vos week-end, vos vacances ?',
		description: `
A compléter

			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('transport . vacances') &&
			dottedName.includes(' . propriétaire'),
		component: SelectDevices,
	},
	{
		dottedName: 'alimentation . régime',
		question:
			'Choisissez les plats que vous consommez les midis d’une semaine type dans le cadre professionnel (5 repas) ?',
		description: `
Indiquez, ici, 5 repas représentatifs de votre consommation pendant une semaine de travail. 
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('alimentation . plats') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
		options: { chipsTotal: 5 },
	},
	// {
	// 	dottedName: 'divers . textile',
	// 	question: 'Quels vêtements achetez-vous en général dans une année ?',
	// 	isApplicable: (dottedName: DottedName) =>
	// 		dottedName.includes('divers . textile') &&
	// 		dottedName.includes(' . nombre'),
	// 	component: NumberedMosaic,
	// },
	{
		dottedName: 'transport . domicile-travail . moyens de transport',
		question:
			'Quelle à la répartition d’usage des différents modes de transports que vous utilisez ? ',
		description: `
Indiquez, ici, la répartition de vos moyens de transport pour vous rendre sur votre lieu de travail. 
Par exemple, si vous utilisez différents moyens de transport sur un même trajet (voiture plus tramway par exemple) ou encore si vous utilisez différents moyens de transport selon les jours ou les saisons, etc. (vélo en été, voiture en hiver par exemple).
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