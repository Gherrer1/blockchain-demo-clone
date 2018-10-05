/* eslint-disable no-console */

const logger = store => next => (action) => {
	console.group(action.type);
	console.log('old state:', store.getState());
	const result = next(action);
	console.log('next state:', store.getState());
	console.groupEnd();
	return result;
};

export default logger;
