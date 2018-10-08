import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeNonce, changeBlockNum, mineBlock, changeData } from '../actionCreators';

export function Block({ block, dispatch, index }) {
	return (
		<form className={`block ${block.hash.slice(0, 3) === '000' ? 'mined' : ''}`}>
			<div className="form-group row">
				<label className="col-form-label col-sm-2">Block:</label>
				<div className="col-sm-10">
					<input type="text" className="form-control blockNum" value={block.blockNum} onChange={e => dispatch(changeBlockNum(index, e.target.value))} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-form-label col-sm-2">Nonce:</label>
				<div className="col-sm-10">
					<input type="text" className="form-control nonce" value={block.nonce} onChange={e => dispatch(changeNonce(index, e.target.value))} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-form-label col-sm-2">Data:</label>
				<div className="col-sm-10">
					<textarea className="form-control data" value={block.data} onChange={e => dispatch(changeData(index, e.target.value))} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-form-label col-sm-2">Prev:</label>
				<div className="col-sm-10">
					<input disabled type="text" className="form-control prev" value={block.prev} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-form-label col-sm-2">Hash:</label>
				<div className="col-sm-10">
					<input disabled type="text" className="form-control hash" value={block.hash} />
				</div>
			</div>
			<button type="button" className="mine-btn" onClick={() => dispatch(mineBlock(index))}>Mine</button>
		</form>
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
