import { useEffect, useState } from 'react'
import emoji from 'react-easy-emoji'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { usePersistingState } from 'Components/utils/persistState'
import fruits from './fruits.json'
import UserList from './UserList'
import { mean } from 'ramda'
import Stats from './Stats'
import { stringToColour, getRandomInt, generateRoomName } from './utils'

export default () => {
	const [elements, setElements] = useState([])
	const [users, setUsers] = useState([])
	const [newRoom, setNewRoom] = useState(generateRoomName())
	const { room } = useParams()
	const [username, setUsername] = usePersistingState(
		'pseudo',
		fruits[getRandomInt(fruits.length)]
	)

	const dispatch = useDispatch()

	const conference = useSelector((state) => state.conference)

	useEffect(() => {
		if (!conference) {
			const ydoc = new Y.Doc()
			const provider = new WebrtcProvider(room, ydoc, {})
			dispatch({ type: 'SET_CONFERENCE', room, ydoc, provider })
		} else {
			console.log('yo')
			const { room } = conference

			const ydoc = conference.ydoc,
				provider = conference.provider

			const awareness = provider.awareness

			setUsers(Array.from(awareness.getStates().values()))

			// You can observe when a any user updated their awareness information
			awareness.on('change', (changes) => {
				// Whenever somebody updates their awareness information,
				// we log all awareness information from all users.
				setUsers(Array.from(awareness.getStates().values()))
			})

			awareness.setLocalState({
				// Define a print name that should be displayed
				name: username,
				// Define a color that should be associated to the user:
				color: stringToColour(username), // should be a hex color
			})
			const simulations = conference.ydoc.get('simulations', Y.Map)
			setElements(simulations.toJSON())
			simulations.observe((event) => {
				console.log('did observe from Conf', event)
				setElements(simulations.toJSON())
			})
		}
	}, [room, conference])

	return (
		<div>
			<h1>
				{emoji('🏟️ ')} Conférence
				<span
					css={`
						margin-left: 1rem;
						background: var(--color);
						color: var(--textColor);
						padding: 0.1rem 0.4rem;
						border-radius: 0.6rem;
					`}
				>
					beta
				</span>
			</h1>
			<Stats {...{ elements, users, username }} />

			{room && (
				<div>
					<UserBlock {...{ users, username, room }} />

					<Instructions />
				</div>
			)}
			{!room && <NamingBlock />}
			<Instructions />
			<h2>Et mes données ?</h2>
			<p>
				{emoji('🕵 ')}En participant, vous acceptez de partager vos résultats
				agrégés de simulation avec les autres participants de la conférence : le
				total et les catégories (transport, logement, etc.). En revanche, nos
				serveurs ne les stockent pas : cela fonctionne en P2P (pair à pair).
			</p>
			<p>
				Seul le nom de la salle de conférence sera indexé dans{' '}
				<a href="https://nosgestesclimat.fr/vie-privée">
					les statistiques d'utilisation
				</a>{' '}
				de Nos Gestes Climat.{' '}
			</p>
		</div>
	)
}

const NamingBlock = ({ newRoom, setNewRoom }) => (
	<>
		<label>
			<p>Choisissez un nom de salle pour lancer ou rejoindre une conférence.</p>
			<form>
				<input
					value={newRoom}
					className="ui__"
					onChange={(e) => setNewRoom(e.target.value)}
				/>{' '}
				<Link to={'/conférence/' + newRoom}>
					<button type="submit" className="ui__ button small plain">
						C'est parti !{' '}
					</button>
				</Link>
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
				⚠️ Votre nom de salle est court, vous risquez de vous retrouver avec des
				inconnus...
			</p>
		)}
	</>
)

const UserBlock = ({ users, username, room }) => (
	<div>
		<h2 css="display: inline-block ;margin-right: 1rem">
			{emoji('👤 ')}
			Qui est connecté ?
		</h2>
		<span css="color: #78b159; font-weight: bold">
			{emoji('🟢')} {users.length} participant{plural(users)}
		</span>
		<UserList users={users} username={username} />
	</div>
)

const Instructions = ({ room }) => (
	<div>
		<p>Faites le test Nos Gestes Climat à plusieurs ! </p>
		<h2>Comment ça marche ?</h2>
		<p>
			1) {emoji('💡 ')} Choisissez un nom de salle pour lancer ou rejoindre une
			conférence
		</p>
		<p>
			1) {emoji('🔗 ')} Partagez{' '}
			{room ? <a href={'/conférence/' + room}>ce lien</a> : 'le lien '}
			avec vos amis, collègues, etc.
		</p>
		2) {emoji('👆 ')}Faites tous et toutes
		<Link to={'/simulateur/bilan'}>
			<button className="ui__ button small " css="margin-left: .6rem">
				votre simulation
			</button>
		</Link>
		<p>3) {emoji('🧮 ')}Visualisez ensemble les résultats de votre groupe</p>
	</div>
)

const plural = (list) => (list.length > 1 ? 's' : '')
