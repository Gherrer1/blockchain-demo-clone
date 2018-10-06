/* eslint-disable no-case-declarations */
import { ADD_BLOCK, CHANGE_BLOCK } from '../actions';
import { Block, updatedBlock } from '../utils';

export function blocks(state = [], action) {
	switch (action.type) {
	case ADD_BLOCK:
		if (state.length === 0) {
			return [Block()];
		}

		const prevBlock = state[state.length - 1];
		return state.concat([Block(prevBlock)]);
	case CHANGE_BLOCK:
		if (action.index < 0 || action.index >= state.length) {
			return state;
		}
		let lastHash;
		return state.map((block, index) => {
			if (index < action.index) {
				return block;
			}
			if (index === action.index) {
				const newBlock = updatedBlock(block, action.field, action.newValue);
				lastHash = newBlock.hash;
				return newBlock;
			}
			if (index > action.index) {
				const newPrev = lastHash;
				const newBlock = updatedBlock(block, 'prev', newPrev);
				lastHash = newBlock.hash;
				return newBlock;
			}
		});
	default:
		return state;
	}
}
