/* eslint-disable array-bracket-spacing, no-unexpected-multiline, no-spaced-func, func-call-spacing */
import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Root from './Root';
import ConnectedBlockchain, { Blockchain } from './Blockchain';
import Block from './Block';
import { block } from '../utils';

describe('<Blockchain />', () => {
	it('must render an add block button', () => {
		const wrapper = render(<Blockchain blocks={[]} dispatch={() => {}} />);
		expect(wrapper.find('button').length).toEqual(1);
	});
	it('must render as many Blocks as it receives as props', () => {
		// n blocks
		const block1 = block();
		const block2 = block(block1);
		const block3 = block(block2);
		let blockProps = [block1, block2, block3];
		let wrapper = shallow(<Blockchain blocks={blockProps} dispatch={() => {}} />);
		expect(wrapper.find(Block).length).toEqual(3);

		// zero blocks
		blockProps = [];
		wrapper = shallow(<Blockchain blocks={blockProps} dispatch={() => {}} />);
		expect(wrapper.find(Block).length).toEqual(0);

		// 1 block
		blockProps = [block()];
		wrapper = shallow(<Blockchain blocks={blockProps} dispatch={() => {}} />);
		expect(wrapper.find(Block).length).toEqual(1);
	});
	it('must call dispatch when add block button is clicked with action.type === ADD_BLOCK', () => {
		const dispatchStub = jest.fn();
		const wrapper = shallow(<Blockchain blocks={[]} dispatch={dispatchStub} />);
		wrapper.find('button').simulate('click');
		expect(dispatchStub).toHaveBeenCalledTimes(1);
		expect(dispatchStub).toHaveBeenCalledWith({ type: 'ADD_BLOCK' });
	});
});
describe('<ConnectedBlockchain />', () => {
	// rookie test, I know
	it('must render a Blockchain', () => {
		const wrapper = mount(
			<Root>
				<ConnectedBlockchain />
			</Root>
		);
		expect(wrapper.find(Blockchain).length).toEqual(1);
	});
	it.each([ [[], 0], [[block()], 1], [[block(), block(block()), block(block(block()))], 3] ])
	('must render as many Blocks as it receives from Redux: %j %i', (blocks, expectedBlocksRendered) => {
		const wrapper = mount(
			<Root initialState={blocks}>
				<ConnectedBlockchain />
			</Root>
		);
		expect(wrapper.find(Block).length).toEqual(expectedBlocksRendered);
	});
	it.each([ [[], 1], [[block()], 2], [[block(), block(block()), block(block(block()))], 4] ])
	('must render one more block after clicking add block button: %j %i', (beforeBlocks, afterLength) => {
		// from 0 blocks case
		const wrapper = mount(
			<Root initialState={beforeBlocks}>
				<ConnectedBlockchain />
			</Root>
		);
		expect(wrapper.find(Block).length).toEqual(afterLength - 1);
		wrapper.find('button').simulate('click');
		wrapper.update();
		expect(wrapper.find(Block).length).toEqual(afterLength);
	});
});
