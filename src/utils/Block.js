import sha256 from 'crypto-js/sha256';

function zeroHash() {
	return new Array(64).join('0');
}

export function getToHashStrFromBlock(_block) {
	const { blockNum, nonce, prev } = _block;
	return `${blockNum}${nonce}${prev}`;
}

export function hashBlock(_block) {
	// NOTE: this is subject to be expanded
	const toHash = getToHashStrFromBlock(_block);
	return sha256(toHash).toString();
}

export function updatedBlock(_block, field, newValue) {
	const newBlock = {
		..._block,
		[field]: newValue,
	};
	newBlock.hash = hashBlock(newBlock);
	return newBlock;
}

export function block(prevBlock = null) {
	if (prevBlock) {
		const blockNum = prevBlock.blockNum + 1;
		const prev = prevBlock.hash;
		const nonce = '';
		const toBeHashed = getToHashStrFromBlock({ blockNum, prev, nonce });
		const hash = sha256(toBeHashed).toString();
		return {
			prev,
			blockNum,
			nonce,
			hash,
		};
	}

	const blockNum = 1;
	const nonce = '';
	const prev = zeroHash();
	const toBeHashed = getToHashStrFromBlock({ blockNum, nonce, prev });
	const hash = sha256(toBeHashed).toString();
	return {
		prev: zeroHash(),
		hash,
		blockNum: 1,
		nonce,
	};
}
