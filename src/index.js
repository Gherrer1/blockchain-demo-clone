import { createStore, applyMiddleware } from 'redux';
import { blocks } from './reducers';
import logger from './middleware';
import { addBlock } from './actionCreators';

const store = createStore(blocks, applyMiddleware(logger));
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
// store.dispatch(hashBlock(0));
