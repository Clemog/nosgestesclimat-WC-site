const hideSmallerThanRatio = 0.1

export const groupTooSmallCategories = (categories) => {
	const total = categories.reduce((memo, next) => memo + next.nodeValue, 0)
	const rest = categories
			.filter((el) => el.nodeValue)
			.reduce(
				(memo, { nodeValue, title, icons }) => {
					const tooSmall = nodeValue < hideSmallerThanRatio * total
					if (tooSmall) {
						//console.log(title, nodeValue)
					}
					return {
						value: tooSmall ? memo.value + nodeValue : memo.value,
						labels: tooSmall ? [...memo.labels, title] : memo.labels,
					}
				},
				{ value: 0, labels: [] }
			),
		restWidth = (rest.value / total) * 100

	const bigEnough = categories.filter(
		(el) => el.nodeValue / total > hideSmallerThanRatio
	)

	return { rest, bigEnough, total, restWidth }
}
