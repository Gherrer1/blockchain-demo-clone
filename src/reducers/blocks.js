/* eslint-disable no-case-declarations */
import { ADD_BLOCK } from '../actions';
import Block from '../utils';

export function blocks(state = [], action) {
	switch (action.type) {
	case ADD_BLOCK:
		if (state.length === 0) {
			return [Block()];
		}

		const prevBlock = state[state.length - 1];
		return state.concat([Block(prevBlock)]);
	default:
		return state;
	}
}
