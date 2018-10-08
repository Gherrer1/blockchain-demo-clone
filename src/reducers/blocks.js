/* eslint-disable no-case-declarations */
import { ADD_BLOCK, CHANGE_BLOCK, MINE_BLOCK } from '../actions';
import { block as Block, updatedBlock, hashBlock } from '../utils';

const prev = 'prev';

export function blocks(state = [], action) {
	switch (action.type) {
	case ADD_BLOCK:
		if (state.length === 0) {
			return [Block()];
		}

		const prevBlock = state[state.length - 1];
		return state.concat([Block(prevBlock)]);
	case MINE_BLOCK:
		if (action.index < 0 || action.index >= state.length) {
			return state;
		}
		let _lastHash;
		return state.map((block, index) => {
			if (index < action.index) {
				return block;
			}

			if (index === action.index) {
				const _block = { ...block, nonce: 0 };
				while (hashBlock(_block).slice(0, 3) !== '000') {
					_block.nonce++;
				}
				_block.hash = hashBlock(_block);
				_lastHash = _block.hash;
				return _block;
			}

			const newBlock = updatedBlock(block, prev, _lastHash);
			_lastHash = newBlock.hash;
			return newBlock;
		});
	case CHANGE_BLOCK:
		if (action.index < 0 || action.index >= state.length) {
			return state;
		}
		if (action.field === 'prev') {
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
				const newBlock = updatedBlock(block, prev, newPrev);
				lastHash = newBlock.hash;
				return newBlock;
			}
		});
	default:
		return state;
	}
}
