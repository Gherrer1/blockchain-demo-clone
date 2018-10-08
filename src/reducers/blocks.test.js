import { blocks } from '.';
import { block as Block } from '../utils';
import { ADD_BLOCK, CHANGE_BLOCK, MINE_BLOCK } from '../actions';

function getNBlockPrevState(n) {
	let _block = Block();
	const prevState = [];
	for (let i = 0; i < n; i++) {
		prevState.push(_block);
		_block = Block(_block);
	}
	return prevState;
}

function get10BlockPrevState() {
	return getNBlockPrevState(10);
}

describe('blocks reducer', () => {
	it('should return empty array initially', () => {
		const action = { type: 'made up type' };
		const state = blocks(undefined, action);
		expect(state).toMatchObject([]);
	});

	describe(ADD_BLOCK, () => {
		let action;
		beforeEach(() => {
			action = {
				type: ADD_BLOCK,
			};
		});
		it('should return array with single element if ADD_BLOCK to empty array state', () => {
			const state = blocks(undefined, action);
			expect(state.length).toEqual(1);
		});
		it('should have a first element with .prev = 0x64 if ADD_BLOCK to empty array state', () => {
			const state = blocks(undefined, action);
			const firstElement = state[0];
			const expectedPrevProperty = new Array(64).join('0');
			expect(firstElement.prev).toEqual(expectedPrevProperty);
		});
		it('should add a block to an array that already has n elements', () => {
			const block1 = Block();
			const block2 = Block(block1);
			const block3 = Block(block2);
			const prevState = [block1, block2, block3];
			const state = blocks(prevState, action);
			expect(state.length).toEqual(4);
		});
		it('should have a last block whose .prev is second to last blocks .hash', () => {
			const block1 = Block();
			const block2 = Block(block1);
			const block3 = Block(block2);
			const prevState = [block1, block2, block3];
			const state = blocks(prevState, action);
			const lastBlock = state[state.length - 1];
			expect(lastBlock.prev).toEqual(block3.hash);
		});
		it('should have a last block whose .blockNum is 1 greater than last blocks .blockNum', () => {
			const block1 = Block();
			const block2 = Block(block1);
			const block3 = Block(block2);
			const prevState = [block1, block2, block3];
			const state = blocks(prevState, action);
			const lastBlock = state[state.length - 1];
			expect(lastBlock.blockNum).toEqual(block3.blockNum + 1);
		});
	});
	describe(CHANGE_BLOCK, () => {
		let prevState;
		let action;
		beforeEach(() => {
			prevState = get10BlockPrevState();
			action = {
				type: CHANGE_BLOCK,
				index: 4,
				field: 'nonce',
				newValue: 'abc',
			};
		});
		it('should not change state if index is out of bounds', () => {
			action.index = -1;
			let state = blocks(prevState, action);
			expect(state).toEqual(prevState);

			action.index = 10;
			state = blocks(prevState, action);
			expect(state).toEqual(prevState);
		});
		it('should return empty array if array is already empty', () => {
			prevState = [];
			action.index = 0;
			const state = blocks(prevState, action);
			expect(state).toEqual([]);
		});
		it('should not throw error if theres only one block and index in bounds', () => {
			prevState = [Block()];
			action.index = 0;
			expect(() => {
				blocks(prevState, action);
			}).not.toThrow();
		});
		it('should return array of length one if theres only one block and index in bounds', () => {
			prevState = [Block()];
			action.index = 0;
			const state = blocks(prevState, action);
			expect(state.length).toEqual(1);
		});
		it('should change the block if index is first index', () => {
			action.index = 0;
			const oldFirstBlock = { ...prevState[0] };
			const state = blocks(prevState, action);
			const [firstBlock] = state;
			expect(firstBlock).not.toEqual(oldFirstBlock);
			expect(firstBlock.hash).not.toEqual(oldFirstBlock.hash);
		});
		it('should change the block if index is middle index', () => {
			const oldNthBlock = { ...prevState[action.index] };
			const state = blocks(prevState, action);
			const newNthBlock = { ...state[action.index] };
			expect(newNthBlock).not.toEqual(oldNthBlock);
		});
		it('should not change blocks before index', () => {
			const oldBeforeNthBlock = [...prevState.slice(0, action.index)];
			const state = blocks(prevState, action);
			const newBeforeNthBlock = [...state.slice(0, action.index)];
			expect(newBeforeNthBlock).toEqual(oldBeforeNthBlock);
		});
		it('should not change blocks before index if index is last block', () => {
			action.index = prevState.length - 1;
			const oldBeforeNthBlock = [...prevState.slice(0, action.index)];
			const state = blocks(prevState, action);
			const newBeforeNthBlock = [...state.slice(0, action.index)];
			expect(newBeforeNthBlock).toEqual(oldBeforeNthBlock);
		});
		it('should change the block if index is last index', () => {
			action.index = prevState.length - 1;
			const oldLastBlock = { ...prevState[action.index] };
			const state = blocks(prevState, action);
			const newLastBlock = { ...state[action.index] };
			expect(newLastBlock).not.toEqual(oldLastBlock);
		});
		it('should change every block specified after the index as well', () => {
			const oldAfterNthBlock = [...prevState.slice(action.index + 1)];
			const state = blocks(prevState, action);
			const newAfterNthBlock = [...state.slice(action.index + 1)];
			newAfterNthBlock.forEach((newBlock, index) => {
				const oldBlock = oldAfterNthBlock[index];
				expect(newBlock).not.toEqual(oldBlock);
			});
		});
		it('should change every block specified after the first index as well if index is 0', () => {
			action.index = 0;
			const oldAfterNthBlock = [...prevState.slice(action.index + 1)];
			const state = blocks(prevState, action);
			const newAfterNthBlock = [...state.slice(action.index + 1)];
			newAfterNthBlock.forEach((newBlock, index) => {
				const oldBlock = oldAfterNthBlock[index];
				expect(newBlock).not.toEqual(oldBlock);
			});
		});
		it('should return an array of the same length before the operation', () => {
			const state = blocks(prevState, action);
			expect(state.length).toEqual(prevState.length);
		});
		it('should not change state if action.field === "prev"', () => {
			// because the user cant change that state on their own
			action.field = 'prev';
			action.newValue = 'hashety';
			const state = blocks(prevState, action);
			expect(state).toEqual(prevState);
		});
	});
	describe(MINE_BLOCK, () => {
		let action;
		let prevState;
		function assertBlockIsMined(block) {
			expect(block.hash.slice(0, 3)).toEqual('000');
		}
		beforeEach(() => {
			prevState = getNBlockPrevState(3);
			action = {
				type: MINE_BLOCK,
				index: 1,
			};
		});
		it('should not change state if index is out of bounds', () => {
			action.index = -1;
			let state = blocks(prevState, action);
			expect(state).toEqual(prevState);

			action.index = prevState.length + 100;
			state = blocks(prevState, action);
			expect(state).toEqual(prevState);
		});
		it('should return an array of the same length', () => {
			const state = blocks(prevState, action);
			expect(state.length).toEqual(prevState.length);
		});
		it('should not change every element before the target index', () => {
			const state = blocks(prevState, action);
			expect(state.slice(0, action.index)).toEqual(prevState.slice(0, action.index));
		});
		it('*** should ensure the target block has a 3 0 prefix hash', () => {
			const state = blocks(prevState, action);
			const targetBlock = state[action.index];
			assertBlockIsMined(targetBlock);
		});
		it('should change every subsequence block\'s .prev to equal the previous block\'s .hash', () => {
			prevState = getNBlockPrevState(5);
			const state = blocks(prevState, action);
			for (let i = action.index + 1; i < state.length; i++) {
				expect(state[i].prev).toEqual(state[i - 1].hash);
			}
		});
		it('should change every block if index === 0', () => {
			action.index = 0;
			const state = blocks(prevState, action);
			for (let i = 0; i < state.length; i++) {
				expect(state[i].hash).not.toEqual(prevState[i].hash);
			}
		});
		it('should change only last block if index === last', () => {
			action.index = prevState.length - 1;
			const state = blocks(prevState, action);
			for (let i = 0; i < state.length - 1; i++) {
				expect(state[i].hash).toEqual(prevState[i].hash);
			}
			expect(state[action.index].hash).not.toEqual(prevState[action.index].hash);
		});
	});
});
