import React from 'react';
import { render, shallow } from 'enzyme';
import ConnectedBlockchain, { Blockchain } from './Blockchain';
import Block from './Block';
import { block } from '../utils';
import { ADD_BLOCK } from '../actions';

describe('<Blockchain />', () => {
	it('must render an add block button', () => {
		const wrapper = render(<Blockchain blocks={[]} />);
		expect(wrapper.find('button').length).toEqual(1);
	});
	it('must render as many Blocks as it receives as props', () => {
		// n blocks
		const block1 = block();
		const block2 = block(block1);
		const block3 = block(block2);
		let blockProps = [block1, block2, block3];
		let wrapper = shallow(<Blockchain blocks={blockProps} />);
		expect(wrapper.find(Block).length).toEqual(3);

		// zero blocks
		blockProps = [];
		wrapper = shallow(<Blockchain blocks={blockProps} />);
		expect(wrapper.find(Block).length).toEqual(0);

		// 1 block
		blockProps = [block()];
		wrapper = shallow(<Blockchain blocks={blockProps} />);
		expect(wrapper.find(Block).length).toEqual(1);
	});
	it('must call dispatch when add block button is clicked with action.type === ADD_BLOCK', () => {
		const dispatchStub = jest.fn();
		const wrapper = shallow(<Blockchain blocks={[]} dispatch={dispatchStub} />);
		wrapper.find('button').simulate('click');
		expect(dispatchStub).toHaveBeenCalledTimes(1);
		expect(dispatchStub).toHaveBeenCalledWith({ type: ADD_BLOCK });
	});
});
describe('<ConnectedBlockchain />', () => {
	// rookie test, I know
	it('must render a Blockchain', () => {
		throw new Error('unimplemtnted');
	});
	it('must render as many Blocks as it receives from Redux', () => {
		// right now, I want to make sure that my connected component receives dispatch as a prop
		// 0 blocks case

		// 1 block case

		// n block case
		throw new Error('unimp');
	});
	it('must render one more block after clicking add block button', () => {
		throw new Error('unimp');
	});
});
