/* eslint-disable array-bracket-spacing, no-unexpected-multiline, 
no-spaced-func, func-call-spacing */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Block } from './Block';

describe('<Block />', () => {
	let block;
	const prevConstant = 'prevprevprevprevprevprevprevprevprevprevprevprevprevprevprevprev';
	const hashConstant = 'hashhashhashhashhashhashhashhashhashhashhashhashhashhashhashhash';
	let wrapper;
	beforeEach(() => {
		block = {
			blockNum: 5,
			prev: prevConstant,
			hash: hashConstant,
			nonce: 'abc',
		};
		wrapper = shallow(<Block block={block} index={24} dispatch={() => {}} />);
	});
	it('should render a blockNum text input with value of prop.block.blockNum', () => {
		const blockNumInput = wrapper.find('.blockNum');
		expect(blockNumInput.length).toEqual(1);
		/* props() wasnt working earlier because i was wrapping
		in a render wrapper, not a shallow/mount wrapper */
		expect(blockNumInput.props().value).toEqual(block.blockNum);
	});
	it('should render a nonce text input with value of prop.blocks.nonce', () => {
		const nonceInput = wrapper.find('.nonce');
		expect(nonceInput.length).toEqual(1);
		expect(typeof nonceInput.props().value).toEqual('string');
		expect(nonceInput.props().value).toEqual(block.nonce);
	});
	it('should render a prev text input with value of prop.block.prev', () => {
		const prevInput = wrapper.find('.prev');
		expect(prevInput.length).toEqual(1);
		expect(prevInput.props().value).toEqual(block.prev);
	});
	it('should render a hash div with text of prop.block.hash', () => {
		const hashInput = wrapper.find('.hash');
		expect(hashInput.length).toEqual(1);
		expect(hashInput.props().value).toEqual(block.hash);
	});
	it('should render a mine button', () => {
		expect(wrapper.find('.mine-btn').length).toEqual(1);
		expect(wrapper.find('.mine-btn').props().onClick).toBeDefined();
	});
	it('should not have a .mined className if props.block.hash isn\'t 3 0 prefixed', () => {
		expect(wrapper.find('.mined').length).toEqual(0);
	});
	it('should have a .mined className if props.block.hash is 3 0 prefixed', () => {
		block.hash = '000sfjgsdjkfghfjdkghsdjfkg';
		wrapper = shallow(<Block block={block} index={3} dispatch={jest.fn()} />);
		expect(wrapper.find('.mined').length).toEqual(1);
	});
	describe('stubbing dispatch', () => {
		let mountWrapper;
		let dispatchStub;
		beforeEach(() => {
			dispatchStub = jest.fn();
			mountWrapper = mount(<Block block={block} index={3} dispatch={dispatchStub} />);
		});
		it('should call dispatch({ type: CHANGE_BLOCK, index: x, field: "blockNum", newValue }) when blockNum value changes', () => {
			const blockNumInput = mountWrapper.find('.blockNum');
			blockNumInput.simulate('change', { target: { value: 'new' } });
			blockNumInput.simulate('change', { target: { value: 'new ' } });
			blockNumInput.simulate('change', { target: { value: 'new v' } });
			blockNumInput.simulate('change', { target: { value: 'new va' } });
			expect(dispatchStub).toHaveBeenCalledTimes(4);
			expect(dispatchStub.mock.calls[0][0]).toEqual({
				type: 'CHANGE_BLOCK',
				index: 3,
				field: 'blockNum',
				newValue: 'new',
			});
			expect(dispatchStub.mock.calls[1][0]).toEqual({
				type: 'CHANGE_BLOCK',
				index: 3,
				field: 'blockNum',
				newValue: 'new ',
			});
			expect(dispatchStub.mock.calls[2][0]).toEqual({
				type: 'CHANGE_BLOCK',
				index: 3,
				field: 'blockNum',
				newValue: 'new v',
			});
			expect(dispatchStub.mock.calls[3][0]).toEqual({
				type: 'CHANGE_BLOCK',
				index: 3,
				field: 'blockNum',
				newValue: 'new va',
			});
		});
		it('should NOT call dispatch() when prev value changes', () => {
			const prevInput = mountWrapper.find('.prev');
			prevInput.simulate('change', { target: { value: 'abc' } });
			expect(dispatchStub).toHaveBeenCalledTimes(0);
		});
		it('should call dispatch({ type: CHANGE_BLOCK, index: x, field: "nonce", newValue }) when nonce value changes', () => {
			const nonceInput = mountWrapper.find('.nonce');
			nonceInput.simulate('change', { target: { value: 'new va' } });
			expect(dispatchStub).toHaveBeenCalled();
			expect(dispatchStub.mock.calls[0][0]).toEqual({
				type: 'CHANGE_BLOCK',
				index: 3,
				field: 'nonce',
				newValue: 'new va',
			});
		});
		it('should call dispatch({ type: MINE_BLOCK, index: x }) when mine block button clicked', () => {
			const mineBlockBtn = mountWrapper.find('.mine-btn');
			mineBlockBtn.simulate('click');
			expect(dispatchStub).toHaveBeenCalled();
			expect(dispatchStub.mock.calls[0][0]).toEqual({
				type: 'MINE_BLOCK',
				index: 3,
			});
		});
	});
});
