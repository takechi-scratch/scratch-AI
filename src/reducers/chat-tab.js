// チャットタブの表示・非表示を管理するreducer
const TOGGLE_CHAT_TAB = 'scratch-gui/chatTab/TOGGLE_CHAT_TAB';
const SHOW_CHAT_TAB = 'scratch-gui/chatTab/SHOW_CHAT_TAB';
const HIDE_CHAT_TAB = 'scratch-gui/chatTab/HIDE_CHAT_TAB';

const initialState = {
    visible: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case TOGGLE_CHAT_TAB:
        return {...state, visible: !state.visible};
    case SHOW_CHAT_TAB:
        return {...state, visible: true};
    case HIDE_CHAT_TAB:
        return {...state, visible: false};
    default:
        return state;
    }
};

const toggleChatTab = () => ({type: TOGGLE_CHAT_TAB});
const showChatTab = () => ({type: SHOW_CHAT_TAB});
const hideChatTab = () => ({type: HIDE_CHAT_TAB});

export default reducer;
export {
    toggleChatTab,
    showChatTab,
    hideChatTab
};
