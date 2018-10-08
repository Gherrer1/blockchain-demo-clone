import React from 'react';
import PropTypes from 'prop-types';
import { changeBlock } from '../actionCreators';

export default function Block({ block, dispatch, index }) {
	return (
		<div>
			<input type="text" className="blockNum" value={block.blockNum} onChange={e => dispatch(changeBlock(index, 'blockNum', e.target.value))} />
			<input type="text" className="prev" value={block.prev} onChange={e => dispatch(changeBlock(index, 'prev', e.target.value))} />
			<div className="hash">{block.hash}</div>
		</div>
	);
}
Block.propTypes = {
	block: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
