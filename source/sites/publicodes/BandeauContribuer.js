import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import animate from 'Components/ui/animate'
import { Trans } from 'react-i18next'

export default () => {
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		setTimeout(() => setVisible(true), 5000)
	}, [])
	if (!visible) return null
	return (
		<div css=" text-align: center; color: black; margin: .6rem 0">
			Une question, un problème ? {emoji('📮')}{' '}
			<Link to={'/contribuer?fromLocation=' + window.location}>
				Découvrez la FAQ !
			</Link>
		</div>
	)
}
