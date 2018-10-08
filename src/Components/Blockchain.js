import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedBlock from './Block';
import { addBlock } from '../actionCreators';

export function Blockchain(props) {
	const { blocks, dispatch } = props;
	return (
		<div>
			{blocks.map((block, index) => (
				<ConnectedBlock key={block.hash} index={index} />
			))}
			<button
				type="button"
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
