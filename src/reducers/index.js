import { ADD_BLOCK, CHANGE_BLOCK } from '../actions';
import Block from '../utils';

export function blocks(state = [], action) {
	switch (action.type) {
	case ADD_BLOCK:
		return state.length === 0 ? [Block()]
			: state.concat([Block(state[state.length - 1].blockNum + 1)]);
	case CHANGE_BLOCK:
		return state;
		// return state.map((block, b_index) => b_index < action.blockNum ? block : )
	default:
		return state;
	}
}
