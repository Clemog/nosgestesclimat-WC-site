import { useState } from 'react'
import emoji from 'react-easy-emoji'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { conferenceImg } from '../../../components/SessionBar'
import Meta from '../../../components/utils/Meta'
import { ScrollToTop } from '../../../components/utils/Scroll'
import Instructions from './Instructions'
import Stats from './Stats'
import { UserBlock } from './UserList'
import useYjs from './useYjs'
import { defaultThreshold, getExtremes } from './utils'

export const ConferenceTitle = styled.h2`
	margin-top: 0.6rem;
	@media (min-width: 800px) {
		display: none;
	}
	> img {
		width: 4rem;
	}
	display: flex;
	align-items: center;
	font-size: 120%;
`

export default () => {
	const { room } = useParams()
	const { elements, users, username } = useYjs(room, 'p2p')

	const [threshold, setThreshold] = useState(defaultThreshold)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	if (!room || room === '') {
		return <Navigate to="/groupe" replace />
	}
	const extremes = getExtremes(elements, threshold)

	const { t } = useTranslation()

	return (
		<div>
			<Meta
				title={t('Conférence') + ' ' + room}
				description={
					t('Participez à la conférence') +
					' ' +
					room +
					' ' +
					t('et visualisez les résultats du groupe')
				}
			/>
			{room && <ScrollToTop />}
			<h1>
				<Trans>Conférence</Trans>
			</h1>
			<ConferenceTitle>
				<img src={conferenceImg} alt="" />
				<span css="text-transform: uppercase">«&nbsp;{room}&nbsp;»</span>
			</ConferenceTitle>
			<Stats
				{...{
					elements: Object.entries(elements).map(([username, data]) => ({
						...data,
						username,
					})),
					users,
					username,
					threshold,
					setThreshold,
				}}
			/>
			{room && (
				<div>
					<UserBlock {...{ users, extremes, username, room }} />
				</div>
			)}
			<button
				className="ui__ link-button"
				onClick={() => {
					navigate('/')

					dispatch({ type: 'UNSET_CONFERENCE' })
				}}
			>
				{emoji('🚪')} {t('Quitter la conférence')}
			</button>
			<Instructions {...{ room, started: true }} />
			<h2>Et mes données ?</h2>
			<p>
				{emoji('🕵 ')}En participant, vous acceptez de partager vos résultats
				agrégés de simulation avec les autres participants de la conférence : le
				total et les catégories (déplacements domicile-travail, alimentation, etc.). En revanche, nos
				serveurs ne les stockent pas : cela fonctionne en P2P (pair à pair).
			</p>
		</div>
	)
}

const NamingBlock = ({ newRoom, setNewRoom }) => {
	const inputRef = useRef(null)
	return (
		<>
			<label>
				<form>
					<input
						value={newRoom}
						className="ui__"
						onChange={(e) => setNewRoom(e.target.value)}
						css="width: 80% !important"
						ref={inputRef}
					/>
					<button
						onClick={(e) => {
							setNewRoom('')
							inputRef.current.focus()
							e.preventDefault()
						}}
						title="Effacer le nom actuel"
					>
						{emoji('❌')}
					</button>
				</form>
			</label>

			<button
				onClick={() => setNewRoom(generateRoomName())}
				className="ui__ dashed-button"
			>
				{emoji('🔃')} Générer un autre nom
			</button>
			{newRoom && newRoom.length < 10 && (
				<p>
					⚠️ Votre nom de salle est court, vous risquez de vous retrouver avec
					des inconnus...
				</p>
			)}
		</>
	)
}

const UserBlock = ({ extremes, users, username, room }) => (
	<div>
		<h2 css="display: inline-block ;margin-right: 1rem">
			{emoji('👤 ')}
			Qui est connecté ?
		</h2>
		<span css="color: #24D0CA; font-weight: bold">
			{emoji('🟢')} {users.length} participant{plural(users)}
		</span>
		<UserList users={users} username={username} extremes={extremes} />
		{extremes.length > 0 && (
			<div>
				{emoji('⚠️')} Certains utilisateurs ont des bilans au-dessus de{' '}
				{extremeThreshold / 1000} t, nous les avons exclus.
			</div>
		)}
	</div>
)

const InstructionBlock = ({ title, index, children }) => (
	<div
		className="ui__ card"
		css={`
			display: flex;
			justify-content: start;
			align-items: center;
			margin: 1rem;
			padding-bottom: 0.6rem;
			@media (max-width: 800px) {
				flex-direction: column;
			}
		`}
	>
		<div
			css={`
				font-size: 300%;
				padding: 1rem;
				background: var(--lighterColor);
				border-radius: 5rem;
				margin: 0 1rem;
			`}
		>
			{index}
		</div>
		<div>
			<h3>{title}</h3>
			{children}
		</div>
	</div>
)
const Instructions = ({ room, newRoom, setNewRoom }) => (
	<div>
		{!room && <p>Faites le test à plusieurs ! </p>}
		<h2>Comment ça marche ?</h2>
		<InstructionBlock
			index="1"
			title={
				<span>
					{emoji('💡 ')} Choisissez un nom de salle pour lancer une conférence
				</span>
			}
		>
			{!room && <NamingBlock {...{ newRoom, setNewRoom }} />}
			{room && <p>{emoji('✅')} C'est fait</p>}
		</InstructionBlock>
		<InstructionBlock
			index="2"
			title={
				<span>{emoji('🔗 ')} Partagez le lien à vos amis, collègues, etc.</span>
			}
		>
			{!newRoom && !room ? (
				<p>Choississez d'abord un nom</p>
			) : (
				<ShareButton
					text="Faites un test d'empreinte climat avec moi"
					url={
						'https://' + window.location.hostname + '/conférence/' + newRoom ||
						room
					}
					title={'Nos Gestes Climat Conférence'}
				/>
			)}
		</InstructionBlock>
		<InstructionBlock
			index="3"
			title={<span>{emoji('👆 ')} Faites toutes et tous votre simulation</span>}
		>
			{room ? (
				<Link to={'/simulateur/bilan'}>
					<button className="ui__ button plain">Faites votre test </button>
				</Link>
			) : (
				<p>
					Au moment convenu, ouvrez ce lien tous en même temps et
					commencez&nbsp; votre simulation.
				</p>
			)}
		</InstructionBlock>
		<InstructionBlock
			index="4"
			title={
				<span>
					{emoji('🧮 ')}Visualisez ensemble les résultats de votre groupe
				</span>
			}
		>
			Les résultats pour chaque catégorie (alimentation, déplacements domicile-travail, numérique
			...) s'affichent progressivement et en temps réel pour l'ensemble du
			groupe.
		</InstructionBlock>
		{newRoom !== '' && !room && (
			<InstructionBlock index="5" title="Prêt à démarrer ?">
				<p>
					<Link to={'/conférence/' + newRoom}>
						<button type="submit" className="ui__ button small plain">
							C'est parti !{' '}
						</button>
					</Link>
				</p>
			</InstructionBlock>
			{newRoom !== '' && !room && (
				<InstructionBlock
					index="2"
					title={
						<span>{emoji('⏲️')} Choississez votre type de conférence</span>
					}
				>
					<div
						css={`
							display: flex;
							label {
								flex: auto !important;
							}
						`}
					>
						<label className="ui__ card box interactive">
							<input
								type="radio"
								name="connectionType"
								value="p2p"
								checked={connectionType === 'p2p'}
								onChange={(e) => setConnectionType(e.target.value)}
							/>
							Mode éphémère : parfait entre amis, ou pour une présentation
							intéractive lors d'une conférence. Les données restent entre vous
							(pair-à-pair), sans serveur.
						</label>
						<label className="ui__ card box interactive">
							<input
								type="radio"
								name="connectionType"
								value="database"
								checked={connectionType === 'database'}
								onChange={(e) => setConnectionType(e.target.value)}
							/>
							Mode sondage : les données sont stockées sur notre serveur,
							restent accessibles dans le temps. Si votre entreprise bride votre
							réseau interne, utilisez ce mode.
						</label>
					</div>
				</InstructionBlock>
			)}
			<InstructionBlock
				index="3"
				title={
					<span>
						{emoji('🔗 ')} Partagez le lien à vos amis, collègues, etc.
					</span>
				}
			>
				{!newRoom && !room ? (
					<p>Choississez d'abord un nom</p>
				) : (
					<div
						css={`
							display: flex;
							flex-wrap: wrap;
							justify-content: center;
							align-items: center;
						`}
					>
						<QRCode
							value={shareURL}
							size={200}
							bgColor={'#ffffff'}
							fgColor={color}
							level={'L'}
							includeMargin={false}
							renderAs={'canvas'}
						/>
						<ShareButton
							text="Faites un test d'empreinte climat avec moi"
							url={shareURL}
							title={'Nos Gestes Climat Conférence'}
						/>
					</div>
				)}
			</InstructionBlock>
			<InstructionBlock
				index="4"
				title={
					<span>{emoji('👆 ')} Faites toutes et tous votre simulation</span>
				}
			>
				{room ? (
					<Link to={'/simulateur/bilan'}>
						<button className="ui__ button plain">Faites votre test </button>
					</Link>
				) : (
					<p>
						Au moment convenu, ouvrez ce lien tous en même temps et
						commencez&nbsp; votre simulation.
					</p>
				)}
			</InstructionBlock>
			<InstructionBlock
				index="5"
				title={
					<span>
						{emoji('🧮 ')}Visualisez ensemble les résultats de votre groupe
					</span>
				}
			>
				Les résultats pour chaque catégorie (alimentation, transport, logement
				...) s'affichent progressivement et en temps réel pour l'ensemble du
				groupe.
			</InstructionBlock>
			{newRoom !== '' && !room && (
				<InstructionBlock index="6" title="Prêt à démarrer ?">
					<p>
						<Link to={URLPath}>
							<button type="submit" className="ui__ button plain">
								C'est parti !{' '}
							</button>
						</Link>
					</p>
				</InstructionBlock>
			)}
		</div>
	)
}
