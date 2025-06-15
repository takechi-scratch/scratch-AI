import React from 'react';
import PropTypes from 'prop-types';
import ChatTab from '../components/chat-tab/chat-tab.jsx';
import {requestLLM} from '../lib/chat/chat-api.js';
import {ManageBlocks} from '../lib/chat/block-operation.js';

/**
 * Chatコンテナ: チャットUIとLLM/ブロック操作をつなぐ
 *
 * props:
 *   workspace: Blocklyのワークスペース参照
 */
class ChatContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [
                {sender: 'system', text: 'チャットへようこそ！'}
            ],
            sending: false
        };
        this.handleSend = this.handleSend.bind(this);
    }

    async handleSend (inputText) {
        if (!inputText.trim()) return;
        const {messages} = this.state;
        const newMessages = messages.concat({sender: 'user', text: inputText});
        this.setState({messages: newMessages, sending: true});
        try {
            // LLM API呼び出し
            const blockJson = await requestLLM(newMessages);
            // ブロック組み立て
            if (!(window.Blockly && typeof window.Blockly.getMainWorkspace === 'function')) {
                // Blocklyが読み込まれていない場合はエラー
                throw new Error('Blockly is not ready');
            }
            const workspace = window.Blockly.getMainWorkspace();
            if (workspace && blockJson && blockJson.opcode) {
                const manager = new ManageBlocks(workspace);
                const block = manager.addBlock(blockJson.opcode, blockJson.inputs);
                block.moveBy(40, 40); // 適当に配置
            }
            // チャットにアシスタント応答を追加
            const replyText = blockJson.opcode === 'math_arithmetic' ? '加算ブロックを作成しました。' : 'ブロックを作成しました。';
            this.setState({
                messages: newMessages.concat({sender: 'assistant', text: replyText}),
                sending: false
            });
        } catch (e) {
            this.setState({
                messages: newMessages.concat({sender: 'assistant', text: 'エラーが発生しました。'}),
                sending: false
            });
        }
    }

    render () {
        return (
            <ChatTab
                messages={this.state.messages}
                onSend={this.handleSend}
                visible={this.props.visible}
                onToggle={this.props.onToggle}
            />
        );
    }
}

ChatContainer.propTypes = {
    visible: PropTypes.bool,
    onToggle: PropTypes.func
};

export default ChatContainer;
