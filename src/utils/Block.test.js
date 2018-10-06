import sha256 from 'crypto-js/sha256';
import { block as Block, hashBlock, updatedBlock } from './block';

describe('Block', () => {
	let prevBlock;
	beforeEach(() => {
		prevBlock = Block();
	});
	it('should return an object with these properties: prev, hash, blockNum', () => {
		const block = Block();
		expect(block.prev).toEqual(expect.anything());
		expect(block.hash).toEqual(expect.anything());
		expect(block.blockNum).toEqual(expect.anything());
	});
	it('should have default values of 0x64, c539...134, and 1 if not called with prevBlock argument', () => {
		const block = Block();
		expect(block.prev).toEqual(new Array(64).join('0'));
		expect(block.blockNum).toEqual(1);
		expect(block.hash).toEqual('c539e8ac5c32ab5c11566bc6ce93e10f1b52d23323899f6971855301c2ec9134');
	});
	it('should have .prev set to prevBlock param\'s .hash', () => {
		let prev = prevBlock.hash;
		let block = Block(prevBlock);
		expect(block.prev).toEqual(prev);

		// multiple layers deep
		block = Block(block);
		block = Block(block);
		block = Block(block);
		prev = block.hash;
		block = Block(block);
		expect(block.prev).toEqual(prev);
	});
	it('should have .blockNum set to 1 + prevBlock param\'s .blockNum', () => {
		let expectedBlockNum = prevBlock.blockNum + 1;
		let block = Block(prevBlock);
		expect(block.blockNum).toEqual(expectedBlockNum);

		// multiple layers deep
		block = Block(block);
		block = Block(block);
		block = Block(block);
		expectedBlockNum = block.blockNum + 1;
		block = Block(block);
		expect(block.blockNum).toEqual(expectedBlockNum);
	});
	it('should have .hash set to hash of its blockNum + all data, whether or not prevBlock passed in', () => {
		// prevBlock not passed in
		let block = Block();
		let { blockNum, prev } = block;
		let toBeHashed = `${blockNum}${prev}`;
		let expectedHash = sha256(toBeHashed).toString();
		expect(block.hash).toEqual(expectedHash);
		// prevBlock passed in
		block = Block(prevBlock);
		({ blockNum, prev } = block);
		toBeHashed = `${blockNum}${prev}`;
		expectedHash = sha256(toBeHashed).toString();
		expect(block.hash).toEqual(expectedHash);

		// multiple layers deep
		block = Block(block);
		block = Block(block);
		block = Block(block);
		({ blockNum, prev } = block);
		toBeHashed = `${blockNum}${prev}`;
		expectedHash = sha256(toBeHashed).toString();
		expect(block.hash).toEqual(expectedHash);
	});
});

describe('hashBlock', () => {
	it('should hash based on these fields: blockNum, prev', () => {
		const block = Block();
		const { blockNum, prev } = block;
		const toHash = `${blockNum}${prev}`;
		const expectedHash = sha256(toHash).toString();
		const hash = hashBlock(block);
		expect(hash).toEqual(expectedHash);
	});
	it('should hashed based on the above fields for not-just-first blocks', () => {
		let block = Block();
		block = Block(block);
		block = Block(block);
		const { blockNum, prev } = block;
		const toHash = `${blockNum}${prev}`;
		const expectedHash = sha256(toHash).toString();
		const hash = hashBlock(block);
		expect(hash).toEqual(expectedHash);
	});
});

describe('updatedBlock', () => {
	let oldBlock;
	beforeEach(() => {
		oldBlock = Block(Block());
	});
	it('should return a different block with diff hash if we update prev', () => {
		const newBlock = updatedBlock(oldBlock, 'prev', 'abc');
		expect(newBlock.hash).not.toEqual(oldBlock.hash);
		// throw new Error('unimplemented');
	});
	it('should return a different block if we update blockNum', () => {
		const newBlock = updatedBlock(oldBlock, 'blockNum', 10000000);
		expect(newBlock.hash).not.toEqual(oldBlock.hash);
	});
	it('should return the block with same hash if we update a field that doesnt matter for hash', () => {
		const newBlock = updatedBlock(oldBlock, 'huh?', 'huh?');
		expect(newBlock.hash).toEqual(oldBlock.hash);
	});
});
