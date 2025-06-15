import React from 'react';
import {connect} from 'react-redux';
import ChatContainer from './chat.jsx';
import PropTypes from 'prop-types';
import {toggleChatTab} from '../reducers/chat-tab';

// Redux状態と連携し、チャットタブの表示/非表示やワークスペース参照を管理するラッパー
// workspaceはpropsで受け取る（gui.jsxから渡す）
const ChatTabWrapper = ({visible, workspace, onToggle}) => (
    <ChatContainer
        workspace={workspace}
        visible={visible}
        onToggle={onToggle}
    />
);

ChatTabWrapper.propTypes = {
    visible: PropTypes.bool,
    workspace: PropTypes.object,
    onToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    visible: state.scratchGui.chatTab.visible
});
const mapDispatchToProps = dispatch => ({
    onToggle: () => dispatch(toggleChatTab())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTabWrapper);
