(function () {
  "use strict";

  /* =========================================================
     NA'VI — CONTROL COMPANION
     Production Companion
     ========================================================= */

  const CONFIG = {

    /* -------------------------------------------------------
       NA'VI IMAGE STATES
       ------------------------------------------------------- */

    defaultImage:
      "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa12c0a38e7b5.84659750_Na-vi1.gif",

    /* -------------------------------------------------------
       SECURE BACKEND
       
       The OpenAI/Cloudflare endpoint will be added here
       after the CONTROL Knowledge Base is finalized.

       NEVER place an OpenAI API key in this file.
       ------------------------------------------------------- */

    apiEndpoint:
      "https://navi-brain.clarityframework01.workers.dev",

    /* -------------------------------------------------------
       NA'VI SIZE
       ------------------------------------------------------- */

    characterWidth: 120,

    /* -------------------------------------------------------
       CHAT SIZE
       ------------------------------------------------------- */

    chatWidth: 380,
    chatHeight: 560,

    /* -------------------------------------------------------
       CHAT POSITION
       ------------------------------------------------------- */

    chatRight: 20,
    chatBottom: 20,

    /* -------------------------------------------------------
       DRAG SETTINGS
       ------------------------------------------------------- */

    dragThreshold: 6,

    positionStorageKey:
      "navi_companion_position"

  };


  /* =========================================================
     NA'VI STATES
     ========================================================= */

  const NAVI_STATES = {

    /* -------------------------------------------------------
       1. FRIENDLY WAVE
       Welcome & Greeting
       ------------------------------------------------------- */

    friendlyWave: {

      name:
        "Friendly Wave",

      purpose:
        "Welcome & Greeting",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa12c0a38e7b5.84659750_Na-vi1.gif"

    },


    /* -------------------------------------------------------
       2. CONFIDENT GUIDE
       Decision & Direction
       ------------------------------------------------------- */

    confidentGuide: {

      name:
        "Confident Guide",

      purpose:
        "Decision & Direction",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa164a5135007.56245562_Na-vi1.gif"

    },


    /* -------------------------------------------------------
       3. ENCOURAGING SUPPORT
       Motivation & Reassurance
       ------------------------------------------------------- */

    encouragingSupport: {

      name:
        "Encouraging Support",

      purpose:
        "Motivation & Reassurance",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa169c82f6dd2.91566060_EncouragingSupport.gif"

    },


    /* -------------------------------------------------------
       4. OPEN ARMS
       Welcome Back & Recovery
       ------------------------------------------------------- */

    openArms: {

      name:
        "Open Arms",

      purpose:
        "Welcome Back & Recovery",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa16bb477d746.37099213_OpenArms.gif"

    },


    /* -------------------------------------------------------
       5. ON THE MOVE
       Action & Implementation
       ------------------------------------------------------- */

    onTheMove: {

      name:
        "On the Move",

      purpose:
        "Action & Implementation",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa16d235ec1f1.88850289_OntheMove.gif"

    },


    /* -------------------------------------------------------
       6. THOUGHTFUL REFLECTION
       Reflection & Insight
       ------------------------------------------------------- */

    thoughtfulReflection: {

      name:
        "Thoughtful Reflection",

      purpose:
        "Reflection & Insight",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa173788b4db9.21365458_ThoughtfulReflection.gif"

    },


    /* -------------------------------------------------------
       7. INSIGHT GUIDE
       Teaching & Clarifying
       ------------------------------------------------------- */

    insightGuide: {

      name:
        "Insight Guide",

      purpose:
        "Teaching & Clarifying",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa1706f52e8b7.18925687_INSIGHTGUIDE.gif"

    },


    /* -------------------------------------------------------
       8. CALM PRESENCE
       Emotional Support & Calm
       ------------------------------------------------------- */

    calmPresence: {

      name:
        "Calm Presence",

      purpose:
        "Emotional Support & Calm",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa17048a20018.95863785_CALMPRESENCE.gif"

    }

  };


  /* =========================================================
     FIND SYSTEME.IO NA'VI LOCATION
     ========================================================= */

  const container =
    document.getElementById(
      "navi-companion"
    );


  if (!container) {
    return;
  }


  /* =========================================================
     PAGE CONTEXT

     Used internally by the future AI/backend.
     Not displayed to the learner.
     ========================================================= */

  const page =
    container.dataset.naviPage ||
    "unknown-page";


  const context =
    container.dataset.naviContext ||
    "general";


  /* =========================================================
     SESSION
     ========================================================= */

  const SESSION_KEY =
    "navi_session_id";


  let sessionId =
    sessionStorage.getItem(
      SESSION_KEY
    );


  if (!sessionId) {

    sessionId =
      "navi-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 10);


    sessionStorage.setItem(
      SESSION_KEY,
      sessionId
    );

  }


  /* =========================================================
     ACTIVE STATE
     ========================================================= */

  let activeState =
    "friendlyWave";


  /* =========================================================
     CHAT OPEN STATE
     ========================================================= */

  let chatOpen =
    false;


  /* =========================================================
     CREATE NA'VI PAGE WRAPPER

     The wrapper remains in the normal page flow.

     Na'Vi initially appears exactly where the
     Systeme.io HTML block has been placed.
     ========================================================= */

  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.id =
    "navi-widget";


  Object.assign(
    wrapper.style,
    {

      position:
        "relative",

      width:
        "100%",

      boxSizing:
        "border-box",

      textAlign:
        "left",

      fontFamily:
        "-apple-system, BlinkMacSystemFont, " +
        "'Segoe UI', Arial, sans-serif",

      lineHeight:
        "normal",

      margin:
        "0",

      padding:
        "0"

    }
  );


  /* =========================================================
     NA'VI BUTTON
     ========================================================= */

  const naviButton =
    document.createElement(
      "button"
    );


  naviButton.type =
    "button";


  naviButton.setAttribute(
    "aria-label",
    "Open Na’Vi"
  );


  naviButton.setAttribute(
    "title",
    "Na’Vi"
  );


  Object.assign(
    naviButton.style,
    {

      display:
        "inline-flex",

      alignItems:
        "center",

      justifyContent:
        "center",

      margin:
        "0",

      padding:
        "0",

      border:
        "0",

      background:
        "transparent",

      cursor:
        "grab",

      lineHeight:
        "0",

      appearance:
        "none",

      WebkitAppearance:
        "none",

      touchAction:
        "none",

      userSelect:
        "none",

      WebkitUserSelect:
        "none"

    }
  );


  /* =========================================================
     MAIN NA'VI IMAGE
     ========================================================= */

  const mainNavi =
    document.createElement(
      "img"
    );


  mainNavi.src =
    NAVI_STATES[
      activeState
    ].image;


  mainNavi.alt =
    "Na’Vi — CONTROL Companion";


  mainNavi.draggable =
    false;


  mainNavi.loading =
    "eager";


  mainNavi.decoding =
    "async";


  Object.assign(
    mainNavi.style,
    {

      width:
        CONFIG.characterWidth +
        "px",

      height:
        "auto",

      maxWidth:
        "100%",

      display:
        "block",

      userSelect:
        "none",

      WebkitUserDrag:
        "none",

      pointerEvents:
        "none"

    }
  );


  naviButton.appendChild(
    mainNavi
  );


  /* =========================================================
     CHAT WINDOW

     The chat is fixed to the browser viewport.

     It is independent from Na'Vi's position.
     ========================================================= */

  const chat =
    document.createElement(
      "section"
    );


  chat.id =
    "navi-chat";


  chat.setAttribute(
    "aria-label",
    "Chat with Na’Vi"
  );


  Object.assign(
    chat.style,
    {

      display:
        "none",

      position:
        "fixed",

      right:
        CONFIG.chatRight +
        "px",

      bottom:
        CONFIG.chatBottom +
        "px",

      width:
        CONFIG.chatWidth +
        "px",

      maxWidth:
        "calc(100vw - 30px)",

      height:
        CONFIG.chatHeight +
        "px",

      maxHeight:
        "calc(100vh - 40px)",

      background:
        "#ffffff",

      border:
        "1px solid #dfe7dc",

      borderRadius:
        "20px",

      boxShadow:
        "0 16px 50px rgba(0,0,0,0.18)",

      overflow:
        "hidden",

      zIndex:
        "2147483000",

      boxSizing:
        "border-box",

      flexDirection:
        "column"

    }
  );


  /* =========================================================
     CHAT HEADER
     ========================================================= */

  const header =
    document.createElement(
      "header"
    );


  Object.assign(
    header.style,
    {

      display:
        "flex",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      padding:
        "15px 17px",

      background:
        "#ffffff",

      borderBottom:
        "1px solid #edf1eb",

      flexShrink:
        "0"

    }
  );


  const headerIdentity =
    document.createElement(
      "div"
    );


  Object.assign(
    headerIdentity.style,
    {

      display:
        "flex",

      alignItems:
        "center",

      gap:
        "10px",

      minWidth:
        "0"

    }
  );


  const headerNavi =
    document.createElement(
      "img"
    );


  headerNavi.src =
    NAVI_STATES[
      activeState
    ].image;


  headerNavi.alt =
    "";


  Object.assign(
    headerNavi.style,
    {

      width:
        "38px",

      height:
        "38px",

      objectFit:
        "contain",

      flexShrink:
        "0"

    }
  );


  const headerText =
    document.createElement(
      "div"
    );


  const title =
    document.createElement(
      "div"
    );


  title.textContent =
    "Na’Vi";


  Object.assign(
    title.style,
    {

      fontSize:
        "17px",

      fontWeight:
        "700",

      color:
        "#245c3a",

      lineHeight:
        "1.2"

    }
  );


  const subtitle =
    document.createElement(
      "div"
    );


  subtitle.textContent =
    "Your CONTROL Companion";


  Object.assign(
    subtitle.style,
    {

      marginTop:
        "3px",

      fontSize:
        "12px",

      color:
        "#737a73",

      lineHeight:
        "1.3"

    }
  );


  headerText.appendChild(
    title
  );


  headerText.appendChild(
    subtitle
  );


  headerIdentity.appendChild(
    headerNavi
  );


  headerIdentity.appendChild(
    headerText
  );


  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  const closeButton =
    document.createElement(
      "button"
    );


  closeButton.type =
    "button";


  closeButton.textContent =
    "×";


  closeButton.setAttribute(
    "aria-label",
    "Close Na’Vi"
  );


  Object.assign(
    closeButton.style,
    {

      width:
        "36px",

      height:
        "36px",

      border:
        "0",

      borderRadius:
        "50%",

      background:
        "transparent",

      color:
        "#555b55",

      fontSize:
        "26px",

      lineHeight:
        "36px",

      textAlign:
        "center",

      cursor:
        "pointer",

      padding:
        "0",

      flexShrink:
        "0"

    }
  );


  header.appendChild(
    headerIdentity
  );


  header.appendChild(
    closeButton
  );


  /* =========================================================
     CHAT BODY
     ========================================================= */

  const body =
    document.createElement(
      "div"
    );


  Object.assign(
    body.style,
    {

      flex:
        "1",

      overflowY:
        "auto",

      padding:
        "20px",

      background:
        "#fbfcfa",

      boxSizing:
        "border-box"

    }
  );


  /* =========================================================
     WELCOME MESSAGE
     ========================================================= */

  const welcomeRow =
    document.createElement(
      "div"
    );


  Object.assign(
    welcomeRow.style,
    {

      display:
        "flex",

      alignItems:
        "flex-start",

      gap:
        "10px",

      marginBottom:
        "18px"

    }
  );


  const welcomeNavi =
    document.createElement(
      "img"
    );


  welcomeNavi.src =
    NAVI_STATES[
      activeState
    ].image;


  welcomeNavi.alt =
    "";


  Object.assign(
    welcomeNavi.style,
    {

      width:
        "42px",

      height:
        "42px",

      objectFit:
        "contain",

      flexShrink:
        "0"

    }
  );


  const welcomeBubble =
    document.createElement(
      "div"
    );


  Object.assign(
    welcomeBubble.style,
    {

      background:
        "#ffffff",

      border:
        "1px solid #e5eae3",

      borderRadius:
        "15px",

      padding:
        "13px 15px",

      color:
        "#303530",

      fontSize:
        "13px",

      lineHeight:
        "1.55",

      boxShadow:
        "0 2px 8px rgba(0,0,0,0.04)"

    }
  );


  const welcomeTitle =
    document.createElement(
      "strong"
    );


  welcomeTitle.textContent =
    "Hi, I’m Na’Vi.";


  Object.assign(
    welcomeTitle.style,
    {

      display:
        "block",

      marginBottom:
        "5px",

      color:
        "#245c3a",

      fontSize:
        "14px"

    }
  );


  const welcomeText =
    document.createElement(
      "div"
    );


  welcomeText.textContent =
    "I’m here to help you move through your CONTROL learning journey with clarity, confidence and control.";


  welcomeBubble.appendChild(
    welcomeTitle
  );


  welcomeBubble.appendChild(
    welcomeText
  );


  welcomeRow.appendChild(
    welcomeNavi
  );


  welcomeRow.appendChild(
    welcomeBubble
  );


  body.appendChild(
    welcomeRow
  );


  /* =========================================================
     QUICK ACTION INTRODUCTION
     ========================================================= */

  const quickIntro =
    document.createElement(
      "div"
    );


  quickIntro.textContent =
    "What would you like help with?";


  Object.assign(
    quickIntro.style,
    {

      margin:
        "0 0 11px 52px",

      fontSize:
        "13px",

      fontWeight:
        "600",

      color:
        "#343934"

    }
  );


  body.appendChild(
    quickIntro
  );


  /* =========================================================
     QUICK ACTIONS
     ========================================================= */

  const quickActions =
    document.createElement(
      "div"
    );


  Object.assign(
    quickActions.style,
    {

      display:
        "flex",

      flexWrap:
        "wrap",

      gap:
        "8px",

      margin:
        "0 0 22px 52px"

    }
  );


  const quickOptions = [

    {
      label:
        "I’m overwhelmed",

      prompt:
        "I’m feeling overwhelmed and need help knowing where to start."

    },

    {
      label:
        "My next step",

      prompt:
        "Help me identify my next step."

    },

    {
      label:
        "Navigate my course",

      prompt:
        "Help me understand where I am in my CONTROL learning journey."

    },

    {
      label:
        "Reflect",

      prompt:
        "Help me reflect on what I’m learning."

    }

  ];


  quickOptions.forEach(
    function (option) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.textContent =
        option.label;


      Object.assign(
        button.style,
        {

          border:
            "1px solid #d7e0d3",

          borderRadius:
            "18px",

          background:
            "#ffffff",

          color:
            "#31563e",

          padding:
            "8px 12px",

          fontSize:
            "12px",

          fontWeight:
            "500",

          cursor:
            "pointer"

        }
      );


      button.addEventListener(
        "click",
        function () {

          submitUserMessage(
            option.prompt
          );

        }
      );


      quickActions.appendChild(
        button
      );

    }
  );


  body.appendChild(
    quickActions
  );


  /* =========================================================
     MESSAGE AREA
     ========================================================= */

  const messages =
    document.createElement(
      "div"
    );


  messages.id =
    "navi-messages";


  body.appendChild(
    messages
  );


  /* =========================================================
     INPUT AREA
     ========================================================= */

  const inputArea =
    document.createElement(
      "div"
    );


  Object.assign(
    inputArea.style,
    {

      display:
        "flex",

      alignItems:
        "center",

      gap:
        "8px",

      padding:
        "11px",

      background:
        "#ffffff",

      borderTop:
        "1px solid #edf1eb",

      flexShrink:
        "0",

      boxSizing:
        "border-box"

    }
  );


  const input =
    document.createElement(
      "input"
    );


  input.type =
    "text";


  input.placeholder =
    "Ask Na’Vi...";


  input.setAttribute(
    "aria-label",
    "Message Na’Vi"
  );


  Object.assign(
    input.style,
    {

      flex:
        "1",

      minWidth:
        "0",

      height:
        "44px",

      border:
        "1px solid #d8dfd6",

      borderRadius:
        "13px",

      padding:
        "0 13px",

      fontSize:
        "13px",

      color:
        "#303530",

      background:
        "#ffffff",

      outline:
        "none",

      boxSizing:
        "border-box"

    }
  );


  const sendButton =
    document.createElement(
      "button"
    );


  sendButton.type =
    "button";


  sendButton.setAttribute(
    "aria-label",
    "Send message"
  );


  sendButton.textContent =
    "➤";


  Object.assign(
    sendButton.style,
    {

      width:
        "44px",

      height:
        "44px",

      border:
        "0",

      borderRadius:
        "50%",

      background:
        "#176b3a",

      color:
        "#ffffff",

      fontSize:
        "18px",

      cursor:
        "pointer",

      flexShrink:
        "0",

      display:
        "flex",

      alignItems:
        "center",

      justifyContent:
        "center"

    }
  );


  inputArea.appendChild(
    input
  );


  inputArea.appendChild(
    sendButton
  );


  /* =========================================================
     FOOTER
     ========================================================= */

  const footer =
    document.createElement(
      "div"
    );


  footer.textContent =
    "Na’Vi helps you navigate your learning journey.";


  Object.assign(
    footer.style,
    {

      padding:
        "7px 12px",

      background:
        "#ffffff",

      color:
        "#777d77",

      fontSize:
        "10px",

      textAlign:
        "center",

      lineHeight:
        "1.3",

      flexShrink:
        "0"

    }
  );


  /* =========================================================
     ASSEMBLE CHAT
     ========================================================= */

  chat.appendChild(
    header
  );


  chat.appendChild(
    body
  );


  chat.appendChild(
    inputArea
  );


  chat.appendChild(
    footer
  );


  /* =========================================================
     CHAT OPEN / CLOSE
     ========================================================= */

  function openChat() {

    if (chatOpen) {
      return;
    }


    chatOpen =
      true;


    chat.style.display =
      "flex";


    input.focus();

  }


  function closeChat() {

    if (!chatOpen) {
      return;
    }


    chatOpen =
      false;


    chat.style.display =
      "none";

  }


  function toggleChat() {

    if (chatOpen) {

      closeChat();

    } else {

      openChat();

    }

  }


  /* =========================================================
     NA'VI CLICK / DRAG SYSTEM

     QUICK CLICK:
       Toggle chat.

     DRAG:
       Move Na'Vi.

     Works with mouse and touch through Pointer Events.
     ========================================================= */

  let pointerActive =
    false;

  let pointerMoved =
    false;

  let pointerStartX =
    0;

  let pointerStartY =
    0;

  let originalLeft =
    0;

  let originalTop =
    0;

  let dragOffsetX =
    0;

  let dragOffsetY =
    0;


  function getStoredPosition() {

    try {

      const stored =
        localStorage.getItem(
          CONFIG.positionStorageKey
        );


      if (!stored) {
        return null;
      }


      const position =
        JSON.parse(
          stored
        );


      if (
        typeof position.left !==
          "number" ||
        typeof position.top !==
          "number"
      ) {

        return null;

      }


      return position;

    } catch (error) {

      return null;

    }

  }


  function savePosition(
    left,
    top
  ) {

    try {

      localStorage.setItem(

        CONFIG.positionStorageKey,

        JSON.stringify({

          left:
            left,

          top:
            top

        })

      );

    } catch (error) {

      /* Storage may be unavailable. */

    }

  }


  function clamp(
    value,
    min,
    max
  ) {

    return Math.min(
      Math.max(
        value,
        min
      ),
      max
    );

  }


  function applyStoredPosition() {

    const stored =
      getStoredPosition();


    if (!stored) {
      return;
    }


    const rect =
      naviButton.getBoundingClientRect();


    const maxLeft =
      Math.max(
        0,
        window.innerWidth -
        rect.width
      );


    const maxTop =
      Math.max(
        0,
        window.innerHeight -
        rect.height
      );


    const left =
      clamp(
        stored.left,
        0,
        maxLeft
      );


    const top =
      clamp(
        stored.top,
        0,
        maxTop
      );


    wrapper.style.position =
      "fixed";


    wrapper.style.left =
      left + "px";


    wrapper.style.top =
      top + "px";


    wrapper.style.width =
      "auto";


    wrapper.style.maxWidth =
      "none";


    wrapper.style.zIndex =
      "2147482000";

  }


  function beginPointerDrag(
    event
  ) {

    pointerActive =
      true;


    pointerMoved =
      false;


    pointerStartX =
      event.clientX;


    pointerStartY =
      event.clientY;


    const rect =
      naviButton.getBoundingClientRect();


    originalLeft =
      rect.left;


    originalTop =
      rect.top;


    dragOffsetX =
      event.clientX -
      rect.left;


    dragOffsetY =
      event.clientY -
      rect.top;


    naviButton.style.cursor =
      "grabbing";


    if (
      naviButton.setPointerCapture
    ) {

      try {

        naviButton.setPointerCapture(
          event.pointerId
        );

      } catch (error) {

        /* Pointer capture unavailable. */

      }

    }


    event.preventDefault();

  }


  function movePointerDrag(
    event
  ) {

    if (!pointerActive) {
      return;
    }


    const distanceX =
      Math.abs(
        event.clientX -
        pointerStartX
      );


    const distanceY =
      Math.abs(
        event.clientY -
        pointerStartY
      );


    if (
      distanceX >
        CONFIG.dragThreshold ||
      distanceY >
        CONFIG.dragThreshold
    ) {

      pointerMoved =
        true;

    }


    if (!pointerMoved) {
      return;
    }


    /*

       Once dragging begins, switch the wrapper to fixed
       viewport positioning.

       This allows Na'Vi to move anywhere on screen.

    */

    wrapper.style.position =
      "fixed";


    wrapper.style.width =
      "auto";


    wrapper.style.maxWidth =
      "none";


    wrapper.style.zIndex =
      "2147482000";


    const rect =
      naviButton.getBoundingClientRect();


    const maxLeft =
      Math.max(
        0,
        window.innerWidth -
        rect.width
      );


    const maxTop =
      Math.max(
        0,
        window.innerHeight -
        rect.height
      );


    const newLeft =
      clamp(
        event.clientX -
          dragOffsetX,
        0,
        maxLeft
      );


    const newTop =
      clamp(
        event.clientY -
          dragOffsetY,
        0,
        maxTop
      );


    wrapper.style.left =
      newLeft + "px";


    wrapper.style.top =
      newTop + "px";


    event.preventDefault();

  }


  function endPointerDrag(
    event
  ) {

    if (!pointerActive) {
      return;
    }


    pointerActive =
      false;


    naviButton.style.cursor =
      "grab";


    if (
      naviButton.releasePointerCapture
    ) {

      try {

        naviButton.releasePointerCapture(
          event.pointerId
        );

      } catch (error) {

        /* Pointer capture unavailable. */

      }

    }


    if (pointerMoved) {

      const rect =
        naviButton.getBoundingClientRect();


      savePosition(
        rect.left,
        rect.top
      );


      /*
         Prevent the drag release from also triggering
         a normal click.
      */

      setTimeout(
        function () {

          pointerMoved =
            false;

        },
        0
      );


      return;

    }


    toggleChat();

  }


  naviButton.addEventListener(
    "pointerdown",
    beginPointerDrag
  );


  naviButton.addEventListener(
    "pointermove",
    movePointerDrag
  );


  naviButton.addEventListener(
    "pointerup",
    endPointerDrag
  );


  naviButton.addEventListener(
    "pointercancel",
    function () {

      pointerActive =
        false;

      pointerMoved =
        false;

      naviButton.style.cursor =
        "grab";

    }
  );


  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  closeButton.addEventListener(
    "click",
    function () {

      closeChat();

    }
  );


  /* =========================================================
     LEARNER MESSAGE
     ========================================================= */

  function addLearnerMessage(
    text
  ) {

    const row =
      document.createElement(
        "div"
      );


    Object.assign(
      row.style,
      {

        display:
          "flex",

        justifyContent:
          "flex-end",

        marginBottom:
          "12px",

        paddingLeft:
          "45px"

      }
    );


    const bubble =
      document.createElement(
        "div"
      );


    bubble.textContent =
      text;


    Object.assign(
      bubble.style,
      {

        background:
          "#eef5ea",

        border:
          "1px solid #dce8d8",

        borderRadius:
          "15px",

        padding:
          "10px 13px",

        fontSize:
          "13px",

        lineHeight:
          "1.5",

        color:
          "#303530",

        maxWidth:
          "85%"

      }
    );


    row.appendChild(
      bubble
    );


    messages.appendChild(
      row
    );


    body.scrollTop =
      body.scrollHeight;

  }


  /* =========================================================
     NA'VI MESSAGE
     ========================================================= */

  function addNaviMessage(
    text
  ) {

    const row =
      document.createElement(
        "div"
      );


    Object.assign(
      row.style,
      {

        display:
          "flex",

        alignItems:
          "flex-start",

        gap:
          "9px",

        marginBottom:
          "13px"

      }
    );


    const avatar =
      document.createElement(
        "img"
      );


    avatar.src =
      NAVI_STATES[
        activeState
      ].image;


    avatar.alt =
      "";


    Object.assign(
      avatar.style,
      {

        width:
          "38px",

        height:
          "38px",

        objectFit:
          "contain",

        flexShrink:
          "0"

      }
    );


    const bubble =
      document.createElement(
        "div"
      );


    bubble.textContent =
      text;


    Object.assign(
      bubble.style,
      {

        background:
          "#ffffff",

        border:
          "1px solid #e5eae3",

        borderRadius:
          "15px",

        padding:
          "10px 13px",

        fontSize:
          "13px",

        lineHeight:
          "1.5",

        color:
          "#303530",

        maxWidth:
          "85%",

        boxShadow:
          "0 2px 7px rgba(0,0,0,0.04)"

      }
    );


    row.appendChild(
      avatar
    );


    row.appendChild(
      bubble
    );


    messages.appendChild(
      row
    );


    body.scrollTop =
      body.scrollHeight;

  }


  /* =========================================================
     BUILD BACKEND PAYLOAD
     ========================================================= */

  function buildMessagePayload(
    text
  ) {

    return {

      message:
        text,

      sessionId:
        sessionId,

      page:
        page,

      context:
        context,

      activeState:
        activeState,

      companion:
        "Na’Vi",

      framework:
        "CONTROL Framework"

    };

  }


  /* =========================================================
     SEND MESSAGE

     The backend connection will be activated when
     CONFIG.apiEndpoint is populated.
     ========================================================= */

  async function submitUserMessage(
    text
  ) {

    const cleanText =
      String(
        text || ""
      ).trim();


    if (!cleanText) {
      return;
    }


    addLearnerMessage(
      cleanText
    );


    input.value =
      "";


    if (!CONFIG.apiEndpoint) {
      return;
    }


    try {

      const payload =
        buildMessagePayload(
          cleanText
        );


      const response =
        await fetch(
          CONFIG.apiEndpoint,
          {

            method:
              "POST",

            headers:
              {
                "Content-Type":
                  "application/json"
              },

            body:
              JSON.stringify(
                payload
              )

          }
        );


      if (!response.ok) {

        throw new Error(
          "Na’Vi service unavailable."
        );

      }


      const data =
        await response.json();


      if (
        data &&
        data.reply
      ) {

        addNaviMessage(
          data.reply
        );

      }

    } catch (error) {

      console.error(
        "Na’Vi connection error:",
        error
      );

    }

  }


  /* =========================================================
     SEND BUTTON
     ========================================================= */

  sendButton.addEventListener(
    "click",
    function () {

      submitUserMessage(
        input.value
      );

    }
  );


  /* =========================================================
     ENTER KEY
     ========================================================= */

  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        submitUserMessage(
          input.value
        );

      }

    }
  );


  /* =========================================================
     NA'VI STATE CONTROL
     ========================================================= */

  window.NaVi = {

    setState:
      function (stateName) {

        if (
          !NAVI_STATES[
            stateName
          ]
        ) {

          return false;

        }


        activeState =
          stateName;


        const image =
          NAVI_STATES[
            stateName
          ].image;


        if (!image) {

          return false;

        }


        mainNavi.src =
          image;


        headerNavi.src =
          image;


        welcomeNavi.src =
          image;


        return true;

      },


    getState:
      function () {

        return activeState;

      },


    getContext:
      function () {

        return {

          page:
            page,

          context:
            context,

          sessionId:
            sessionId

        };

      }

  };


  /* =========================================================
     ADD NA'VI TO SYSTEME.IO

     Initial placement:
       Exactly where the #navi-companion block exists.

     The chat is attached to the document body:
       Bottom-right of the browser.
     ========================================================= */

  wrapper.appendChild(
    naviButton
  );


  container.appendChild(
    wrapper
  );


  document.body.appendChild(
    chat
  );


  /* =========================================================
     RESTORE PREVIOUS NA'VI POSITION

     If the learner has previously moved Na'Vi, restore
     her position.

     Otherwise she remains exactly where the
     #navi-companion block has been placed.
     ========================================================= */

  requestAnimationFrame(
    function () {

      applyStoredPosition();

    }
  );


  /* =========================================================
     KEEP DRAGGED NA'VI INSIDE THE VIEWPORT
     ========================================================= */

  window.addEventListener(
    "resize",
    function () {

      const stored =
        getStoredPosition();


      if (!stored) {
        return;
      }


      const rect =
        naviButton.getBoundingClientRect();


      const maxLeft =
        Math.max(
          0,
          window.innerWidth -
          rect.width
        );


      const maxTop =
        Math.max(
          0,
          window.innerHeight -
          rect.height
        );


      const left =
        clamp(
          rect.left,
          0,
          maxLeft
        );


      const top =
        clamp(
          rect.top,
          0,
          maxTop
        );


      wrapper.style.left =
        left + "px";


      wrapper.style.top =
        top + "px";


      savePosition(
        left,
        top
      );

    }
  );

})();