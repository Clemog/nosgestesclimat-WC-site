import { AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import SubCategoryBar from './SubCategoryBar'

const shadowStyle =
	'box-shadow: 0px 2px 4px -1px var(--lighterColor), 0px 4px 5px 0px var(--lighterColor), 0px 1px 10px 0px var(--lighterColor)'

export default ({ color: uniqueColor, categories, delay }) => {
	const total = categories.reduce((memo, next) => memo + next.nodeValue, 0)
	const rest = categories
			.filter((el) => el.nodeValue)
			.reduce(
				(memo, { nodeValue, title, icons }) => {
					const tooSmall = nodeValue < 0.1 * total
					return {
						value: tooSmall ? memo.value + nodeValue : memo.value,
						labels: tooSmall ? [...memo.labels, title] : memo.labels,
					}
				},
				{ value: 0, labels: [] }
			),
		restWidth = (rest.value / total) * 100

	return (
		<div>
			<InlineBarChart>
				<AnimatePresence>
					{categories.map(({ nodeValue, title, icons, color }) => (
						<SubCategoryBar
							{...{
								key: title,
								nodeValue,
								title,
								icons,
								total,
								color: uniqueColor || color,
								hideSmallerThanPercentage: 10,
								delay,
							}}
						/>
					))}
					<li
						title={'Le reste : ' + rest.labels.join(', ')}
						key="rest"
						css={`
							width: ${restWidth}%;
							${uniqueColor ? `background: ${uniqueColor}` : 'background:grey'};
							font-size: 200%;
							color: white;
							div {
								height: 100%;
								line-height: 0.2rem;
							}
						`}
					>
						<div>...</div>
					</li>
				</AnimatePresence>
			</InlineBarChart>
		</div>
	)
}

export const InlineBarChart = styled.ul`
	width: 100%;
	border-radius: 0.4rem;
	padding-left: 0;
	margin: 0;
	display: flex;
	${shadowStyle};
	li {
		display: inline-block;
		text-align: center;
		list-style-type: none;
		height: 1.9rem;
		line-height: 1.4rem;
	}

	li:last-child {
		border-right: none;
	}
`
