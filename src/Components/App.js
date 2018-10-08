import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ConnectedBlockchain from './Blockchain';
import { blocks } from '../reducers';
import logger from '../middleware';
import { block } from '../utils';

const initialState = [block(), block(block()), block(block(block()))];
const store = createStore(blocks, initialState, applyMiddleware(logger));
const App = () => (
	<Provider store={store}>
		<ConnectedBlockchain />
	</Provider>
);

export default App;
