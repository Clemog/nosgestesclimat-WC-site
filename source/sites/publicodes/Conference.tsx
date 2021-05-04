import { useEffect, useState } from 'react'
import emoji from 'react-easy-emoji'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { usePersistingState } from '../../components/utils/persistState'
import fruits from './fruits.json'

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
const getRandomColor = () =>
	'#' + Math.floor(Math.random() * 16777215).toString(16)

export default () => {
	const [elements, setElements] = useState([])
	const [users, setUsers] = useState([])
	const [newRoom, setNewRoom] = useState(null)
	const { room } = useParams()
	const [username, setUsername] = usePersistingState(
		'pseudo',
		fruits[getRandomInt(fruits.length)]
	)

	useEffect(() => {
		if (!room) return null
		const ydoc = new Y.Doc()
		var provider
		try {
			//try catch to avoid hot-reloading errors "room already ..."
			// clients connected to the same room-name share document updates
			provider = new WebrtcProvider(room, ydoc, {})
		} catch (error) {
			console.log(error)
		}
		const awareness = provider.awareness

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
			color: getRandomColor(), // should be a hex color
		})
		const simulations = ydoc.get('simulations', Y.Map)
		simulations.observe((event) => {
			setElements(simulations.toJSON())
		})

		setInterval(
			() =>
				simulations.set(username, {
					nodeValue: Math.round(Math.random() * 10),
				}),
			5000
		)
	}, [])
	return (
		<div>
			<h1>🏟️ Conférence</h1>
			<p>Vie privée blabla</p>
			{room && (
				<div>
					<p>
						Partagez <a href={'/conférence/' + room}>ce lien</a> avec vos amis,
						collègues, etc.
					</p>
					<p css="color: #78b159; font-weight: bold">
						{emoji('🟢')} {users.length} clients connectés
					</p>
					<ul
						css={`
							display: flex;
							list-style-type: none;
							li {
								margin: 0.6rem;
							}
						`}
					>
						{users.map((u) => (
							<li
								key={u.name}
								css={`
									color: ${u.color};
								`}
							>
								{emoji('👤 ')}
								{u.name}
							</li>
						))}
					</ul>
				</div>
			)}
			{!room && (
				<label>
					<p>Choisissez un nom de salle</p>
					<input
						placeholder="chaton-hurlant-29"
						value={newRoom}
						onChange={(e) => setNewRoom(e.target.value)}
					/>
					{newRoom && (
						<Link to={'/conférence/' + newRoom}>
							<button>C'est parti ! </button>
						</Link>
					)}
				</label>
			)}
			<br />
			<br />
			<br />
			<br />
			{JSON.stringify(elements)}
			<ul>
				{Object.entries(elements).map(([key, { nodeValue }]) => (
					<li key={key}>{nodeValue}</li>
				))}
				Moyenne
				{Object.values(elements).reduce(
					(memo, { nodeValue }) => memo + nodeValue,
					0
				) / Object.values(elements).length}
			</ul>
		</div>
	)
}
