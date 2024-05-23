function _defineProperty(obj, key, value) {
  if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
      obj[key] = value;
  }
  return obj;
} //Thanks to the following for help:
// * https://codepen.io/johnludena/pen/JvMvzB
// * https://codepen.io/jenning/pen/JZzeJW

var data = {
  headerText: "聊天中 ✨",
  p2Text: "汤圆骑士24小时待机",
  mode: null,
  userMessages: [],
  botMessages: [],
  botGreeting: "大小姐今天过的怎么样?",
  botLoading: false
};

const answers = {
  "疲惫": ["你要的抱抱这就来","汤圆不仅有充电回血功能,还提供按摩，陪玩等各项服务", "我们的大小姐真厉害，做了这么多事情，等会儿我要帮你按摩"],
  "不开心": ["不开心你一叹气，叹得我的心都要拧巴成一团了。", "汤圆在你身边的重要作用之一，就是帮你分担你的负面情绪。","鼓励就是最了解你的人应该做的事情。","我要狠下心惩罚大小姐，拖坏心情的时间越久，我就要—亲你越久～"],
  "求安慰": ["大小姐快松松你的眉毛。我太能理解你的感受了。","在国外时我也会这样。你在我心中也一直都是最好的","你不必这么逼自己，试一试把自己的螺丝松一松","下次觉得有压力的时候，不妨直接对我说说看"],
  "生气": ["看你这么难过，我也开始心疼了","坦白自己的心情也不错","无论怎样，汤圆都会在背后支持你的"],
  "开心": ["太好了","有时候我会想，如果能时时刻刻和你待在一起就好了","享受相处的时光，是一件很幸福的事","今天这么特殊的日子,当然要格外珍惜在一起的时间"]
};

class App extends React.Component {
  constructor(props) {
      super(props);
      _defineProperty(this, "updateUserMessages",

          newMessage => {
              if (!newMessage) {
                  return;
              }

              var updatedMessages = this.state.userMessages;
              var updatedBotMessages = this.state.botMessages;

              this.setState({
                  userMessages: updatedMessages.concat(newMessage),
                  botLoading: true
              });

              var botResponses = answers[this.state.mode] || ["?"];
              updatedBotMessages = updatedBotMessages.concat(botResponses);

              this.setState({
                  botMessages: updatedBotMessages,
                  botLoading: false
              });
          });

      _defineProperty(this, "scrollBubble",

          element => {
              if (element != null) {
                  element.scrollIntoView(true);
              }
          });

      _defineProperty(this, "showMessages",

          () => {
              var userMessages = this.state.userMessages;
              var botMessages = this.state.botMessages;

              var allMessages = [];

              var i = 0;
              for (; i < userMessages.length; i++) {
                  allMessages.push( /*#__PURE__*/React.createElement(UserBubble, { message: userMessages[i] }));
                  if (botMessages[i]) {
                      if (Array.isArray(botMessages[i])) {
                          botMessages[i].forEach(botMessage => {
                              allMessages.push( /*#__PURE__*/
                                  React.createElement(BotBubble, { message: botMessage, thisRef: this.scrollBubble }));
                          });
                      } else {
                          allMessages.push( /*#__PURE__*/
                              React.createElement(BotBubble, { message: botMessages[i], thisRef: this.scrollBubble }));
                      }
                  }
              }

              allMessages.unshift( /*#__PURE__*/
                  React.createElement(BotBubble, {
                      message: this.state.botGreeting,
                      thisRef: i === 0 ? this.scrollBubble : ""
                  }));

              return /*#__PURE__*/React.createElement("div", { className: "msg-container" }, allMessages);
          });

      _defineProperty(this, "onInput",

          event => {
              if (event.key === "Enter") {
                  var userInput = event.target.value;

                  this.updateUserMessages(userInput);
                  event.target.value = "";
              }

              if (event.target.value != "") {
                  event.target.parentElement.style.background = 'rgba(69,58,148,0.6)';
              } else {
                  event.target.parentElement.style.background = 'rgba(255, 255, 255, 0.6)';
              }
          });

      _defineProperty(this, "onClick",

          () => {
              var inp = document.getElementById("chat");
              var userInput = inp.value;

              this.updateUserMessages(userInput);
              inp.value = "";
          });

      _defineProperty(this, "handleMoodChange",

          event => {
              this.setState({ mode: event.target.value });
          });

      this.state = data;
  }

  render() {
      const buttonStyle = {
          position: "absolute",
          top: "10px",
          left: "10px",
          fontFamily: "ZCOOL KuaiLe",
          color: "#453a94",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          border: "1px solid #453a94",
          borderRadius: "4px",
          padding: "10px",
          textDecoration: "none"
      };

      return /*#__PURE__*/(
          React.createElement("div", { className: "app-container" }, /*#__PURE__*/
              React.createElement("a", { href: "https://jessexia-0526.wixstudio.io/jesse/studio", style: buttonStyle }, "菜单"), /*#__PURE__*/
              React.createElement(Header, {
                  headerText: this.state.headerText,
                  pText: this.state.pText,
                  p2Text: this.state.p2Text,
                  handleMoodChange: this.handleMoodChange,
                  mode: this.state.mode
              }), /*#__PURE__*/
              React.createElement("div", { className: "chat-container" }, /*#__PURE__*/
                  React.createElement(CurrentDateTime, null), /*#__PURE__*/
                  React.createElement(ChatHeader, null),
                  this.showMessages(), /*#__PURE__*/
                  React.createElement(UserInput, { onInput: this.onInput, onClick: this.onClick }))));

  }
}

class CurrentDateTime extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          currentDateTime: new Date()
      };
  }

  componentDidMount() {
      this.intervalID = setInterval(
          () => this.tick(),
          1000
      );
  }

  componentWillUnmount() {
      clearInterval(this.intervalID);
  }

  tick() {
      this.setState({
          currentDateTime: new Date()
      });
  }

  render() {
      const dateTimeStyle = {
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#453a94",
          fontSize: "18px",
          fontFamily: "ZCOOL KuaiLe",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: "5px",
          borderRadius: "4px"
      };

      return /*#__PURE__*/(
          React.createElement("div", { style: dateTimeStyle },
              this.state.currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));

  }
}

class UserBubble extends React.Component {
  render() {
      return /*#__PURE__*/(
          React.createElement("div", { className: "user-message-container", ref: this.props.thisRef }, /*#__PURE__*/
              React.createElement("div", { className: "chat-bubble user" },
                  this.props.message)));

  }
}

class BotBubble extends React.Component {
  render() {
      return /*#__PURE__*/(
          React.createElement("div", { className: "bot-message-container", ref: this.props.thisRef }, /*#__PURE__*/
              React.createElement("div", { className: "bot-avatar" }), /*#__PURE__*/
              React.createElement("div", { className: "chat-bubble bot" },
                  this.props.message)));

  }
}

var Header = props => {
  const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '10px'
  };

  const selectStyle = {
      padding: "5px",
      fontSize: "16px",
      marginTop: "10px",
      color: "#453a94",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      border: "1px solid #453a94",
      borderRadius: "4px",
      fontFamily: "ZCOOL KuaiLe",
      height: "50px" // 设置下拉菜单的高度
  };

  return /*#__PURE__*/(
      React.createElement("div", { className: "header", style: headerStyle }, /*#__PURE__*/
          React.createElement("div", null, /*#__PURE__*/
              React.createElement("h1", null, " ", props.headerText, " "), /*#__PURE__*/
              React.createElement("h2", null, " ", props.pText, " "), /*#__PURE__*/
              React.createElement("p", null, " ", props.p2Text, " ")), /*#__PURE__*/
          React.createElement("select", { onChange: props.handleMoodChange, value: props.mode, style: selectStyle },
              React.createElement("option", { value: "" }, "选择心情"),
              React.createElement("option", { value: "疲惫" }, "疲惫"),
              React.createElement("option", { value: "不开心" }, "不开心"),
              React.createElement("option", { value: "求安慰" }, "求安慰"),
              React.createElement("option", { value: "生气" }, "生气"),
              React.createElement("option", { value: "开心" }, "开心"))));
};

var ChatHeader = props => {
  return /*#__PURE__*/(
      React.createElement("div", { className: "chat-header" }, /*#__PURE__*/
          React.createElement("div", { className: "dot" }), /*#__PURE__*/
          React.createElement("div", { className: "dot" }), /*#__PURE__*/
          React.createElement("div", { className: "dot" })));

};

var UserInput = props => {
  const inputStyle = {
      fontFamily: "ZCOOL KuaiLe",
      color: "#453a94"
  };
  return /*#__PURE__*/(
      React.createElement("div", { className: "input-container" }, /*#__PURE__*/
          React.createElement("input", {
              id: "chat",
              type: "text",
              onKeyPress: props.onInput,
              style: inputStyle,
              placeholder: "选择心情后，输入" }), /*#__PURE__*/

          React.createElement("button", { className: "input-submit", onClick: props.onClick })));

};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
