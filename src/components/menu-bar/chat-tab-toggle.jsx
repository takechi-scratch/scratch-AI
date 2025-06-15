import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {toggleChatTab} from '../../reducers/chat-tab';
import styles from './chat-tab-toggle.css';

const ChatTabToggle = ({visible, onToggle}) => (
    <button
        className={styles.chatTabToggleButton}
        onClick={onToggle}
        aria-label={visible ? 'チャットを隠す' : 'チャットを表示'}
        title={visible ? 'チャットを隠す' : 'チャットを表示'}
    >
        <span>{visible ? '&#x25B6' : '&#x25C0'}</span>
        <span className={styles.label}>
            <FormattedMessage
                defaultMessage="Chat"
                description="Button to toggle chat tab"
                id="gui.menuBar.toggleChatTab"
            />
        </span>
    </button>
);

ChatTabToggle.propTypes = {
    visible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    visible: state.scratchGui.chatTab.visible
});

const mapDispatchToProps = dispatch => ({
    onToggle: () => dispatch(toggleChatTab())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTabToggle);
