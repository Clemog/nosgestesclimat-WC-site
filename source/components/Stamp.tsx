import styled from 'styled-components'

const Stamp = styled.button`
	position: absolute;
	border-radius: 1rem;
	right: 0.5rem;
	top: -2em;

	${({ clickable }) => clickable && `cursor: pointer`}
`

export default Stamp
