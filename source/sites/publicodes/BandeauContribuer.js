import animate from 'Components/ui/animate'
import { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { answeredQuestionsSelector } from '../../selectors/simulationSelectors'

export default () => {
	const answers = useSelector(answeredQuestionsSelector),
		show = answers.length > 0 // we don't want to bother the user on the first question of the experience, he has the app to discover
	// there is a small risk that the user could not answer the first question before seing this banner...
	// but the page is also accessible from the home
	// and let's not bother everyone for < 1% of our users (facts from the stats of help messages before this commit)

	const [visible, setVisible] = useState(false)

	useEffect(() => {
		show && setTimeout(() => setVisible(true), 4000)
	}, [show])

	return (
		<div css=" text-align: center; color: black; margin: .6rem 0">
			Une question, un problème ? {emoji('📮')}{' '}
			<Link to={'/contribuer?fromLocation=' + window.location}>
				Découvrez la FAQ !
			</Link>
		</div>
	)
}
