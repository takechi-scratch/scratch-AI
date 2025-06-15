import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './chat-tab.css';

class ChatTab extends React.Component {
    constructor (props) {
        super(props);
        this.messagesEndRef = React.createRef();
        this.state = {input: ''};
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
        if (e.key === 'Enter') this.handleSend();
    }
    handleSend () {
        const {input} = this.state;
        if (!input.trim()) return;
        if (this.props.onSend) this.props.onSend(input);
        this.setState({input: ''});
    }
    render () {
        const {messages = [], visible = true, onToggle} = this.props;
        const {input} = this.state;
        console.log(onToggle);
        return (
            <div
                className={classNames(styles.chatTabContainer, {
                    [styles.collapsed]: !visible
                })}
            >
                {onToggle && (
                    <button
                        className={styles.collapseButton}
                        onClick={onToggle}
                        aria-label={
                            visible ? 'チャットを隠す' : 'チャットを表示'
                        }
                        title={visible ? 'チャットを隠す' : 'チャットを表示'}
                    >
                        {visible ? '\u25B6' : '\u25C0'}
                    </button>
                )}

                <div className={styles.chatTabHeader}>{'チャット'}</div>
                <div className={styles.chatMessages}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={classNames(styles.chatMessage, {
                                [styles.user]: msg.sender === 'user'
                            })}
                        >
                            {msg.text}
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
    messages: PropTypes.array,
    visible: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onSend: PropTypes.func
};

export default ChatTab;
