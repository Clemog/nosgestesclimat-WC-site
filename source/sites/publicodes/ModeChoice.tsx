import IllustratedButton from 'Components/IllustratedButton'
import { Trans } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setActionMode } from '../../actions/actions'

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
				<h1>
					<Trans>Passer à l'action</Trans>
				</h1>
				<p>
					<Trans>Votre mission : réduire votre empreinte.</Trans>
				</p>
				<p>
					<Trans>Comment voulez-vous procéder ?</Trans>
				</p>
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
