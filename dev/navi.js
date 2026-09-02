(function () {
  "use strict";

  /* =========================================================
     NA'VI — CONTROL COMPANION
     UI TEST VERSION
     ========================================================= */

  const NAVI_IMAGE =
    "https://d1yei2z3i6k35z.cloudfront.net/10602272/6a9802a28dcee0.81540527_Na-vi.gif";

  /* ---------------------------------------------------------
     FIND THE SYSTEME.IO NA'VI LOCATION
     --------------------------------------------------------- */

  const container = document.getElementById("navi-companion");

  if (!container) {
    console.warn(
      "Na’Vi: #navi-companion was not found on this page."
    );
    return;
  }

  /* ---------------------------------------------------------
     READ PAGE INFORMATION FROM SYSTEME.IO
     --------------------------------------------------------- */

  const page =
    container.dataset.naviPage || "unknown-page";

  const context =
    container.dataset.naviContext || "general";

  /* ---------------------------------------------------------
     CREATE THE MAIN NA'VI WRAPPER
     --------------------------------------------------------- */

  const wrapper = document.createElement("div");

  wrapper.id = "navi-widget";

  /* ---------------------------------------------------------
     WRAPPER STYLING
     --------------------------------------------------------- */

  Object.assign(wrapper.style, {
    position: "relative",
    width: "100%",
    maxWidth: "390px",
    marginLeft: "auto",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    textAlign: "left"
  });

  /* ---------------------------------------------------------
     CHAT WINDOW
     --------------------------------------------------------- */

  const chat = document.createElement("div");

  chat.id = "navi-chat";

  Object.assign(chat.style, {
    display: "none",
    position: "absolute",
    right: "0",
    bottom: "145px",
    width: "360px",
    maxWidth: "calc(100vw - 30px)",
    height: "520px",
    maxHeight: "70vh",
    background: "#ffffff",
    border: "1px solid #d9e2d5",
    borderRadius: "18px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
    overflow: "hidden",
    zIndex: "99999",
    boxSizing: "border-box",
    flexDirection: "column"
  });

  /* ---------------------------------------------------------
     CHAT HEADER
     --------------------------------------------------------- */

  const header = document.createElement("div");

  Object.assign(header.style, {
    padding: "16px 18px",
    borderBottom: "1px solid #e8eee5",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: "0"
  });

  const headerLeft = document.createElement("div");

  const title = document.createElement("div");

  title.textContent = "Chat with Na’Vi 🌿";

  Object.assign(title.style, {
    fontSize: "18px",
    fontWeight: "700",
    color: "#245c3a",
    marginBottom: "3px"
  });

  const subtitle = document.createElement("div");

  subtitle.textContent =
    "Your CONTROL Companion is here to help.";

  Object.assign(subtitle.style, {
    fontSize: "12px",
    color: "#777777"
  });

  headerLeft.appendChild(title);
  headerLeft.appendChild(subtitle);

  /* Close button */

  const closeButton = document.createElement("button");

  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Close Na’Vi chat");

  Object.assign(closeButton.style, {
    width: "32px",
    height: "32px",
    border: "none",
    background: "transparent",
    fontSize: "25px",
    lineHeight: "25px",
    color: "#555555",
    cursor: "pointer",
    padding: "0"
  });

  header.appendChild(headerLeft);
  header.appendChild(closeButton);

  /* ---------------------------------------------------------
     CHAT BODY
     --------------------------------------------------------- */

  const body = document.createElement("div");

  Object.assign(body.style, {
    flex: "1",
    overflowY: "auto",
    padding: "18px",
    background: "#fcfdfb",
    boxSizing: "border-box"
  });

  /* ---------------------------------------------------------
     NA'VI MESSAGE
     --------------------------------------------------------- */

  const naviMessageRow = document.createElement("div");

  Object.assign(naviMessageRow.style, {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "16px"
  });

  const smallNavi = document.createElement("img");

  smallNavi.src = NAVI_IMAGE;
  smallNavi.alt = "Na’Vi";

  Object.assign(smallNavi.style, {
    width: "42px",
    height: "auto",
    flexShrink: "0"
  });

  const naviBubble = document.createElement("div");

  Object.assign(naviBubble.style, {
    background: "#ffffff",
    border: "1px solid #e8e8e8",
    borderRadius: "14px",
    padding: "12px 14px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#333333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  });

  const naviGreeting = document.createElement("strong");

  naviGreeting.textContent = "Hi, I’m Na’Vi! 🌿";

  const naviText = document.createElement("p");

  naviText.textContent =
    "I’m here to help you navigate your CONTROL learning experience with clarity, confidence and control.";

  Object.assign(naviText.style, {
    margin: "7px 0 0 0"
  });

  naviBubble.appendChild(naviGreeting);
  naviBubble.appendChild(naviText);

  naviMessageRow.appendChild(smallNavi);
  naviMessageRow.appendChild(naviBubble);

  body.appendChild(naviMessageRow);

  /* ---------------------------------------------------------
     TEST STUDENT MESSAGE
     --------------------------------------------------------- */

  const studentBubble = document.createElement("div");

  studentBubble.textContent =
    "I’m feeling overwhelmed and I don’t know where to start.";

  Object.assign(studentBubble.style, {
    marginLeft: "48px",
    marginBottom: "16px",
    background: "#eef5ea",
    borderRadius: "14px",
    padding: "12px 14px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#333333"
  });

  body.appendChild(studentBubble);

  /* ---------------------------------------------------------
     TEST NA'VI RESPONSE
     --------------------------------------------------------- */

  const responseRow = document.createElement("div");

  Object.assign(responseRow.style, {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "16px"
  });

  const responseNavi = document.createElement("img");

  responseNavi.src = NAVI_IMAGE;
  responseNavi.alt = "Na’Vi";

  Object.assign(responseNavi.style, {
    width: "42px",
    height: "auto",
    flexShrink: "0"
  });

  const responseBubble = document.createElement("div");

  Object.assign(responseBubble.style, {
    background: "#ffffff",
    border: "1px solid #e8e8e8",
    borderRadius: "14px",
    padding: "12px 14px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#333333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  });

  const responseStrong = document.createElement("strong");

  responseStrong.textContent =
    "Let’s slow this down. 🌿";

  const responseText = document.createElement("p");

  responseText.textContent =
    "You don’t need to figure everything out at once. Let’s focus on one next step.";

  Object.assign(responseText.style, {
    margin: "7px 0 0 0"
  });

  responseBubble.appendChild(responseStrong);
  responseBubble.appendChild(responseText);

  responseRow.appendChild(responseNavi);
  responseRow.appendChild(responseBubble);

  body.appendChild(responseRow);

  /* ---------------------------------------------------------
     QUICK ACTIONS
     --------------------------------------------------------- */

  const quickTitle = document.createElement("div");

  quickTitle.textContent =
    "How are you feeling right now?";

  Object.assign(quickTitle.style, {
    fontWeight: "700",
    fontSize: "13px",
    margin: "8px 0 10px 48px",
    color: "#333333"
  });

  body.appendChild(quickTitle);

  const quickActions = document.createElement("div");

  Object.assign(quickActions.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    marginLeft: "48px",
    marginBottom: "18px"
  });

  const quickOptions = [
    "Overwhelmed",
    "Not Sure",
    "Behind",
    "Need Support",
    "Other"
  ];

  quickOptions.forEach(function (option) {

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = option;

    Object.assign(button.style, {
      background: "#ffffff",
      border: "1px solid #d8dfd5",
      borderRadius: "18px",
      padding: "7px 10px",
      fontSize: "11px",
      color: "#333333",
      cursor: "pointer"
    });

    button.addEventListener("click", function () {

      addStudentMessage(option);

    });

    quickActions.appendChild(button);

  });

  body.appendChild(quickActions);

  /* ---------------------------------------------------------
     PAGE CONTEXT — TEMPORARY TEST DISPLAY
     --------------------------------------------------------- */

  const contextInfo = document.createElement("div");

  contextInfo.textContent =
    "Page: " + page + " | Context: " + context;

  Object.assign(contextInfo.style, {
    fontSize: "10px",
    color: "#999999",
    textAlign: "center",
    marginTop: "10px"
  });

  body.appendChild(contextInfo);

  /* ---------------------------------------------------------
     INPUT AREA
     --------------------------------------------------------- */

  const inputArea = document.createElement("div");

  Object.assign(inputArea.style, {
    padding: "10px",
    borderTop: "1px solid #e8eee5",
    background: "#ffffff",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    flexShrink: "0",
    boxSizing: "border-box"
  });

  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "Type your message to Na’Vi...";
  input.setAttribute("aria-label", "Message Na’Vi");

  Object.assign(input.style, {
    flex: "1",
    minWidth: "0",
    height: "42px",
    border: "1px solid #d9dfd7",
    borderRadius: "12px",
    padding: "0 12px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box"
  });

  const sendButton = document.createElement("button");

  sendButton.type = "button";
  sendButton.textContent = "➤";
  sendButton.setAttribute("aria-label", "Send message");

  Object.assign(sendButton.style, {
    width: "42px",
    height: "42px",
    border: "none",
    borderRadius: "50%",
    background: "#176b3a",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
    flexShrink: "0"
  });

  inputArea.appendChild(input);
  inputArea.appendChild(sendButton);

  /* ---------------------------------------------------------
     FOOTER
     --------------------------------------------------------- */

  const footer = document.createElement("div");

  footer.textContent =
    "🌿 Na’Vi is here to guide you, not replace your decisions.";

  Object.assign(footer.style, {
    fontSize: "10px",
    color: "#777777",
    textAlign: "center",
    padding: "7px 10px",
    background: "#ffffff",
    flexShrink: "0"
  });

  /* ---------------------------------------------------------
     ASSEMBLE CHAT
     --------------------------------------------------------- */

  chat.appendChild(header);
  chat.appendChild(body);
  chat.appendChild(inputArea);
  chat.appendChild(footer);

  /* ---------------------------------------------------------
     MAIN NA'VI IMAGE
     --------------------------------------------------------- */

  const naviButton = document.createElement("button");

  naviButton.type = "button";
  naviButton.setAttribute("aria-label", "Open Na’Vi chat");

  Object.assign(naviButton.style, {
    display: "block",
    marginLeft: "auto",
    padding: "0",
    border: "none",
    background: "transparent",
    cursor: "pointer"
  });

  const mainNavi = document.createElement("img");

  mainNavi.src = NAVI_IMAGE;
  mainNavi.alt = "Na’Vi — CONTROL Companion";

  Object.assign(mainNavi.style, {
    width: "120px",
    height: "auto",
    display: "block"
  });

  naviButton.appendChild(mainNavi);

  /* ---------------------------------------------------------
     OPEN CHAT
     --------------------------------------------------------- */

  function openChat() {

    chat.style.display = "flex";

    input.focus();

  }

  /* ---------------------------------------------------------
     CLOSE CHAT
     --------------------------------------------------------- */

  function closeChat() {

    chat.style.display = "none";

  }

  naviButton.addEventListener("click", openChat);

  closeButton.addEventListener("click", closeChat);

  /* ---------------------------------------------------------
     ADD STUDENT MESSAGE
     --------------------------------------------------------- */

  function addStudentMessage(text) {

    const message = document.createElement("div");

    message.textContent = text;

    Object.assign(message.style, {
      marginLeft: "48px",
      marginBottom: "12px",
      background: "#eef5ea",
      borderRadius: "14px",
      padding: "10px 12px",
      fontSize: "13px",
      lineHeight: "1.5",
      color: "#333333"
    });

    body.insertBefore(message, contextInfo);

    body.scrollTop = body.scrollHeight;

  }

  /* ---------------------------------------------------------
     SEND TEST MESSAGE
     --------------------------------------------------------- */

  function sendMessage() {

    const text = input.value.trim();

    if (!text) {
      return;
    }

    addStudentMessage(text);

    input.value = "";

    /*
      AI CONNECTION WILL GO HERE LATER.

      For now this only displays the student's
      message so we can test the interface.
    */

  }

  sendButton.addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

      event.preventDefault();

      sendMessage();

    }

  });

  /* ---------------------------------------------------------
     ADD WIDGET TO SYSTEME.IO PAGE
     --------------------------------------------------------- */

  wrapper.appendChild(chat);
  wrapper.appendChild(naviButton);

  container.appendChild(wrapper);

})();