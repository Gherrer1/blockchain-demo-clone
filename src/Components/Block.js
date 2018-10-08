import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeNonce, changeBlockNum, mineBlock } from '../actionCreators';

export function Block({ block, dispatch, index }) {
	return (
		<div className={`block ${block.hash.slice(0, 3) === '000' ? 'mined' : ''}`}>
			Block Number:
			<input type="text" className="blockNum" value={block.blockNum} onChange={e => dispatch(changeBlockNum(index, e.target.value))} />
			Nonce:
			<input type="text" className="nonce" value={block.nonce} onChange={e => dispatch(changeNonce(index, e.target.value))} />
			Prev:
			<input disabled type="text" className="prev" value={block.prev} />
			Hash:
			<div className="hash">{block.hash}</div>
			<button type="button" className="mine-btn" onClick={() => dispatch(mineBlock(index))}>Mine</button>
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
