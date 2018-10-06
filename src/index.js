import { createStore, applyMiddleware } from 'redux';
import { blocks } from './reducers';
import logger from './middleware';
import { addBlock, changeBlock } from './actionCreators';

const store = createStore(blocks, applyMiddleware(logger));
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(addBlock());
store.dispatch(changeBlock(0, 'prev', 'abc'));
// store.dispatch(hashBlock(0));
