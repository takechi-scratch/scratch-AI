import React from 'react';
import PropTypes from 'prop-types';
import ChatContainer from './chat.jsx';

/**
 * ChatContainerInjector: BlocksワークスペースがreadyになったらChatContainerに渡す
 */
class ChatContainerInjector extends React.Component {
    constructor (props) {
        super(props);
        this.state = {workspace: null};
        this.handleWorkspaceReady = this.handleWorkspaceReady.bind(this);
    }
    handleWorkspaceReady (workspace) {
        this.setState({workspace});
        if (this.props.onWorkspaceReady) this.props.onWorkspaceReady(workspace);
    }
    render () {
        return this.state.workspace ? (
            <ChatContainer workspace={this.state.workspace} />
        ) : null;
    }
}
ChatContainerInjector.propTypes = {
    onWorkspaceReady: PropTypes.func
};
export default ChatContainerInjector;
