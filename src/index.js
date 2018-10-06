import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { blocks } from './reducers';
import logger from './middleware';
import { addBlock, changeBlock } from './actionCreators';
import Blockchain from './Components/Blockchain';

const store = createStore(blocks, applyMiddleware(logger));

ReactDOM.render(
	<Provider store={store}>
		<Blockchain />
	</Provider>,
	document.getElementById('app'),
);

// const store = createStore(blocks, applyMiddleware(logger));
// store.dispatch(addBlock());
// store.dispatch(addBlock());
// store.dispatch(addBlock());
// store.dispatch(addBlock());
// store.dispatch(addBlock());
// store.dispatch(addBlock());
// store.dispatch(changeBlock(0, 'prev', 'abc'));
// store.dispatch(hashBlock(0));
