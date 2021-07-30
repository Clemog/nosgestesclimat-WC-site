import SelectWeeklyDiet from './select/SelectWeeklyDiet'
import SelectDevices from './select/SelectDevices'
import SelectWeeklyTransport from './select/SelectWeeklyTransport'
import SelectMoyenPro from './select/SelectMoyenPro'
import SelectAnnualPlane from './select/SelectAnnualPlane'
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
			dottedName.includes('déplacements . déplacements professionnels . moyen') &&
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
			dottedName.includes('déplacements . déplacements professionnels . moyen . avion') &&
			dottedName.includes(' . heures'),
		component: SelectAnnualPlane,
	},
	{
		dottedName: "déplacements professionnels . moyen . transports en commun . heures",
		question:
			'Combien d’heures par semaine voyagez-vous en transports en commun dans le cadre de vos déplacements professionnels ?',
		description: `
Ces moyens de transports ont des impacts différents, c’est pourquoi nous vous demandons d’indiquer le nombre d’heures moyen que vous passez dans ces différents transports pour effectuer vos déplacements professionnels.  
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements . déplacements professionnels . moyen . transports en commun') &&
			dottedName.includes(' . heures'),
		component: SelectWeeklyMetroBus,
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
		component: SelectWeeklyDiet,
	},
	{
		dottedName: 'transport . domicile-travail . moyens de transport',
		question:
			'Quelle à la répartition d’usage des différents modes de transports que vous utilisez ? ',
		description: `
Indiquez, ici, la répartition de vos moyens de transport pour vous rendre sur votre lieu de travail. 
Par exemple, si vous utilisez différents moyens de transport sur un même trajet (voiture plus tramway par exemple) ou encore si vous utilisez différents moyens de transport selon les jours ou les saisons, etc. (vélo en été, voiture en hiver par exemple).
		`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('déplacements . déplacements domicile-travail . moyens de transport') &&
			dottedName.includes(' . pourcent'),
		component: SelectWeeklyTransport,
	},	
]

export default mosaicQuestions
