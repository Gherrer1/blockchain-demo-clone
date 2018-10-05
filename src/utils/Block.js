import sha256 from 'crypto-js/sha256';

function zeroHash() {
	return new Array(64).join('0');
}

export default function Block(prevBlock = null) {
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
