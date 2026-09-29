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


    /* -------------------------------------------------------
       POSITION STORAGE
       ------------------------------------------------------- */

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
     APPROVED NAVIGATION TARGETS

     These are the only Course destinations Na'Vi may make
     clickable.

     The Brain returns target references.

     This frontend resolves those references locally.

     The Brain never supplies URLs.
     ========================================================= */

  const NAVIGATION_TARGETS = {

    "Introduction — How to Move Through This Program with Focus":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9729368",


    "Module 1 — Calm the Overload":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9541102",

    "Module 2 — Organise Your Focus":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9541312",

    "Module 3 — Navigate Your Pace":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9877771",

    "Module 4 — Turn Learning Into Action":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9966546",

    "Module 5 — Reduce Noise":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967621",

    "Module 6 — Observe Progress":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976023",

    "Module 7 — Lead Your Journey":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976310",

    "Module 8 — Long-term Control":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986010",

    "Maintaining Momentum":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/10387114",


    /* -------------------------------------------------------
       MODULE 1
       ------------------------------------------------------- */

    "Calm The Overload":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9541102",

    "Understanding why Digital Learning can feel Overwhelming":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/10002209",

    "Why Overwhelm Happens":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9748811",

    "Your Brain Has Limits":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9748888",

    "Clarity Before Consumption":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9748894",

    "Your First Action":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9748899",

    "Optional Reflection Submission Module 1":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9748909",


    /* -------------------------------------------------------
       MODULE 2
       ------------------------------------------------------- */

    "Organise Your Focus":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9541312",

    "Too Many Directions Create Confusion":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9826634",

    "The One Priority Rule":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9826716",

    "Focus Creates Progress":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9826720",

    "Optional Reflection Submission Module 2":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9826740",

    "Module 2 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9826740",


    /* -------------------------------------------------------
       MODULE 3
       ------------------------------------------------------- */

    "Navigate Your Pace":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9877771",

    "You Do Not Need to Carry Everything at Once":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9885942",

    "Think of It Like Packing for a Trip":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886070",

    "Must-Do Now vs Save for Later":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886203",

    "Save for Later Still Needs a Home":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886290",

    "Follow Importance, Not Order of Appearance":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886311",

    "Build a Rhythm You Can Repeat":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886358",

    "Small Action for This Week":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886841",

    "Optional Reflection Submission":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886865",

    "Module 3 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9886865",


    /* -------------------------------------------------------
       MODULE 4
       ------------------------------------------------------- */

    "Turn Learning Into Action":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9966546",

    "Collecting Information is Not the Same as Taking Action":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967128",

    "Use the 20-Minute Progress Rule":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967179",

    "Turn Every Lesson into One Visible Action":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967348",

    "Small Actions Build Confidence":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967376",

    "Your Action Step for This Week":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967393",

    "Module 4 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967441",


    /* -------------------------------------------------------
       MODULE 5
       ------------------------------------------------------- */

    "Reduce Noise":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9967621",

    "Enter with a Purpose":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975899",

    "It is OK to Be a Quiet Learner":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975913",

    "Social Media is not Your To-Do List":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975923",

    "Be Present in More Than One Place":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975937",

    "Set Boundaries That Protect Your Attention":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975952",

    "Module 5 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9975987",


    /* -------------------------------------------------------
       MODULE 6
       ------------------------------------------------------- */

    "Observe Progress":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976023",

    "Progress is often Visible Inside Before It Shows Outside":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976169",

    "Look for Early Progress Signals":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976176",

    "Stay With the Goal. Adjust the Strategy":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976194",

    "Measure Process, Not Just Outcome":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976211",

    "Small Wins Build Confidence":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976223",

    "Patience Becomes Easier When You Can See Proof":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976228",

    "Module 6 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976263",


    /* -------------------------------------------------------
       MODULE 7
       ------------------------------------------------------- */

    "Leading Your Journey":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976310",

    "You Are Not Just Taking a Course. You are Leading":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976326",

    "Learning Alone is Not Enough":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976705",

    "Consistency Builds Confidence":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976712",

    "Finish Small Things to Build Momentum":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976720",

    "Turn Lessons into Practical Output":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976727",

    "Staying Consistent is a Form of Leadership":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9976778",

    "Module 7 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9985959",


    /* -------------------------------------------------------
       MODULE 8
       ------------------------------------------------------- */

    "Long-term Control":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986010",

    "Digital Programs Can Change Your Life":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986066",

    "Come Back to the Cycle":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986084",

    "Consistency Matters More Than Intensity":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986096",

    "You Can Return to this Course Anytime":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986107",

    "Completion Creates Momentum":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986114",

    "Your Next Step Is Simple":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986143",

    "Module 8 Reflection Check-In":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986190"

  };


  /* =========================================================
     NAVIGATION ALIASES

     The Brain may return short learner-facing references
     such as "Module 1".

     These are resolved to confirmed Knowledge Base
     navigation targets.
     ========================================================= */

  const NAVIGATION_ALIASES = {

    "Introduction":
      "Introduction — How to Move Through This Program with Focus",

    "Module 1":
      "Module 1 — Calm the Overload",

    "Module 2":
      "Module 2 — Organise Your Focus",

    "Module 3":
      "Module 3 — Navigate Your Pace",

    "Module 4":
      "Module 4 — Turn Learning Into Action",

    "Module 5":
      "Module 5 — Reduce Noise",

    "Module 6":
      "Module 6 — Observe Progress",

    "Module 7":
      "Module 7 — Lead Your Journey",

    "Module 8":
      "Module 8 — Long-term Control",

    "Long-Term Control":
      "Module 8 — Long-term Control",

    "Long-term Control":
      "Module 8 — Long-term Control"

  };


  /* =========================================================
     RESOLVE NAVIGATION TARGET
     ========================================================= */

  function resolveNavigationTarget(
    target
  ) {

    const normalized =
      String(
        target || ""
      )
        .trim()
        .replace(
          /\s+/g,
          " "
        );


    if (!normalized) {
      return null;
    }


    const canonical =
      NAVIGATION_ALIASES[
        normalized
      ] ||
      normalized;


    const url =
      NAVIGATION_TARGETS[
        canonical
      ];


    if (!url) {
      return null;
    }


    return {

      text:
        normalized,

      target:
        canonical,

      url:
        url

    };

  }


  /* =========================================================
     BUILD APPROVED LINKS
     ========================================================= */

  function buildApprovedLinks(
    links
  ) {

    if (
      !Array.isArray(
        links
      )
    ) {

      return [];

    }


    const approved =
      [];


    links
      .slice(
        0,
        8
      )
      .forEach(
        function (
          link
        ) {

          if (
            !link ||
            typeof link !==
              "object"
          ) {

            return;

          }


          const text =
            typeof link.text ===
              "string"

              ? link.text.trim()

              : "";


          const target =
            typeof link.target ===
              "string"

              ? link.target.trim()

              : "";


          if (
            !text ||
            !target
          ) {

            return;

          }


          const resolved =
            resolveNavigationTarget(
              target
            );


          if (!resolved) {
            return;
          }


          const duplicate =
            approved.some(
              function (
                item
              ) {

                return (
                  item.url ===
                  resolved.url
                );

              }
            );


          if (duplicate) {
            return;
          }


          approved.push({

            text:
              text,

            target:
              resolved.target,

            url:
              resolved.url

          });

        }
      );


    return approved;

  }


  /* =========================================================
     CREATE SAFE NAVIGATION LINK
     ========================================================= */

  function createNavigationLink(
    link,
    label
  ) {

    const anchor =
      document.createElement(
        "a"
      );


    anchor.href =
      link.url;


    anchor.target =
      "_self";


    anchor.rel =
      "noopener";


    anchor.textContent =
      label ||
      link.text;


    anchor.setAttribute(
      "data-navi-target",
      link.target
    );


    anchor.setAttribute(
      "data-navi-approved",
      "true"
    );


    Object.assign(
      anchor.style,
      {

        color:
          "#176b3a",

        fontWeight:
          "700",

        textDecoration:
          "underline",

        cursor:
          "pointer"

      }
    );


    return anchor;

  }


  /* =========================================================
     FIND SYSTEME.IO NA'VI LOCATION
     ========================================================= */

  const container =
    document.getElementById(
      "navi-companion"
    );


  if (
    !container
  ) {

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


  if (
    !sessionId
  ) {

    sessionId =
      "navi-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(
          2,
          10
        );


    sessionStorage.setItem(
      SESSION_KEY,
      sessionId
    );

  }


  /* =========================================================
     ACTIVE STATE
     ========================================================= */

  let activeState =
    "calmPresence";


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

     The original Na'Vi interface is intentionally retained.

     It is fixed to the browser viewport and independent
     from Na'Vi's character position.
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
    function (
      option
    ) {

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

    if (
      chatOpen
    ) {

      return;

    }


    chatOpen =
      true;


    chat.style.display =
      "flex";


    input.focus();

  }


  function closeChat() {

    if (
      !chatOpen
    ) {

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

  function renderNaviMessage(
    text,
    approvedLinks
  ) {

    const fragment =
      document.createDocumentFragment();

    const normalized =
      String(text || "")
        .replace(/\s+(?=\d+\.\s)/g, "\n");

    const lines =
      normalized.split(/\r?\n/);

    let list = null;

    lines.forEach(
      function (line) {

        const trimmed =
          line.trim();

        if (!trimmed) {
          list = null;
          return;
        }

        const match =
          trimmed.match(/^(\d+)\.\s+(.*)$/);

        if (match) {

          if (!list) {

            list =
              document.createElement(
                "ol"
              );

            list.style.margin =
              "6px 0 0 20px";

            list.style.padding =
              "0";

            fragment.appendChild(
              list
            );

          }

          const item =
            document.createElement(
              "li"
            );

          item.style.marginBottom =
            "5px";

          appendNaviInlineMarkdown(
            item,
            match[2],
            approvedLinks
          );

          list.appendChild(
            item
          );

          return;
        }

        list = null;

        const paragraph =
          document.createElement(
            "div"
          );

        paragraph.style.marginBottom =
          "6px";

        appendNaviInlineMarkdown(
          paragraph,
          trimmed,
          approvedLinks
        );

        fragment.appendChild(
          paragraph
        );

      }
    );

    return fragment;

  }


  function appendNaviInlineMarkdown(
    element,
    text,
    approvedLinks
  ) {

    const value = String(text || "");
    const links = Array.isArray(approvedLinks) ? approvedLinks : [];

    const sortedLinks =
      links.slice().sort(function (a, b) {
        return b.text.length - a.text.length;
      });

    const boldPattern = /\*\*([\s\S]+?)\*\*/g;
    let lastIndex = 0;
    let match;


    function appendPlainText(parent, plainText) {

      let remaining =
        String(plainText || "");


      while (remaining.length) {

        let best = null;
        let bestIndex = -1;


        sortedLinks.forEach(function (link) {

          const index =
            remaining.indexOf(
              link.text
            );


          if (
            index !== -1 &&
            (
              bestIndex === -1 ||
              index < bestIndex ||
              (
                index === bestIndex &&
                link.text.length >
                  best.text.length
              )
            )
          ) {

            best =
              link;

            bestIndex =
              index;

          }

        });


        if (!best) {

          parent.appendChild(
            document.createTextNode(
              remaining
            )
          );

          return;

        }


        if (bestIndex > 0) {

          parent.appendChild(
            document.createTextNode(
              remaining.slice(
                0,
                bestIndex
              )
            )
          );

        }


        parent.appendChild(
          createNavigationLink(
            best.text,
            best.target
          )
        );


        remaining =
          remaining.slice(
            bestIndex +
              best.text.length
          );

      }

    }


    while (
      (match =
        boldPattern.exec(value))
    ) {

      if (match.index > lastIndex) {

        appendPlainText(
          element,
          value.slice(
            lastIndex,
            match.index
          )
        );

      }


      const boldText =
        match[1];


      const resolved =
        resolveNavigationTarget(
          boldText
        );


      if (resolved) {

        element.appendChild(
          createNavigationLink(
            resolved.text,
            resolved.target
          )
        );

      } else {

        const strong =
          document.createElement(
            "strong"
          );

        appendPlainText(
          strong,
          boldText
        );

        element.appendChild(
          strong
        );

      }


      lastIndex =
        boldPattern.lastIndex;

    }


    if (
      lastIndex <
      value.length
    ) {

      appendPlainText(
        element,
        value.slice(
          lastIndex
        )
      );

    }

  }
    /* =========================================================
     ADD NA'VI MESSAGE
     ========================================================= */

  function addNaviMessage(
    text,
    approvedLinks
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


    bubble.appendChild(
      renderNaviMessage(
        text,
        approvedLinks
      )
    );


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
     BUILD BRAIN V2 BACKEND PAYLOAD
     ========================================================= */

  function buildMessagePayload(
    text
  ) {

    return {

      learner: {

        message:
          text

      },

      interface: {

        page:
          page,

        context:
          context,

        activeState:
          activeState

      },

      session: {

        id:
          sessionId

      }

    };

  }


  /* =========================================================
     SEND MESSAGE TO NA'VI BRAIN
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


    /*
       Show the learner's message immediately.
    */

    addLearnerMessage(
      cleanText
    );


    /*
       Clear the input immediately.
    */

    input.value =
      "";


    /*
       If no Brain endpoint has been configured,
       stop here.

       This keeps the frontend usable while the
       backend endpoint is being configured.
    */

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


      /*
         Brain V2 returns:

         {
           ok: true,
           brain: "Na’Vi Brain",
           brainVersion: "...",
           response: {
             reply: "...",
             state: "...",
             links: [...]
           },
           context: {...}
         }
      */


      const brainResponse =
        data &&
        data.response;


      if (
        brainResponse &&
        brainResponse.reply
      ) {


        /*
           Update Na'Vi's visual state.
        */

        if (
          brainResponse.state
        ) {

          window.NaVi.setState(
            brainResponse.state
          );

        }


        /*
           Only accept links that match the
           approved local navigation registry.

           The Brain cannot provide an arbitrary
           external URL and have the frontend
           navigate to it.
        */

        const approvedLinks =
          buildApprovedLinks(
            brainResponse.links
          );


        /*
           Render the Brain response.

           Module and lesson names supplied through
           approved links become bold and clickable.
        */

        addNaviMessage(
          brainResponse.reply,
          approvedLinks
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
      function (
        stateName
      ) {

        /*
           Brain V2 state names are mapped to the
           existing visual states used by the old UI.

           This changes functionality only.
           The existing images and appearance remain.
        */

        const stateAliases = {

          confidentGuide:
            "confidentGuide",

          clarifying:
            "insightGuide",

          supportive:
            "encouragingSupport",

          pause:
            "calmPresence",

          safety:
            "calmPresence",

          notFound:
            "insightGuide"

        };


        const resolvedState =
          stateAliases[
            stateName
          ] ||
          stateName;


        if (
          !NAVI_STATES[
            resolvedState
          ]
        ) {

          return false;

        }


        activeState =
          resolvedState;


        const image =
          NAVI_STATES[
            resolvedState
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