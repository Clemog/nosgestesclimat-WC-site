import IllustratedButton from 'Components/IllustratedButton'
import { useDispatch } from 'react-redux'
import { setActionMode } from '../../actions/actions'
import { useSafePreviousSimulation } from '../../components/SessionBar'

export default ({}) => {
	const dispatch = useDispatch()

	return (
		<div
			css={`
				> div {
					margin: 4rem 1rem;
				}
			`}
		>
			<div>
				<h1>Passer à l'action</h1>
				<p>Votre mission : réduire votre empreinte.</p>
				<p>Comment voulez-vous procéder ?</p>
			</div>
			<div>
				<IllustratedButton
					icon="👤"
					to="/actions"
					onClick={() => dispatch(setActionMode('individuel'))}
				>
					<div>
						<div>Individuel</div>
						<p>
							<small>On vous propose une sélection graduelles d'actions individuelles.</small>
						</p>
					</div>
				</IllustratedButton>
				<IllustratedButton
					to="/actions"
					icon="👥"
					onClick={() => dispatch(setActionMode('collectif'))}
				>
					<div>
						<div>Collectif</div>
						<p>
							<small>Les actions collectives c'est ici !</small>
						</p>
					</div>
				</IllustratedButton>
			</div>
		</div>
	)
}
