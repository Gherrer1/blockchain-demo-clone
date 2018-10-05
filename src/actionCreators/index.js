import { ADD_BLOCK, CHANGE_BLOCK } from '../actions';

export function addBlock() {
	return {
		type: ADD_BLOCK,
	};
}

export function changeBlock(blockNum) {
	return {
		type: CHANGE_BLOCK,
		blockNum,
	};
}
