/* eslint-disable no-case-declarations */
import { ADD_BLOCK, CHANGE_BLOCK, HASH_BLOCK } from '../actions';
import Block from '../utils';

export function blocks(state = [], action) {
	switch (action.type) {
	case ADD_BLOCK:
		if (state.length === 0) {
			return [Block()];
		}

		const lastBlock = state[state.length - 1];
		return state.concat([Block(lastBlock.blockNum + 1, lastBlock.hash)]);
	case HASH_BLOCK:
		return state;
	case CHANGE_BLOCK:
		return state;
		// return state.map((block, b_index) => b_index < action.blockNum ? block : )
	default:
		return state;
	}
}
