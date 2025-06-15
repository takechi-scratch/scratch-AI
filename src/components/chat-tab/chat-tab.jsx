import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

import styles from './chat-tab.css';

class ChatTab extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [
                {sender: 'system', text: 'チャットへようこそ！'}
            ],
            input: ''
        };
        this.messagesEndRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    componentDidUpdate () {
        if (this.messagesEndRef.current) {
            this.messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    handleInputChange (e) {
        this.setState({input: e.target.value});
    }

    handleInputKeyDown (e) {
        if (e.key === 'Enter') {
            this.handleSend();
        }
    }

    handleSend () {
        const {input, messages} = this.state;
        if (!input.trim()) return;
        this.setState({
            messages: [...messages, {sender: 'user', text: input}],
            input: ''
        });
    }

    render () {
        const {userName = 'User', visible, onToggle} = this.props;
        const {messages, input} = this.state;
        return (
            <div className={classNames(styles.chatTabContainer, {[styles.collapsed]: !visible})}>
                <button
                    className={styles.collapseButton}
                    onClick={onToggle}
                    aria-label={visible ? 'チャットを隠す' : 'チャットを表示'}
                    title={visible ? 'チャットを隠す' : 'チャットを表示'}
                >
                    {visible ? '\u25B6' : '\u25C0'}
                </button>
                <div className={styles.chatTabHeader}>{'チャット'}</div>
                <div className={styles.chatMessages}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={classNames(styles.chatMessage, {
                                [styles.user]: msg.sender === 'user'
                            })}
                        >
                            {msg.sender === 'user' ? `${userName}: ` : ''}{msg.text}
                        </div>
                    ))}
                    <div ref={this.messagesEndRef} />
                </div>
                <div className={styles.chatInputContainer}>
                    <input
                        className={styles.chatInput}
                        type="text"
                        value={input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                        placeholder="メッセージを入力..."
                    />
                    <button
                        className={styles.sendButton}
                        onClick={this.handleSend}
                    >
                        {'送信'}
                    </button>
                </div>
            </div>
        );
    }
}

ChatTab.propTypes = {
    userName: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    visible: state.scratchGui.chatTab.visible
});
const mapDispatchToProps = dispatch => ({
    onToggle: () => dispatch(require('../../reducers/chat-tab').toggleChatTab())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);
