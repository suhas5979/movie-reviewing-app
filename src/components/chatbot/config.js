// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (message.includes("hello")) {
      this.actionProvider.handleHello();
    }
  }
}

// ActionProvider starter code
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleHello() {
    const message = this.createChatBotmessage("Hello. Nice to meet you.");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}



const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
};

export { config, ActionProvider, MessageParser };
