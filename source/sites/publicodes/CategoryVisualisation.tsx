import { CategoryLabel } from 'Components/conversation/UI'
import emoji from 'react-easy-emoji'
import { useSelector } from 'react-redux'
import { getSubcategories } from '../../components/publicodesUtils'
import AnimatedTargetValue from '../../components/ui/AnimatedTargetValue'
import { useEngine } from '../../components/utils/EngineContext'
import SubCategoriesChart from './chart/SubCategoriesChart'

export default ({ questionCategory: category, hideMeta = false }) => {
	const rules = useSelector((state) => state.rules)
	const engine = useEngine()

	// The aim of this component is to visualize sums. Sometimes, relevant sums are hidden behind a division
	// it should be visualized elsewhere
	const subCategories = getSubcategories(rules, category, engine)

	const categoryValue = Math.round(engine.evaluate(category.name).nodeValue)

	return (
		<div
			css={`
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-wrap: wrap;
			`}
		>
			{!hideMeta && (
				<div
					css={`
						display: flex;
						align-items: center;
					`}
				>
					<CategoryLabel>
						{emoji(category.icons || '🌍')}
						{category.title}
					</CategoryLabel>
					<AnimatedTargetValue value={categoryValue} unit="kg" leftToRight />
				</div>
			)}
			{sumToDisplay && (
				<div
					css={`
						width: 100%;
					`}
				>
					{/* <SubCategoriesChart
						{...{
							key: 'subCategoriesChart',
							color: questionCategory.color,
							rules,
							engine,
							sumToDisplay,
							categories: subCategories,
						}}
					/> */}
				</div>
			)}
		</div>
	)
}
