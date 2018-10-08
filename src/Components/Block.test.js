/* eslint-disable array-bracket-spacing, no-unexpected-multiline, 
no-spaced-func, func-call-spacing */
import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Block from './Block';

describe('<Block />', () => {
	let block;
	const prevConstant = 'prevprevprevprevprevprevprevprevprevprevprevprevprevprevprevprev';
	const hashConstant = 'hashhashhashhashhashhashhashhashhashhashhashhashhashhashhashhash';
	beforeEach(() => {
		block = {
			blockNum: 5,
			prev: prevConstant,
			hash: hashConstant,
		};
	});
	it('should render a blockNum text input with value of prop.block.blockNum', () => {
		const wrapper = shallow(<Block block={block} dispatch={() => {}} index={11} />);
		const blockNumInput = wrapper.find('.blockNum');
		expect(blockNumInput.length).toEqual(1);
		/* props() wasnt working earlier because i was wrapping
		in a render wrapper, not a shallow/mount wrapper */
		expect(blockNumInput.props().value).toEqual(block.blockNum);
	});
	it('should render a prev text input with value of prop.block.prev', () => {
		const wrapper = mount(<Block block={block} dispatch={() => {}} index={11} />);
		const prevInput = wrapper.find('.prev');
		expect(prevInput.length).toEqual(1);
		expect(prevInput.props().value).toEqual(block.prev);
	});
	it('should render a hash div with text of prop.block.hash', () => {
		const wrapper = mount(<Block block={block} dispatch={() => {}} index={11} />);
		const hashInput = wrapper.find('.hash');
		expect(hashInput.length).toEqual(1);
		expect(hashInput.props().children).toEqual(block.hash);
	});
	it('should call dispatch({ type: CHANGE_BLOCK, index: x, field: "blockNum", newValue }) when blockNum value changes', () => {
		const dispatchStub = jest.fn();
		const wrapper = mount(<Block block={block} index={3} dispatch={dispatchStub} />);
		const blockNumInput = wrapper.find('.blockNum');
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
	it('should call dispatch({ type: CHANGE_BLOCK, index: x, field: "prev", newValue }) when prev value changes', () => {
		const dispatchStub = jest.fn();
		const wrapper = mount(<Block block={block} index={3} dispatch={dispatchStub} />);
		const prevInput = wrapper.find('.prev');
		prevInput.simulate('change', { target: { value: 'abc' } });
		prevInput.simulate('change', { target: { value: 'abcd' } });
		prevInput.simulate('change', { target: { value: 'abcde' } });
		expect(dispatchStub).toHaveBeenCalledTimes(3);
		expect(dispatchStub.mock.calls[0][0]).toEqual({
			type: 'CHANGE_BLOCK',
			field: 'prev',
			index: 3,
			newValue: 'abc',
		});
		expect(dispatchStub.mock.calls[1][0]).toEqual({
			type: 'CHANGE_BLOCK',
			field: 'prev',
			index: 3,
			newValue: 'abcd',
		});
		expect(dispatchStub.mock.calls[2][0]).toEqual({
			type: 'CHANGE_BLOCK',
			field: 'prev',
			index: 3,
			newValue: 'abcde',
		});
	});
});
