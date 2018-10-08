import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeBlock } from '../actionCreators';

export function Block({ block, dispatch, index }) {
	return (
		<div className="block">
			Block Number:
			<input type="text" className="blockNum" value={block.blockNum} onChange={e => dispatch(changeBlock(index, 'blockNum', e.target.value))} />
			Prev:
			<input type="text" className="prev" value={block.prev} onChange={e => dispatch(changeBlock(index, 'prev', e.target.value))} />
			Hash:
			<div className="hash">{block.hash}</div>
		</div>
	);
}
Block.propTypes = {
	block: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
	return {
		block: state[ownProps.index],
		index: ownProps.index,
	};
}

export default connect(mapStateToProps)(Block);
