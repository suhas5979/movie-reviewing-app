class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessageParserDocs = () => {
    const messages = this.createChatBotMessage(
      "Click on the movie that you want to review and then enter rating and reviews.",
      { widget: "Question 1", withAvatar: true }
    );

    this.addMessageToBotState(messages);
  };

  handleActionProviderDocs = () => {
    const messages = [
      this.createChatBotMessage(
        "Go to Search Tab Located on bottom navigation bar, Enter movie tirle you want to search, press enter and choose options from Movie and Tv Series.",
        { widget: "actionProviderDocs", withAvatar: true }
      ),
    ];

    this.addMessageToBotState(messages);
  };

  handleConfigDocs = () => {
    const messages = this.createChatBotMessage(
      "Select movie that you want to see the cast of movie then click on that movie the modal will pop up and Carousel contains all casts from movie.",
      { widget: "config", withAvatar: true }
    );

    this.addMessageToBotState(messages);
  };

  handleWidgetDocs = () => {
    const messages = this.createChatBotMessage(
      "Please make sure you are logged in.",
      { widget: "widget", withAvatar: true }
    );

    this.addMessageToBotState(messages);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "How can I help? Here is the overview.",
      {
        withAvatar: true,
        widget: "overview",
      }
    );

    this.addMessageToBotState(message);
  };

  addMessageToBotState = (messages, newState) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        ...newState,
        messages: [...state.messages, ...messages],
        gist: "",
        infoBox: "",
      }));
    } else {
      this.setState((state) => ({
        ...state,
        ...newState,
        messages: [...state.messages, messages],
        gist: "",
        infoBox: "",
      }));
    }
  };
}

export default ActionProvider;
