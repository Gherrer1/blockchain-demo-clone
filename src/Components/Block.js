import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeBlock } from '../actionCreators';

export function Block({ block, dispatch, index }) {
	return (
		<div className="block">
			Block Number:
			<input type="text" className="blockNum" value={block.blockNum} onChange={e => dispatch(changeBlock(index, 'blockNum', e.target.value))} />
			Nonce:
			<input type="text" className="nonce" value={block.nonce} onChange={e => dispatch(changeBlock(index, 'nonce', e.target.value))} />
			Prev:
			<input disabled type="text" className="prev" defaultValue={block.prev} />
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
