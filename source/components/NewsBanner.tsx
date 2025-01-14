import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getCurrentLangInfos } from '../locales/translation'
import { sortReleases } from '../pages/News'
import { capitalise0 } from '../utils'
import { usePersistingState } from './utils/persistState'

export const localStorageKey = 'last-viewed-release'

// TODO: support translations
export const determinant = (word: string) =>
	/^[aeiouy]/i.exec(word) ? 'd’' : 'de '

export default function NewsBanner() {
	const { t, i18n } = useTranslation()
	const currentLangInfos = getCurrentLangInfos(i18n)

	const releases = sortReleases(currentLangInfos.releases),
		lastRelease = releases && releases[0]

	const [lastViewedRelease, setLastViewedRelease] = usePersistingState(
		localStorageKey,
		null
	)

	// We only want to show the banner to returning visitors, so we initiate the
	// local storage value with the last release.
	if (lastViewedRelease === undefined) {
		setLastViewedRelease(lastRelease.name)
		return null
	}

	const showBanner = lastRelease.name && lastViewedRelease !== lastRelease.name

	const date = new Date(lastRelease.date).toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return showBanner ? (
		<div
			css={`
				margin: 2rem auto !important;
				position: relative;
				text-align: left !important;
				h2 {
					display: flex;
					align-items: center;
					margin: 0rem;
				}
			`}
			className="ui__ card box"
		>
			<div>
				<h2>
					<Dot /> Nouveautés
				</h2>
				<div>
					<small>Mise à jour le {date}</small>
				</div>
				<div>
					Version{' '}
					<Link to={'/nouveautés'}>{capitalise0(lastRelease.name)}</Link>
				</div>
			</div>
			<button
				onClick={() => setLastViewedRelease(lastRelease.name)}
				css="border: none; font-size: 120%; color: var(--color); position: absolute; right: .6rem; top: .6rem; padding: 0"
				title="Fermer la notification de nouveautés"
			>
				&times;
			</button>
		</div>
	) : null
}

const Dot = styled.span`
	background: var(--color);
	width: 0.8rem;
	height: 0.8rem;
	display: inline-block;
	border-radius: 1rem;
	margin-right: 0.4rem;
`
