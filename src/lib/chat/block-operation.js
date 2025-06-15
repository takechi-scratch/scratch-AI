// 必要な機能は追加すること

export class ManageBlocks {
    constructor (workspace) {
        this.workspace = workspace; // 直接インスタンスを受け取る
    }

    addBlock (opcode, inputs = []) {
        const block = this.workspace.newBlock(opcode);
        block.initSvg();
        block.render();

        for (const input of inputs) {
            const inputBlock = this.addNumberBlock_(input.value);
            const inputConnection = block.getInput(input.name);
            if (
                inputConnection &&
                inputConnection.connection &&
                inputBlock.outputConnection
            ) {
                inputConnection.connection.connect(inputBlock.outputConnection);
            }
        }

        return block;
    }

    addNumberBlock_ (value) {
        const numberBlock = this.workspace.newBlock('math_number');
        numberBlock.setShadow(true); // 数字ブロックが外れなくなる
        numberBlock.setFieldValue(String(value), 'NUM');
        numberBlock.initSvg();
        numberBlock.render();
        return numberBlock;
    }

    connectBlocks (existingBlock, newBlock) {
        if (existingBlock.nextConnection && newBlock.previousConnection) {
            existingBlock.nextConnection.connect(newBlock.previousConnection);
        }
    }
}
