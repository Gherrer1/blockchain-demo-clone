import { ADD_BLOCK, CHANGE_BLOCK, MINE_BLOCK } from '../actions';

export function addBlock() {
	return {
		type: ADD_BLOCK,
	};
}

export function mineBlock(index) {
	return {
		type: MINE_BLOCK,
		index,
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

export function changeBlockNum(index, newValue) {
	return changeBlock(index, 'blockNum', newValue);
}

export function changeNonce(index, newValue) {
	return changeBlock(index, 'nonce', newValue);
}

export function changeData(index, newValue) {
	return changeBlock(index, 'data', newValue);
}
