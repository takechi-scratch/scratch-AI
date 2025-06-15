// llmにリクエストを送り、応答を受け取る
// 入力: ユーザーとのチャット履歴、ブロックの構造（JSONで定義？）
// 出力: LLMの応答（JSONで、ブロック化がしやすい形で返す）

/**
 * モック: ユーザー入力に応じてブロック構造を返す
 * @param {Array} messages チャット履歴
 * @returns {Promise<object>} ブロック構造JSON
 */
export const requestLLM = function (messages) {
    const lastMsg = messages[messages.length - 1]?.text || '';
    // 例: "足し算" で加算ブロックを返す
    if (lastMsg.includes('足し算')) {
        return Promise.resolve({
            opcode: 'operator_add',
            inputs: [
                {name: 'NUM1', value: 3},
                {name: 'NUM2', value: 5}
            ]
        });
    }
    // デフォルト: 数字ブロック
    return Promise.resolve({
        opcode: 'motion_movesteps',
        inputs: [
            {name: 'STEPS', value: 10}
        ]
    });
};


// ('motion_movesteps', [
//     { name: 'STEPS', value: 10 }
// ]);

// ('motion_gotoxy', [
//     { name: 'X', value: 20 },
//     { name: 'Y', value: 30 }
// ]);
