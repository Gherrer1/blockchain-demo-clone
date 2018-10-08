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
	return {
		type: CHANGE_BLOCK,
		field: 'blockNum',
		index,
		newValue,
	};
}

export function changeNonce(index, newValue) {
	return {
		type: CHANGE_BLOCK,
		field: 'nonce',
		index,
		newValue,
	};
}
