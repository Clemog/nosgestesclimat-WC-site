import DocumentationButton from './DocumentationButton'
import { Link } from 'react-router-dom'
import Illustration from './images/ecolab-climat-dessin.svg'
import Marianne from './images/Marianne.svg'
import emoji from 'react-easy-emoji'
import NewsBanner from '../../components/NewsBanner'

export default () => {
	return (
		<div
			css={`
				max-width: 850px;
				margin: 0 auto;
				border-radius: 1rem;
				padding: 0.4rem;
				h1 {
					margin-top: 0.3rem;
					font-size: 140%;
					line-height: 1.2em;
				}
				h2 {
					font-size: 100%;
					font-style: italic;
				}
				> div > a {
				}
				text-align: center;
				> img {
					width: 70%;
					border-radius: 0.8rem;
				}
				@media (max-width: 800px) {
					> img {
						width: 95%;
					}
				}
			`}
		>
			<h1> Ce questionnaire permet aux salariés de calculer les émissions de CO2e liées à leur activité professionnelle. </h1>
	    <h2> Il est anonyme, seul les données agrégées seront exploitées. </h2>
			{/*<img src={Illustration} /> Suppression image landing */}
			<div css="margin-bottom: 1rem">
				<div css="margin: 1rem 0 .6rem;">
					<Link to="/simulateur/bilan" className="ui__ plain button">
						Lancer le calcul
					</Link>
				</div>
			{/*<div css="margin: .6rem 0 1rem;">
					<Link to="/conférence" className="ui__ button small">
						{emoji('👥')} Faire le test à plusieurs
					</Link>
				</div>  Suppression mode conférence pour le moment */}
				{/* <NewsBanner /> Suppression Bannières nouveautés*/}
			</div>

			<footer>
				<div
					css={`
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 1rem;
						img {
							margin: 0 0.6rem;
						}
					`}
				>
					<img
						css="height: 6rem; margin-right: .6rem"
						src={Marianne}
						alt="Logo Marianne de la République Française"
					/>
					<a href="https://ademe.fr">
						<img
							css="height: 5rem; margin-right: .6rem"
							src="https://www.ademe.fr/sites/all/themes/ademe/logo.png"
							alt="Logo de l'ADEME"
						/>
					</a>
					<a href="https://www.associationbilancarbone.fr/">
						<img
							css="height: 2.5rem"
							src="https://www.associationbilancarbone.fr/wp-content/themes/abc/assets/images/brand/abc_main_logo.svg"
							alt="Logo de l'Association Bilan Carbone"
						/>
					</a>
				</div>
				<div
					css={`
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						> * {
							margin: 0 0.6rem;
						}
						img {
							font-size: 120%;
						}
					`}
				>
					<Link to="/à-propos">{emoji('❔ ')}À propos</Link>
					<DocumentationButton />
					<Link to="/diffuser">{emoji('📤 ')}Diffuser</Link>
				</div>
			</footer>
		</div>
	)
}
