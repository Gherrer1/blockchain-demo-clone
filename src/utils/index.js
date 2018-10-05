import sha256 from 'crypto-js/sha256';

function zeroHash() {
	return new Array(64).join('0');
}

export default function Block(blockNum = 1, prevHash = zeroHash()) {
	const dataToHash = `${blockNum}${prevHash}`;

	const hash = sha256(dataToHash).toString();
	return {
		blockNum,
		prev: prevHash,
		hash,
	};
}
