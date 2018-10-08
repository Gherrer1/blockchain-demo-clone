import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { blocks } from './reducers';
import logger from './middleware';
import { addBlock, changeBlock } from './actionCreators';
import Blockchain from './Components/Blockchain';
import ConnectedBlock from './Components/Block';
import { block } from './utils';

// const store = createStore(blocks, [block(), block(block())], applyMiddleware(logger));
const store = createStore(blocks, applyMiddleware(logger));

ReactDOM.render(
	<Provider store={store}>
		<Blockchain />
		{/* <ConnectedBlock index={0} /> */}
	</Provider>,
	document.getElementById('app'),
);
