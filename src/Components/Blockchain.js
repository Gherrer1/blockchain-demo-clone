/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedBlock from './Block';
import { addBlock } from '../actionCreators';

export function Blockchain(props) {
	const { blocks, dispatch } = props;
	return (
		<div>
			<h2>Blockchain</h2>
			<div className="blockchain">
				{blocks.map((block, index) => (
					<ConnectedBlock key={index} index={index} />
				))}
			</div>
			<button
				type="button"
				className="add-block-btn"
				onClick={() => dispatch(addBlock())}
			>
				Add Block
			</button>
		</div>
	);
}
Blockchain.propTypes = {
	blocks: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	blocks: state,
});

export default connect(mapStateToProps)(Blockchain);
