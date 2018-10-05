function zeroHash() {
	return new Array(64).join('0');
}

export default function Block(blockNum = 1, prevHash = zeroHash()) {
	return {
		blockNum,
		prev: prevHash,
		hash: null,
	};
}
