import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import { blocks } from '../reducers';

export default function Root({ initialState = [], children }) {
	const store = createStore(blocks, initialState);
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}
Root.propTypes = {
	initialState: PropTypes.array,
	children: PropTypes.any,
};
Root.defaultProps = {
	initialState: [],
	children: null,
};
