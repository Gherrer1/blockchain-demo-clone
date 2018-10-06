import sha256 from 'crypto-js/sha256';

function zeroHash() {
	return new Array(64).join('0');
}

export function hashBlock(block) {
	// NOTE: this is subject to be expanded
	const { blockNum, prev } = block;
	const toHash = `${blockNum}${prev}`;
	return sha256(toHash).toString();
}

export function updatedBlock(block, field, newValue) {
	const newBlock = {
		...block,
		[field]: newValue,
	};
	newBlock.hash = hashBlock(newBlock);
	return newBlock;
}

export function block(prevBlock = null) {
	if (prevBlock) {
		const blockNum = prevBlock.blockNum + 1;
		const prev = prevBlock.hash;
		const toBeHashed = `${blockNum}${prev}`;
		const hash = sha256(toBeHashed).toString();
		return {
			prev,
			blockNum,
			hash,
		};
	}

	const blockNum = 1;
	const prev = zeroHash();
	const toBeHashed = `${blockNum}${prev}`;
	const hash = sha256(toBeHashed).toString();
	return {
		prev: zeroHash(),
		hash,
		blockNum: 1,
	};
}
