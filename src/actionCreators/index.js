import { ADD_BLOCK, CHANGE_BLOCK } from '../actions';

export function addBlock() {
	return {
		type: ADD_BLOCK,
	};
}

export function changeBlock(index, field, newValue) {
	return {
		type: CHANGE_BLOCK,
		index,
		field,
		newValue,
	};
}
