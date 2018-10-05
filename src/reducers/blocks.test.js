import { blocks } from '../reducers';
import Block from '../utils';
import { ADD_BLOCK } from '../actions';

describe('blocks reducer', () => {
	it('should return empty array initially', () => {
		const action = { type: 'made up type' };
		const state = blocks(undefined, action);
		expect(state).toMatchObject([]);
	});

	describe('ADD_BLOCK', () => {
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
});
