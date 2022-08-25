import { Markdown } from 'Components/utils/markdown'
import about from 'raw-loader!./about.md'
import Meta from '../../../components/utils/Meta'

export default () => (
	<section className="ui__ container" id="about">
		<Meta
			title="À propos"
			description={`
Ce simulateur vous permet d'évaluer votre empreinte carbone individuelle professionnelle (liée à vos activités professionnelles) et par grandes catégories (alimentation, déplacements domicile-travail, déplacements professionnels, véhicules de fonction, numérique) et surtout de passer à l’action. Nous sommes conscients que le changement de pratiques et en particulier en entreprise prend du temps. Nous avons fait le choix d’inclure des pistes d’action de réduction des émissions de gaz à effet de serre à l’échelle de l’entreprise car nous sommes convaincus que ces actions collectives sont nécessaires à la réduction des émissions de gaz à effet de serre. Les actions individuelles et collectives proposées apparaissent en fonction de vos réponses.

		`}
		/>
		<p>
			<Markdown source={about} />
		</p>
	</section>
)
