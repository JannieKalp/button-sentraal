(function () {

  "use strict";


  /* =========================================================
     NA'VI — CONTROL COMPANION
     FRONTEND / NERVOUS SYSTEM
     VERSION 2.0 — CLEAN BUILD

     Architecture:

       Knowledge
           ↓
       Brain
           ↓
       Nervous System
           ↓
       Frontend
           ↓
       Learner

     This file is responsible for:

       • displaying Na'Vi
       • receiving learner interaction
       • detecting page/context
       • sending signals to the Brain
       • receiving Brain responses
       • displaying Brain responses
       • displaying approved visual states
       • handling approved navigation
       • remembering Na'Vi's position

     This file does NOT:

       • make Course decisions
       • score assessments
       • retrieve Course knowledge
       • invent Course content
       • invent URLs
       • determine learner progress
       • access private Notion information
       • replace the Brain

     ========================================================= */


  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {

    /* -------------------------------------------------------
       VERSION
       ------------------------------------------------------- */

    version:
      "2.0",

    layer:
      "Frontend / Nervous System",

    protocol:
      "navi-brain-signal",

    protocolVersion:
      "1.0",


    /* -------------------------------------------------------
       NA'VI DEFAULT IMAGE
       ------------------------------------------------------- */

    defaultImage:
      "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa12c0a38e7b5.84659750_Na-vi1.gif",


    /* -------------------------------------------------------
       BRAIN ENDPOINT

       IMPORTANT:
       No OpenAI API key belongs here.

       The browser communicates only with the
       Na'Vi Brain Worker.
       ------------------------------------------------------- */

    apiEndpoint:
      "https://navi-brain.clarityframework01.workers.dev",


    /* -------------------------------------------------------
       NA'VI SIZE
       ------------------------------------------------------- */

    characterWidth:
      120,


    /* -------------------------------------------------------
       CHAT SIZE
       ------------------------------------------------------- */

    chatWidth:
      380,

    chatHeight:
      560,


    /* -------------------------------------------------------
       CHAT POSITION
       ------------------------------------------------------- */

    chatRight:
      20,

    chatBottom:
      20,


    /* -------------------------------------------------------
       DRAG SETTINGS
       ------------------------------------------------------- */

    dragThreshold:
      6,


    /* -------------------------------------------------------
       POSITION STORAGE
       ------------------------------------------------------- */

    positionStorageKey:
      "navi_companion_position"

  };


  /* =========================================================
     NA'VI VISUAL STATES
     =========================================================

     These are presentation states only.

     They do NOT change:

       • Na'Vi's identity
       • Course rules
       • source authority
       • safety boundaries
       • learner ownership
       • Brain reasoning
       • knowledge

     The Brain may request a state.

     The Frontend only displays it.
     ========================================================= */

  const NAVI_STATES = {

    friendlyWave: {

      name:
        "Friendly Wave",

      purpose:
        "Welcome & Greeting",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa12c0a38e7b5.84659750_Na-vi1.gif"

    },


    confidentGuide: {

      name:
        "Confident Guide",

      purpose:
        "Decision & Direction",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa164a5135007.56245562_Na-vi1.gif"

    },


    encouragingSupport: {

      name:
        "Encouraging Support",

      purpose:
        "Motivation & Reassurance",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa16a9a7e0c91.70517806_Na-vi1.gif"

    },


    thinking: {

      name:
        "Thinking",

      purpose:
        "Processing",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa16edc3a9e45.07798719_Na-vi1.gif"

    },


    celebrating: {

      name:
        "Celebrating",

      purpose:
        "Progress",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa171c7e1f2f1.46610962_Na-vi1.gif"

    },


    calm: {

      name:
        "Calm",

      purpose:
        "Grounding",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa1753e0d8d66.78011162_Na-vi1.gif"

    },


    listening: {

      name:
        "Listening",

      purpose:
        "Receiving",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa17875ef4de3.66342150_Na-vi1.gif"

    },


    concerned: {

      name:
        "Concerned",

      purpose:
        "Gentle Attention",

      image:
        "https://d1yei2z3i6k35z.cloudfront.net/10602272/6aa17c0b3e7e39.71830647_Na-vi1.gif"

    }

  };


  /* =========================================================
     STATE ALIASES
     =========================================================

     Brain V2 may return a semantic state.

     The Frontend converts it into one of the approved
     visual states above.

     This does NOT change the Brain's meaning.
     ========================================================= */

  const STATE_ALIASES = {

    friendlyWave:
      "friendlyWave",

    confidentGuide:
      "confidentGuide",

    encouragingSupport:
      "encouragingSupport",

    supportive:
      "encouragingSupport",

    thinking:
      "thinking",

    clarifying:
      "thinking",

    celebrating:
      "celebrating",

    calm:
      "calm",

    pause:
      "calm",

    listening:
      "listening",

    concerned:
      "concerned",

    safety:
      "concerned",

    notFound:
      "listening"

  };


  /* =========================================================
     INTERNAL STATE
     ========================================================= */

  const STATE = {

    initialized:
      false,

    open:
      false,

    processing:
      false,

    dragging:
      false,

    dragMoved:
      false,


    dragStartX:
      0,

    dragStartY:
      0,


    startLeft:
      null,

    startTop:
      null,


    position:
      null,


    sessionId:
      null,


    activeVisualState:
      "friendlyWave",


    currentPage:
      "",

    currentContext:
      "",

    currentActiveState:
      "",


    messages:
      [],


    quickActions:
      [],


    elements:
      {}

  };


  /* =========================================================
     SESSION ID
     ========================================================= */

  function createSessionId() {

    return (

      "navi-" +

      Date.now()
        .toString(36) +

      "-" +

      Math.random()
        .toString(36)
        .slice(2, 10)

    );

  }


  function getSessionId() {

    try {

      const existing =
        sessionStorage.getItem(
          "navi_companion_session"
        );


      if (existing) {

        return existing;

      }


      const created =
        createSessionId();


      sessionStorage.setItem(

        "navi_companion_session",

        created

      );


      return created;

    } catch (error) {

      return createSessionId();

    }

  }


  /* =========================================================
     PAGE / CONTEXT DETECTION
     =========================================================

     The host page provides:

       <div
         id="navi-companion"
         data-navi-page="..."
         data-navi-context="..."
       ></div>

     These identifiers tell the Brain where Na'Vi is.

     The Frontend does not interpret Course meaning from them.
     It simply carries the signal.
     ========================================================= */

  function detectPageContext() {

    const companion =
      document.getElementById(
        "navi-companion"
      );


    if (!companion) {

      return {

        page:
          "",

        context:
          ""

      };

    }


    return {

      page:
        companion.getAttribute(
          "data-navi-page"
        ) || "",

      context:
        companion.getAttribute(
          "data-navi-context"
        ) || ""

    };

  }


  /* =========================================================
     INITIALIZE PAGE CONTEXT
     ========================================================= */

  function initializePageContext() {

    const detected =
      detectPageContext();


    STATE.currentPage =
      detected.page;


    STATE.currentContext =
      detected.context;


    STATE.currentActiveState =
      document.body?.getAttribute(
        "data-navi-active-state"
      ) || "";

  }


  /* =========================================================
     POSITION STORAGE
     ========================================================= */

  function loadSavedPosition() {

    try {

      const saved =
        localStorage.getItem(
          CONFIG.positionStorageKey
        );


      if (!saved) {

        return null;

      }


      const parsed =
        JSON.parse(saved);


      if (
        !parsed ||
        typeof parsed !== "object"
      ) {

        return null;

      }


      if (
        typeof parsed.left !==
          "number" ||

        typeof parsed.top !==
          "number"
      ) {

        return null;

      }


      return parsed;

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
            Math.round(left),

          top:
            Math.round(top)

        })

      );

    } catch (error) {

      /*
       * Storage is optional.
       */

    }

  }


  /* =========================================================
     BASIC UTILITY
     ========================================================= */

  function escapeHtml(
    value
  ) {

    return String(
      value ?? ""
    )

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


    /* =========================================================
     PAGE TITLE
     ========================================================= */

  function getPageTitle() {

    const title =
      document.title;


    if (
      typeof title !==
      "string"
    ) {

      return "";

    }


    return title.trim();

  }


  /* =========================================================
     CURRENT URL PATH
     ========================================================= */

  function getCurrentPath() {

    try {

      return (
        window.location.pathname ||
        ""
      );

    } catch (error) {

      return "";

    }

  }


  /* =========================================================
     PAGE SIGNAL
     =========================================================

     The Frontend reports page information to the Brain.

     It does not decide what the page means.

     Page metadata is context only.
     ========================================================= */

  function buildPageSignal() {

    return {

      page:
        STATE.currentPage,

      context:
        STATE.currentContext,

      title:
        getPageTitle(),

      path:
        getCurrentPath()

    };

  }


  /* =========================================================
     REFRESH PAGE SIGNAL
     ========================================================= */

  function refreshPageSignal() {

    initializePageContext();

    return buildPageSignal();

  }


  /* =========================================================
     APPROVED NAVIGATION TARGETS
     =========================================================

     IMPORTANT:

     The Brain does NOT construct URLs.

     The Frontend only resolves navigation targets that
     are explicitly listed here.

     No URL is generated from a lesson title.

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

    "Module 8 — Sustain Your Momentum":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986010",

    "Maintaining Momentum":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/10387114"

  };


  /* =========================================================
     NAVIGATION TARGET ALIASES
     =========================================================

     These allow the Brain to return a short learner-facing
     target such as "Module 1".

     The alias must explicitly map to an approved target.

     ========================================================= */

  const NAVIGATION_ALIASES = {

    "Introduction":
      "Introduction — How to Move Through This Program with Focus",

    "How to Move Through This Program with Focus":
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
      "Module 8 — Sustain Your Momentum",

    "Long-Term Control":
      "Module 8 — Sustain Your Momentum",

    "Long-term Control":
      "Module 8 — Sustain Your Momentum",

    "Maintaining Momentum":
      "Maintaining Momentum"

  };


  /* =========================================================
     LESSON NAVIGATION REGISTRY
     =========================================================

     These are the confirmed lesson destinations.

     The Brain does not need to know these URLs.

     The Frontend uses this registry only after receiving
     a navigation target from the Brain.

     ========================================================= */

  const LESSON_NAVIGATION = {


    /* -------------------------------------------------------
       INTRODUCTION
       ------------------------------------------------------- */

    "How to Move Through This Program with Focus":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9729368",


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
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/9986190",


    /* -------------------------------------------------------
       MAINTAINING MOMENTUM
       ------------------------------------------------------- */

    "MAINTAINING MOMENTUM — COURSE COMPLETION / DIRECTION PAGE":
      "https://www.godigicraft.com/school/course/self-control-framework-for-digital-program-navigation/lecture/10387114"

  };


  /* =========================================================
     NORMALIZE NAVIGATION TARGET
     ========================================================= */

  function normalizeNavigationTarget(
    target
  ) {

    if (
      typeof target !==
      "string"
    ) {

      return "";

    }


    return target

      .trim()

      .replace(
        /\s+/g,
        " "
      );

  }


  /* =========================================================
     RESOLVE NAVIGATION TARGET
     =========================================================

     Resolution order:

       1. Exact approved module target
       2. Explicit alias
       3. Exact approved lesson target
       4. Otherwise reject

     IMPORTANT:

     Unknown targets are never guessed.
     ========================================================= */

  function resolveNavigationTarget(
    target
  ) {

    const normalized =
      normalizeNavigationTarget(
        target
      );


    if (!normalized) {

      return null;

    }


    /* -------------------------------------------------------
       EXACT CANONICAL TARGET
       ------------------------------------------------------- */

    if (
      Object.prototype.hasOwnProperty.call(
        NAVIGATION_TARGETS,
        normalized
      )
    ) {

      return {

        text:
          normalized,

        target:
          normalized,

        url:
          NAVIGATION_TARGETS[
            normalized
          ]

      };

    }


    /* -------------------------------------------------------
       EXPLICIT ALIAS
       ------------------------------------------------------- */

    const alias =
      NAVIGATION_ALIASES[
        normalized
      ];


    if (
      alias &&
      Object.prototype.hasOwnProperty.call(
        NAVIGATION_TARGETS,
        alias
      )
    ) {

      return {

        text:
          normalized,

        target:
          alias,

        url:
          NAVIGATION_TARGETS[
            alias
          ]

      };

    }


    /* -------------------------------------------------------
       EXACT LESSON TARGET
       ------------------------------------------------------- */

    if (
      Object.prototype.hasOwnProperty.call(
        LESSON_NAVIGATION,
        normalized
      )
    ) {

      return {

        text:
          normalized,

        target:
          normalized,

        url:
          LESSON_NAVIGATION[
            normalized
          ]

      };

    }


    /* -------------------------------------------------------
       UNKNOWN TARGET

       Never guess.
       ------------------------------------------------------- */

    return null;

  }


  /* =========================================================
     RESOLVE BRAIN LINK
     =========================================================

     Expected Brain V2 format:

       {
         "text": "Module 1",
         "target": "Module 1 — Calm the Overload"
       }

     The Frontend resolves the target locally.
     ========================================================= */

  function resolveBrainLink(
    link
  ) {

    if (
      !link ||
      typeof link !==
      "object"
    ) {

      return null;

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

      return null;

    }


    const resolved =
      resolveNavigationTarget(
        target
      );


    if (!resolved) {

      return null;

    }


    return {

      text:
        text,

      target:
        resolved.target,

      url:
        resolved.url

    };

  }


  /* =========================================================
     BUILD APPROVED LINKS
     =========================================================

     Only links that successfully resolve through the
     approved registry are allowed into the interface.
     ========================================================= */

  function buildApprovedLinks(
    links
  ) {

    if (
      !Array.isArray(links)
    ) {

      return [];

    }


    const approved = [];


    for (
      const link of links
    ) {

      const resolved =
        resolveBrainLink(
          link
        );


      if (!resolved) {

        continue;

      }


      const duplicate =
        approved.some(
          function (
            existing
          ) {

            return (
              existing.url ===
              resolved.url
            );

          }
        );


      if (duplicate) {

        continue;

      }


      approved.push(
        resolved
      );


      if (
        approved.length >=
        8
      ) {

        break;

      }

    }


    return approved;

  }


  /* =========================================================
     CREATE SAFE NAVIGATION LINK
     ========================================================= */

  function createNavigationLink(
    link
  ) {

    const anchor =
      document.createElement(
        "a"
      );


    anchor.href =
      link.url;


    anchor.textContent =
      link.text;


    anchor.target =
      "_self";


    anchor.rel =
      "noopener";


    anchor.setAttribute(
      "data-navi-target",
      link.target
    );


    anchor.setAttribute(
      "data-navi-approved",
      "true"
    );


    anchor.className =
      "navi-navigation-link";


    return anchor;

  }


    /* =========================================================
     FRONTEND STYLES
     ========================================================= */

  function injectStyles() {

    if (
      document.getElementById(
        "navi-v2-styles"
      )
    ) {

      return;

    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "navi-v2-styles";


    style.textContent = `

      /* =====================================================
         NA'VI ROOT
         ===================================================== */

      #navi-v2-root {

        position:
          fixed;

        z-index:
          2147483000;

        font-family:
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          Helvetica,
          Arial,
          sans-serif;

        user-select:
          none;

      }


      /* =====================================================
         NA'VI CHARACTER
         ===================================================== */

      #navi-v2-character {

        position:
          fixed;

        width:
          ${CONFIG.characterWidth}px;

        height:
          auto;

        cursor:
          grab;

        z-index:
          2147483001;

        touch-action:
          none;

        user-select:
          none;

        -webkit-user-drag:
          none;

        filter:
          drop-shadow(
            0 8px 18px
            rgba(0,0,0,.16)
          );

        transition:
          transform .18s ease,
          filter .18s ease;

      }


      #navi-v2-character:hover {

        transform:
          translateY(-2px)
          scale(1.015);

        filter:
          drop-shadow(
            0 11px 22px
            rgba(0,0,0,.20)
          );

      }


      #navi-v2-character.navi-dragging {

        cursor:
          grabbing;

        transform:
          scale(1.025);

      }


      /* =====================================================
         CHAT WINDOW
         ===================================================== */

      #navi-v2-chat {

        position:
          fixed;

        width:
          min(
            ${CONFIG.chatWidth}px,
            calc(100vw - 30px)
          );

        height:
          min(
            ${CONFIG.chatHeight}px,
            calc(100vh - 120px)
          );

        right:
          ${CONFIG.chatRight}px;

        bottom:
          ${CONFIG.chatBottom + 115}px;

        display:
          none;

        flex-direction:
          column;

        overflow:
          hidden;

        background:
          rgba(
            255,
            255,
            255,
            .98
          );

        border:
          1px solid
          rgba(
            26,
            72,
            54,
            .12
          );

        border-radius:
          22px;

        box-shadow:
          0 20px 60px
          rgba(
            0,
            0,
            0,
            .18
          );

        z-index:
          2147483002;

        backdrop-filter:
          blur(12px);

        -webkit-backdrop-filter:
          blur(12px);

      }


      #navi-v2-chat.navi-open {

        display:
          flex;

        animation:
          naviChatIn
          .18s
          ease
          both;

      }


      @keyframes naviChatIn {

        from {

          opacity:
            0;

          transform:
            translateY(10px)
            scale(.985);

        }

        to {

          opacity:
            1;

          transform:
            translateY(0)
            scale(1);

        }

      }


      /* =====================================================
         CHAT HEADER
         ===================================================== */

      #navi-v2-header {

        flex:
          0 0 auto;

        display:
          flex;

        align-items:
          center;

        justify-content:
          space-between;

        padding:
          14px 16px;

        background:
          linear-gradient(
            135deg,
            #1f6b4f,
            #285d48
          );

        color:
          #ffffff;

      }


      #navi-v2-header-left {

        display:
          flex;

        align-items:
          center;

        gap:
          10px;

        min-width:
          0;

      }


      #navi-v2-header-avatar {

        width:
          40px;

        height:
          40px;

        border-radius:
          50%;

        object-fit:
          cover;

        background:
          #ffffff;

        border:
          2px solid
          rgba(
            255,
            255,
            255,
            .75
          );

      }


      #navi-v2-header-title {

        font-size:
          16px;

        font-weight:
          700;

        line-height:
          1.15;

      }


      #navi-v2-header-subtitle {

        margin-top:
          3px;

        font-size:
          11px;

        opacity:
          .84;

      }


      #navi-v2-close {

        width:
          34px;

        height:
          34px;

        border:
          0;

        border-radius:
          50%;

        background:
          rgba(
            255,
            255,
            255,
            .13
          );

        color:
          #ffffff;

        cursor:
          pointer;

        font-size:
          20px;

        line-height:
          1;

      }


      #navi-v2-close:hover {

        background:
          rgba(
            255,
            255,
            255,
            .22
          );

      }


      /* =====================================================
         MESSAGE AREA
         ===================================================== */

      #navi-v2-messages {

        flex:
          1 1 auto;

        overflow-y:
          auto;

        padding:
          16px;

        background:
          linear-gradient(
            180deg,
            #f8fbf9 0%,
            #ffffff 100%
          );

        scroll-behavior:
          smooth;

      }


      #navi-v2-messages::-webkit-scrollbar {

        width:
          6px;

      }


      #navi-v2-messages::-webkit-scrollbar-thumb {

        background:
          rgba(
            31,
            107,
            79,
            .18
          );

        border-radius:
          10px;

      }


      /* =====================================================
         MESSAGE ROWS
         ===================================================== */

      .navi-v2-message-row {

        display:
          flex;

        margin:
          0 0 12px;

      }


      .navi-v2-message-row.navi-user {

        justify-content:
          flex-end;

      }


      .navi-v2-message {

        max-width:
          84%;

        padding:
          11px 13px;

        border-radius:
          16px;

        font-size:
          14px;

        line-height:
          1.5;

        white-space:
          pre-wrap;

        word-break:
          break-word;

      }


      /* =====================================================
         ASSISTANT MESSAGE
         ===================================================== */

      .navi-v2-message-row.navi-assistant
      .navi-v2-message {

        background:
          #edf5f0;

        color:
          #193b2c;

        border-bottom-left-radius:
          5px;

      }


      /* =====================================================
         USER MESSAGE
         ===================================================== */

      .navi-v2-message-row.navi-user
      .navi-v2-message {

        background:
          #1f6b4f;

        color:
          #ffffff;

        border-bottom-right-radius:
          5px;

      }


      /* =====================================================
         NAVIGATION LINKS
         ===================================================== */

      .navi-v2-message a {

        color:
          #1f6b4f;

        font-weight:
          700;

        text-decoration:
          underline;

        text-underline-offset:
          2px;

        cursor:
          pointer;

      }


      .navi-v2-message-row.navi-user
      .navi-v2-message a {

        color:
          #ffffff;

      }


      .navi-navigation-link {

        display:
          inline-block;

        margin-top:
          6px;

      }


      /* =====================================================
         QUICK ACTIONS
         ===================================================== */

      .navi-v2-quick-actions {

        flex:
          0 0 auto;

        display:
          flex;

        gap:
          7px;

        overflow-x:
          auto;

        padding:
          9px 12px;

        border-top:
          1px solid
          rgba(
            26,
            72,
            54,
            .08
          );

        background:
          #ffffff;

      }


      .navi-v2-quick-actions::-webkit-scrollbar {

        height:
          0;

      }


      .navi-v2-quick-action {

        flex:
          0 0 auto;

        border:
          1px solid
          rgba(
            31,
            107,
            79,
            .20
          );

        border-radius:
          999px;

        padding:
          7px 10px;

        background:
          #f4faf6;

        color:
          #1f6b4f;

        font-size:
          11px;

        font-weight:
          650;

        cursor:
          pointer;

      }


      .navi-v2-quick-action:hover {

        background:
          #e8f4ed;

      }


      /* =====================================================
         INPUT AREA
         ===================================================== */

      #navi-v2-input-area {

        flex:
          0 0 auto;

        display:
          flex;

        align-items:
          flex-end;

        gap:
          8px;

        padding:
          11px 12px;

        border-top:
          1px solid
          rgba(
            26,
            72,
            54,
            .10
          );

        background:
          #ffffff;

      }


      #navi-v2-input {

        flex:
          1 1 auto;

        min-width:
          0;

        max-height:
          100px;

        resize:
          none;

        border:
          1px solid
          rgba(
            31,
            107,
            79,
            .18
          );

        border-radius:
          14px;

        padding:
          10px 12px;

        outline:
          none;

        font:
          inherit;

        font-size:
          13px;

        line-height:
          1.4;

        color:
          #193b2c;

        background:
          #fbfdfc;

        box-sizing:
          border-box;

      }


      #navi-v2-input:focus {

        border-color:
          rgba(
            31,
            107,
            79,
            .48
          );

        box-shadow:
          0 0 0 3px
          rgba(
            31,
            107,
            79,
            .07
          );

      }


      /* =====================================================
         SEND BUTTON
         ===================================================== */

      #navi-v2-send {

        flex:
          0 0 auto;

        width:
          42px;

        height:
          42px;

        border:
          0;

        border-radius:
          13px;

        background:
          #1f6b4f;

        color:
          #ffffff;

        cursor:
          pointer;

        display:
          grid;

        place-items:
          center;

        font-size:
          18px;

      }


      #navi-v2-send:hover {

        background:
          #174f3a;

      }


      #navi-v2-send:disabled {

        opacity:
          .48;

        cursor:
          default;

      }


      /* =====================================================
         TYPING INDICATOR
         ===================================================== */

      .navi-v2-typing {

        display:
          inline-flex;

        align-items:
          center;

        gap:
          4px;

        padding:
          11px 13px;

        background:
          #edf5f0;

        border-radius:
          16px;

        border-bottom-left-radius:
          5px;

      }


      .navi-v2-typing span {

        width:
          5px;

        height:
          5px;

        border-radius:
          50%;

        background:
          #1f6b4f;

        animation:
          naviTyping
          1s
          infinite
          ease-in-out;

      }


      .navi-v2-typing span:nth-child(2) {

        animation-delay:
          .12s;

      }


      .navi-v2-typing span:nth-child(3) {

        animation-delay:
          .24s;

      }


      @keyframes naviTyping {

        0%,
        60%,
        100% {

          opacity:
            .35;

          transform:
            translateY(0);

        }

        30% {

          opacity:
            1;

          transform:
            translateY(-3px);

        }

      }


      /* =====================================================
         WELCOME MESSAGE
         ===================================================== */

      .navi-v2-welcome {

        text-align:
          left;

        margin-bottom:
          14px;

      }


      .navi-v2-welcome-title {

        font-size:
          17px;

        font-weight:
          750;

        color:
          #193b2c;

        margin-bottom:
          5px;

      }


      .navi-v2-welcome-text {

        font-size:
          13px;

        line-height:
          1.5;

        color:
          #587064;

      }


      /* =====================================================
         MOBILE
         ===================================================== */

      @media (max-width: 600px) {

        #navi-v2-chat {

          right:
            10px;

          bottom:
            92px;

          width:
            calc(100vw - 20px);

          height:
            min(
              620px,
              calc(100vh - 110px)
            );

          border-radius:
            18px;

        }


        #navi-v2-character {

          width:
            100px;

        }

      }

    `;


    document.head.appendChild(
      style
    );

  }


  /* =========================================================
     CREATE NA'VI INTERFACE
     ========================================================= */

  function createInterface() {

    /*
     * Prevent duplicate interfaces.
     */

    if (
      document.getElementById(
        "navi-v2-root"
      )
    ) {

      return;

    }


    /* =======================================================
       ROOT
       ======================================================= */

    const root =
      document.createElement(
        "div"
      );


    root.id =
      "navi-v2-root";


    /* =======================================================
       CHARACTER
       ======================================================= */

    const character =
      document.createElement(
        "img"
      );


    character.id =
      "navi-v2-character";


    character.src =
      CONFIG.defaultImage;


    character.alt =
      "Na'Vi";


    character.draggable =
      false;


    character.setAttribute(
      "aria-label",
      "Open Na'Vi"
    );


    character.setAttribute(
      "role",
      "button"
    );


    character.tabIndex =
      0;


    /* =======================================================
       CHAT WINDOW
       ======================================================= */

    const chat =
      document.createElement(
        "div"
      );


    chat.id =
      "navi-v2-chat";


    chat.setAttribute(
      "role",
      "dialog"
    );


    chat.setAttribute(
      "aria-label",
      "Na'Vi CONTROL Course companion"
    );


    /* =======================================================
       HEADER
       ======================================================= */

    const header =
      document.createElement(
        "div"
      );


    header.id =
      "navi-v2-header";


    const headerLeft =
      document.createElement(
        "div"
      );


    headerLeft.id =
      "navi-v2-header-left";


    const headerAvatar =
      document.createElement(
        "img"
      );


    headerAvatar.id =
      "navi-v2-header-avatar";


    headerAvatar.src =
      CONFIG.defaultImage;


    headerAvatar.alt =
      "Na'Vi";


    const headerText =
      document.createElement(
        "div"
      );


    const title =
      document.createElement(
        "div"
      );


    title.id =
      "navi-v2-header-title";


    title.textContent =
      "Na'Vi";


    const subtitle =
      document.createElement(
        "div"
      );


    subtitle.id =
      "navi-v2-header-subtitle";


    subtitle.textContent =
      "Your CONTROL Course companion";


    headerText.appendChild(
      title
    );


    headerText.appendChild(
      subtitle
    );


    headerLeft.appendChild(
      headerAvatar
    );


    headerLeft.appendChild(
      headerText
    );


    /* =======================================================
       CLOSE BUTTON
       ======================================================= */

    const close =
      document.createElement(
        "button"
      );


    close.id =
      "navi-v2-close";


    close.type =
      "button";


    close.setAttribute(
      "aria-label",
      "Close Na'Vi"
    );


    close.textContent =
      "×";


    header.appendChild(
      headerLeft
    );


    header.appendChild(
      close
    );


    /* =======================================================
       MESSAGE AREA
       ======================================================= */

    const messages =
      document.createElement(
        "div"
      );


    messages.id =
      "navi-v2-messages";


    messages.setAttribute(
      "aria-live",
      "polite"
    );


    /* =======================================================
       WELCOME MESSAGE
       ======================================================= */

    const welcome =
      document.createElement(
        "div"
      );


    welcome.className =
      "navi-v2-welcome";


    const welcomeTitle =
      document.createElement(
        "div"
      );


    welcomeTitle.className =
      "navi-v2-welcome-title";


    welcomeTitle.textContent =
      "Hi, I’m Na'Vi 👋";


    const welcomeText =
      document.createElement(
        "div"
      );


    welcomeText.className =
      "navi-v2-welcome-text";


    welcomeText.textContent =
      "I’m here to help you navigate the CONTROL Course with more clarity and less overwhelm.";


    welcome.appendChild(
      welcomeTitle
    );


    welcome.appendChild(
      welcomeText
    );


    messages.appendChild(
      welcome
    );


    /* =======================================================
       QUICK ACTION AREA
       ======================================================= */

    const quickActions =
      document.createElement(
        "div"
      );


    quickActions.className =
      "navi-v2-quick-actions";


    /* =======================================================
       INPUT AREA
       ======================================================= */

    const inputArea =
      document.createElement(
        "div"
      );


    inputArea.id =
      "navi-v2-input-area";


    const input =
      document.createElement(
        "textarea"
      );


    input.id =
      "navi-v2-input";


    input.rows =
      1;


    input.placeholder =
      "Ask Na'Vi something…";


    input.setAttribute(
      "aria-label",
      "Ask Na'Vi"
    );


    /* =======================================================
       SEND BUTTON
       ======================================================= */

    const send =
      document.createElement(
        "button"
      );


    send.id =
      "navi-v2-send";


    send.type =
      "button";


    send.setAttribute(
      "aria-label",
      "Send message"
    );


    send.textContent =
      "➤";


    inputArea.appendChild(
      input
    );


    inputArea.appendChild(
      send
    );


    /* =======================================================
       BUILD CHAT
       ======================================================= */

    chat.appendChild(
      header
    );


    chat.appendChild(
      messages
    );


    chat.appendChild(
      quickActions
    );


    chat.appendChild(
      inputArea
    );


    /* =======================================================
       BUILD ROOT
       ======================================================= */

    root.appendChild(
      character
    );


    root.appendChild(
      chat
    );


    document.body.appendChild(
      root
    );


    /* =======================================================
       SAVE REFERENCES
       ======================================================= */

    STATE.elements.root =
      root;


    STATE.elements.character =
      character;


    STATE.elements.chat =
      chat;


    STATE.elements.header =
      header;


    STATE.elements.headerAvatar =
      headerAvatar;


    STATE.elements.close =
      close;


    STATE.elements.messages =
      messages;


    STATE.elements.quickActions =
      quickActions;


    STATE.elements.input =
      input;


    STATE.elements.send =
      send;


    /* =======================================================
       APPLY SAVED POSITION
       ======================================================= */

    applySavedPosition();

  }


  /* =========================================================
     APPLY SAVED CHARACTER POSITION
     ========================================================= */

  function applySavedPosition() {

    const saved =
      loadSavedPosition();


    const character =
      STATE.elements.character;


    if (
      !character ||
      !saved
    ) {

      return;

    }


    /*
     * Clamp the saved position to the current viewport.
     */

    const maxLeft =
      Math.max(

        0,

        window.innerWidth -
        character.offsetWidth

      );


    const maxTop =
      Math.max(

        0,

        window.innerHeight -
        character.offsetHeight

      );


    const left =
      Math.min(

        Math.max(
          0,
          saved.left
        ),

        maxLeft

      );


    const top =
      Math.min(

        Math.max(
          0,
          saved.top
        ),

        maxTop

      );


    character.style.left =
      `${left}px`;


    character.style.top =
      `${top}px`;


    character.style.right =
      "auto";


    character.style.bottom =
      "auto";


    STATE.position = {

      left,
      top

    };

  }


  /* =========================================================
     DEFAULT CHARACTER POSITION
     ========================================================= */

  function applyDefaultCharacterPosition() {

    const character =
      STATE.elements.character;


    if (!character) {

      return;

    }


    /*
     * If a saved position exists, do not overwrite it.
     */

    if (
      STATE.position
    ) {

      return;

    }


    character.style.right =
      "20px";


    character.style.bottom =
      "20px";


    character.style.left =
      "auto";


    character.style.top =
      "auto";

  }


    /* =========================================================
     CHAT OPEN / CLOSE
     ========================================================= */

  function openChat() {

    const chat =
      STATE.elements.chat;


    if (!chat) {

      return;

    }


    STATE.open =
      true;


    chat.classList.add(
      "navi-open"
    );


    setTimeout(
      function () {

        const input =
          STATE.elements.input;


        if (input) {

          input.focus();

        }

      },
      100
    );

  }


  function closeChat() {

    const chat =
      STATE.elements.chat;


    if (!chat) {

      return;

    }


    STATE.open =
      false;


    chat.classList.remove(
      "navi-open"
    );

  }


  function toggleChat() {

    if (
      STATE.open
    ) {

      closeChat();

    } else {

      openChat();

    }

  }


  /* =========================================================
     VISUAL STATE
     ========================================================= */

  function setVisualState(
    requestedState
  ) {

    if (
      typeof requestedState !==
      "string"
    ) {

      return;

    }


    const alias =
      STATE_ALIASES[
        requestedState
      ] || requestedState;


    const state =
      NAVI_STATES[
        alias
      ];


    if (!state) {

      return;

    }


    const character =
      STATE.elements.character;


    const headerAvatar =
      STATE.elements.headerAvatar;


    if (character) {

      character.src =
        state.image;

    }


    if (headerAvatar) {

      headerAvatar.src =
        state.image;

    }


    STATE.activeVisualState =
      alias;

  }


  /* =========================================================
     TYPING INDICATOR
     ========================================================= */

  function showTyping() {

    const messages =
      STATE.elements.messages;


    if (!messages) {

      return;

    }


    removeTyping();


    const row =
      document.createElement(
        "div"
      );


    row.id =
      "navi-v2-typing-row";


    row.className =
      "navi-v2-message-row navi-assistant";


    const typing =
      document.createElement(
        "div"
      );


    typing.className =
      "navi-v2-typing";


    const dot1 =
      document.createElement(
        "span"
      );


    const dot2 =
      document.createElement(
        "span"
      );


    const dot3 =
      document.createElement(
        "span"
      );


    typing.appendChild(
      dot1
    );


    typing.appendChild(
      dot2
    );


    typing.appendChild(
      dot3
    );


    row.appendChild(
      typing
    );


    messages.appendChild(
      row
    );


    scrollMessagesToBottom();

  }


  function removeTyping() {

    const typing =
      document.getElementById(
        "navi-v2-typing-row"
      );


    if (typing) {

      typing.remove();

    }

  }


  /* =========================================================
     MESSAGE SCROLL
     ========================================================= */

  function scrollMessagesToBottom() {

    const messages =
      STATE.elements.messages;


    if (!messages) {

      return;

    }


    requestAnimationFrame(
      function () {

        messages.scrollTop =
          messages.scrollHeight;

      }
    );

  }


  /* =========================================================
     NORMALIZE BRAIN RESPONSE
     =========================================================

     Brain V2 returns:

       {
         ok: true,
         response: {
           reply: "...",
           state: "...",
           links: [...]
         }
       }

     The Frontend does not interpret the content.

     It only normalizes the structure so the interface
     can display it.
     ========================================================= */

  function normalizeBrainResponse(
    data
  ) {

    if (
      !data ||
      typeof data !==
      "object"
    ) {

      return {

        reply:
          "",

        state:
          "friendlyWave",

        links:
          []

      };

    }


    const response =
      data.response &&
      typeof data.response ===
        "object"

        ? data.response

        : data;


    const reply =
      typeof response.reply ===
      "string"

        ? response.reply.trim()

        : "";


    const state =
      typeof response.state ===
      "string"

        ? response.state

        : "friendlyWave";


    const links =
      Array.isArray(
        response.links
      )

        ? response.links

        : [];


    return {

      reply,

      state,

      links

    };

  }


  /* =========================================================
     RENDER BRAIN REPLY
     =========================================================

     IMPORTANT:

     The Brain returns reply text separately from structured
     navigation targets.

     We do NOT accept arbitrary HTML.

     We do NOT parse arbitrary Markdown links.

     Only links that have passed through the approved
     navigation registry are made clickable.
     ========================================================= */

    /* =========================================================
     RENDER BRAIN REPLY
     =========================================================

     IMPORTANT:

     The Brain returns reply text separately from structured
     navigation targets.

     We do NOT accept arbitrary HTML.

     We do NOT parse arbitrary Markdown links.

     Only links that have passed through the approved
     navigation registry are made clickable.

     Reply text is inserted as text nodes so characters such
     as &, < and > are displayed correctly and safely.
     ========================================================= */

  function renderBrainReply(
    reply,
    approvedLinks
  ) {

    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.className =
      "navi-v2-message";


    const fallbackReply =
      reply ||
      "I’m here with you. What would you like help with?";


    /* -------------------------------------------------------
       NO APPROVED LINKS

       Keep the entire reply as plain text.
       ------------------------------------------------------- */

    if (
      !approvedLinks ||
      !approvedLinks.length
    ) {

      wrapper.textContent =
        fallbackReply;

      return wrapper;

    }


    /* -------------------------------------------------------
       APPROVED LINKS EXIST

       Keep the reply as text.

       We split the reply around the exact approved link
       labels and create only those labels as safe anchors.
       ------------------------------------------------------- */

    let remaining =
      String(
        fallbackReply
      );


    const fragments =
      [];


    const sortedLinks =
      [...approvedLinks]
        .sort(
          function (
            a,
            b
          ) {

            return (
              b.text.length -
              a.text.length
            );

          }
        );


    while (
      remaining.length
    ) {

      let best =
        null;


      let bestIndex =
        -1;


      /* -----------------------------------------------------
         Find the next approved link label.
         ----------------------------------------------------- */

      for (
        const link of sortedLinks
      ) {

        const index =
          remaining.indexOf(
            link.text
          );


        if (
          index ===
          -1
        ) {

          continue;

        }


        if (
          bestIndex ===
            -1 ||
          index <
            bestIndex
        ) {

          best =
            link;

          bestIndex =
            index;

        }

      }


      /* -----------------------------------------------------
         No more approved links.

         Everything remaining becomes a normal text node.
         ----------------------------------------------------- */

      if (!best) {

        fragments.push(

          document.createTextNode(
            remaining
          )

        );


        remaining =
          "";

        break;

      }


      /* -----------------------------------------------------
         Text before the approved link.
         ----------------------------------------------------- */

      if (
        bestIndex >
        0
      ) {

        fragments.push(

          document.createTextNode(

            remaining.slice(
              0,
              bestIndex
            )

          )

        );

      }


      /* -----------------------------------------------------
         Approved navigation link.
         ----------------------------------------------------- */

      const linkElement =
        createNavigationLink(
          best
        );


      fragments.push(
        linkElement
      );


      /* -----------------------------------------------------
         Remove the link text from the remaining text.
         ----------------------------------------------------- */

      remaining =
        remaining.slice(

          bestIndex +
          best.text.length

        );

    }


    /* -------------------------------------------------------
       Append all fragments to the message.

       Text is inserted with createTextNode.
       Links are the only HTML elements created.
       ------------------------------------------------------- */

    for (
      const fragment of fragments
    ) {

      wrapper.appendChild(
        fragment
      );

    }


    return wrapper;

  }


    /*
     * The reply itself is kept as text.

     * We then locate the exact approved link labels and
     * replace only those labels with safe anchor elements.
     */

    let remaining =
      safeReply;


    const fragments =
      [];


    const sortedLinks =
      [...approvedLinks]
        .sort(
          function (
            a,
            b
          ) {

            return (
              b.text.length -
              a.text.length
            );

          }
        );


    while (
      remaining.length
    ) {

      let best =
        null;


      let bestIndex =
        -1;


      for (
        const link of sortedLinks
      ) {

        const safeText =
          escapeHtml(
            link.text
          );


        const index =
          remaining.indexOf(
            safeText
          );


        if (
          index ===
          -1
        ) {

          continue;

        }


        if (
          bestIndex ===
            -1 ||
          index <
            bestIndex
        ) {

          best =
            link;

          bestIndex =
            index;

        }

      }


      /*
       * No more approved link labels were found.
       */

      if (!best) {

        fragments.push(

          document.createTextNode(
            remaining
          )

        );


        remaining =
          "";


        break;

      }


      /*
       * Text before the approved link.
       */

      if (
        bestIndex >
        0
      ) {

        fragments.push(

          document.createTextNode(

            remaining.slice(
              0,
              bestIndex
            )

          )

        );

      }


      /*
       * Approved navigation link.
       */

      const linkElement =
        createNavigationLink(
          best
        );


      fragments.push(
        linkElement
      );


      const safeText =
        escapeHtml(
          best.text
        );


      remaining =
        remaining.slice(

          bestIndex +
          safeText.length

        );

    }


    for (
      const fragment of fragments
    ) {

      wrapper.appendChild(
        fragment
      );

    }


    return wrapper;

  }


  /* =========================================================
     ADD ASSISTANT MESSAGE
     ========================================================= */

  function addAssistantMessage(
    reply,
    links
  ) {

    const messages =
      STATE.elements.messages;


    if (!messages) {

      return;

    }


    removeTyping();


    const row =
      document.createElement(
        "div"
      );


    row.className =
      "navi-v2-message-row navi-assistant";


    const approvedLinks =
      buildApprovedLinks(
        links || []
      );


    const message =
      renderBrainReply(

        reply,

        approvedLinks

      );


    row.appendChild(
      message
    );


    messages.appendChild(
      row
    );


    STATE.messages.push({

      role:
        "assistant",

      content:
        reply || "",

      links:
        approvedLinks

    });


    scrollMessagesToBottom();

  }


  /* =========================================================
     ADD USER MESSAGE
     ========================================================= */

  function addUserMessage(
    text
  ) {

    const messages =
      STATE.elements.messages;


    if (!messages) {

      return;

    }


    const row =
      document.createElement(
        "div"
      );


    row.className =
      "navi-v2-message-row navi-user";


    const message =
      document.createElement(
        "div"
      );


    message.className =
      "navi-v2-message";


    /*
     * textContent is intentional.

     * Learner text must never become HTML.
     */

    message.textContent =
      text;


    row.appendChild(
      message
    );


    messages.appendChild(
      row
    );


    STATE.messages.push({

      role:
        "user",

      content:
        text

    });


    scrollMessagesToBottom();

  }


  /* =========================================================
     QUICK ACTIONS
     ========================================================= */

  function setQuickActions(
    actions
  ) {

    const container =
      STATE.elements.quickActions;


    if (!container) {

      return;

    }


    container.innerHTML =
      "";


    if (
      !Array.isArray(actions)
    ) {

      return;

    }


    for (
      const action of actions
    ) {

      if (
        typeof action !==
        "string"
      ) {

        continue;

      }


      const clean =
        action.trim();


      if (!clean) {

        continue;

      }


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "navi-v2-quick-action";


      button.textContent =
        clean;


      button.addEventListener(

        "click",

        function () {

          sendMessage(
            clean
          );

        }

      );


      container.appendChild(
        button
      );

    }

  }


  /* =========================================================
     DEFAULT QUICK ACTIONS
     ========================================================= */

  function setDefaultQuickActions() {

    setQuickActions([

      "Where should I start?",

      "What should I do next?",

      "I'm feeling overwhelmed."

    ]);

  }


  /* =========================================================
     BUILD BRAIN SIGNAL
     =========================================================

     The learner's actual message is the primary signal.

     Page/context information is supporting interface
     information only.

     ========================================================= */

  function buildBrainSignal(
    learnerMessage
  ) {

    const pageSignal =
      buildPageSignal();


    return {

      protocol:
        CONFIG.protocol,

      protocolVersion:
        CONFIG.protocolVersion,

      companion:
        "Na'Vi",

      framework:
        "The CONTROL Framework for Digital Program Navigation",

      session: {

        id:
          STATE.sessionId

      },

      interface: {

        page:
          pageSignal.page,

        context:
          pageSignal.context,

        title:
          pageSignal.title,

        path:
          pageSignal.path,

        activeState:
          STATE.currentActiveState

      },

      learner: {

        message:
          learnerMessage

      }

    };

  }


  /* =========================================================
     CALL Na'Vi BRAIN
     ========================================================= */

  async function callBrain(
    signal
  ) {

    const response =
      await fetch(

        CONFIG.apiEndpoint,

        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              signal
            )

        }

      );


    if (
      !response.ok
    ) {

      const errorText =
        await response
          .text()
          .catch(
            function () {

              return "";

            }
          );


      throw new Error(

        "Na'Vi Brain returned HTTP " +
        response.status +
        (
          errorText
            ? ": " + errorText
            : ""
        )

      );

    }


    const data =
      await response.json();


    if (
      !data ||
      data.ok === false
    ) {

      throw new Error(
        "Na'Vi Brain returned an unsuccessful response."
      );

    }


    return data;

  }


  /* =========================================================
     SEND BUTTON STATE
     ========================================================= */

  function setSendDisabled(
    disabled
  ) {

    const send =
      STATE.elements.send;


    if (!send) {

      return;

    }


    send.disabled =
      Boolean(
        disabled
      );


    if (
      disabled
    ) {

      send.setAttribute(
        "aria-busy",
        "true"
      );

    } else {

      send.removeAttribute(
        "aria-busy"
      );

    }

  }


  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  async function sendMessage(
    message
  ) {

    const cleanMessage =
      typeof message ===
      "string"

        ? message.trim()

        : "";


    if (
      !cleanMessage
    ) {

      return;

    }


    /*
     * Prevent two Brain requests from being submitted
     * simultaneously.
     */

    if (
      STATE.processing
    ) {

      return;

    }


    const input =
      STATE.elements.input;


    /*
     * Clear the input when the message came from the
     * text box.
     */

    if (
      input &&
      input.value.trim() ===
        cleanMessage
    ) {

      input.value =
        "";

      resizeInput();

    }


    /*
     * Open the chat automatically if a quick action
     * triggered the message.
     */

    if (
      !STATE.open
    ) {

      openChat();

    }


    addUserMessage(
      cleanMessage
    );


    STATE.processing =
      true;


    setSendDisabled(
      true
    );


    setVisualState(
      "listening"
    );


    showTyping();


    try {

      /*
       * Refresh the page/context signal immediately before
       * communicating with the Brain.
       */

      refreshPageSignal();


      const signal =
        buildBrainSignal(
          cleanMessage
        );


      const brainResponse =
        await callBrain(
          signal
        );


      const normalized =
        normalizeBrainResponse(
          brainResponse
        );


      /*
       * Apply only the visual state supplied by the Brain
       * if it matches an approved Frontend state.
       */

      setVisualState(
        normalized.state
      );


      /*
       * Render the Brain's response.

       * Navigation links are independently checked against
       * the Frontend's approved registry.
       */

      addAssistantMessage(

        normalized.reply,

        normalized.links

      );


    } catch (
      error
    ) {

      console.error(

        "Na'Vi Brain communication error:",

        error

      );


      removeTyping();


      setVisualState(
        "calm"
      );


      addAssistantMessage(

        "I’m having a little trouble connecting right now. Please try again in a moment."

      );


    } finally {

      STATE.processing =
        false;


      setSendDisabled(
        false
      );

    }

  }


  /* =========================================================
     INPUT RESIZE
     ========================================================= */

  function resizeInput() {

    const input =
      STATE.elements.input;


    if (!input) {

      return;

    }


    input.style.height =
      "auto";


    const maxHeight =
      100;


    input.style.height =
      Math.min(

        input.scrollHeight,

        maxHeight

      ) + "px";

  }


  /* =========================================================
     SUBMIT INPUT
     ========================================================= */

  function submitInput() {

    const input =
      STATE.elements.input;


    if (!input) {

      return;

    }


    const value =
      input.value.trim();


    if (!value) {

      return;

    }


    input.value =
      "";


    resizeInput();


    sendMessage(
      value
    );

  }


  /* =========================================================
     INPUT KEYBOARD HANDLING
     =========================================================

     Enter       = Send
     Shift+Enter = New line
     ========================================================= */

  function handleInputKeydown(
    event
  ) {

    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();


      submitInput();

    }

  }


    /* =========================================================
     CHARACTER DRAGGING
     ========================================================= */

  function beginCharacterDrag(
    event
  ) {

    const character =
      STATE.elements.character;


    if (!character) {

      return;

    }


    /*
     * Only allow the primary mouse button when using a mouse.
     *
     * Touch and pen input are allowed.
     */

    if (
      event.pointerType ===
        "mouse" &&
      event.button !==
        0
    ) {

      return;

    }


    const rect =
      character.getBoundingClientRect();


    STATE.dragging =
      true;


    STATE.dragMoved =
      false;


    STATE.dragStartX =
      event.clientX;


    STATE.dragStartY =
      event.clientY;


    STATE.startLeft =
      rect.left;


    STATE.startTop =
      rect.top;


    character.classList.add(
      "navi-dragging"
    );


    /*
     * Pointer capture keeps the drag attached to Na'Vi even
     * if the pointer moves outside the image.
     */

    try {

      character.setPointerCapture(
        event.pointerId
      );

    } catch (
      error
    ) {

      /*
       * Pointer capture is optional.
       */

    }


    event.preventDefault();

  }


  /* =========================================================
     MOVE CHARACTER
     ========================================================= */

  function moveCharacter(
    event
  ) {

    if (
      !STATE.dragging
    ) {

      return;

    }


    const character =
      STATE.elements.character;


    if (!character) {

      return;

    }


    const deltaX =
      event.clientX -
      STATE.dragStartX;


    const deltaY =
      event.clientY -
      STATE.dragStartY;


    /*
     * Small pointer movement is treated as a click rather
     * than a drag.
     */

    if (
      Math.abs(deltaX) >
        CONFIG.dragThreshold ||
      Math.abs(deltaY) >
        CONFIG.dragThreshold
    ) {

      STATE.dragMoved =
        true;

    }


    if (
      !STATE.dragMoved
    ) {

      return;

    }


    /*
     * Keep Na'Vi inside the visible browser viewport.
     */

    const maxLeft =
      Math.max(

        0,

        window.innerWidth -
        character.offsetWidth

      );


    const maxTop =
      Math.max(

        0,

        window.innerHeight -
        character.offsetHeight

      );


    const nextLeft =
      Math.min(

        Math.max(

          0,

          STATE.startLeft +
          deltaX

        ),

        maxLeft

      );


    const nextTop =
      Math.min(

        Math.max(

          0,

          STATE.startTop +
          deltaY

        ),

        maxTop

      );


    character.style.left =
      `${nextLeft}px`;


    character.style.top =
      `${nextTop}px`;


    character.style.right =
      "auto";


    character.style.bottom =
      "auto";


    STATE.position = {

      left:
        nextLeft,

      top:
        nextTop

    };


    event.preventDefault();

  }


  /* =========================================================
     END CHARACTER DRAG
     ========================================================= */

  function endCharacterDrag(
    event
  ) {

    if (
      !STATE.dragging
    ) {

      return;

    }


    const character =
      STATE.elements.character;


    STATE.dragging =
      false;


    if (character) {

      character.classList.remove(
        "navi-dragging"
      );


      try {

        character.releasePointerCapture(
          event.pointerId
        );

      } catch (
        error
      ) {

        /*
         * Pointer capture may already have been released.
         */

      }

    }


    /*
     * Save the new position only after an actual drag.
     */

    if (
      STATE.dragMoved &&
      STATE.position
    ) {

      savePosition(

        STATE.position.left,

        STATE.position.top

      );

    }


    /*
     * Prevent the pointer release from immediately being
     * interpreted as a character click.
     */

    setTimeout(

      function () {

        STATE.dragMoved =
          false;

      },

      0

    );

  }


  /* =========================================================
     CHARACTER CLICK
     ========================================================= */

  function handleCharacterClick(
    event
  ) {

    /*
     * If the learner dragged Na'Vi, do not open the chat
     * when the pointer is released.
     */

    if (
      STATE.dragMoved
    ) {

      event.preventDefault();

      event.stopPropagation();

      return;

    }


    toggleChat();

  }


  /* =========================================================
     CHARACTER KEYBOARD ACCESS
     ========================================================= */

  function handleCharacterKeydown(
    event
  ) {

    /*
     * Enter and Space both open/toggle Na'Vi.
     */

    if (
      event.key ===
        "Enter" ||
      event.key ===
        " "
    ) {

      event.preventDefault();


      toggleChat();

    }

  }


  /* =========================================================
     WINDOW RESIZE
     ========================================================= */

  function handleWindowResize() {

    const character =
      STATE.elements.character;


    if (!character) {

      return;

    }


    /*
     * If the learner has manually positioned Na'Vi,
     * keep her inside the viewport when the browser changes
     * size.
     */

    if (
      STATE.position
    ) {

      const maxLeft =
        Math.max(

          0,

          window.innerWidth -
          character.offsetWidth

        );


      const maxTop =
        Math.max(

          0,

          window.innerHeight -
          character.offsetHeight

        );


      const left =
        Math.min(

          Math.max(

            0,

            STATE.position.left

          ),

          maxLeft

        );


      const top =
        Math.min(

          Math.max(

            0,

            STATE.position.top

          ),

          maxTop

        );


      character.style.left =
        `${left}px`;


      character.style.top =
        `${top}px`;


      character.style.right =
        "auto";


      character.style.bottom =
        "auto";


      STATE.position = {

        left,

        top

      };


      savePosition(
        left,
        top
      );

    }

  }


  /* =========================================================
     EVENT BINDING
     ========================================================= */

  function bindEvents() {

    const character =
      STATE.elements.character;


    const close =
      STATE.elements.close;


    const send =
      STATE.elements.send;


    const input =
      STATE.elements.input;


    if (character) {

      character.addEventListener(

        "pointerdown",

        beginCharacterDrag

      );


      character.addEventListener(

        "pointermove",

        moveCharacter

      );


      character.addEventListener(

        "pointerup",

        endCharacterDrag

      );


      character.addEventListener(

        "pointercancel",

        endCharacterDrag

      );


      character.addEventListener(

        "click",

        handleCharacterClick

      );


      character.addEventListener(

        "keydown",

        handleCharacterKeydown

      );

    }


    if (close) {

      close.addEventListener(

        "click",

        closeChat

      );

    }


    if (send) {

      send.addEventListener(

        "click",

        submitInput

      );

    }


    if (input) {

      input.addEventListener(

        "keydown",

        handleInputKeydown

      );


      input.addEventListener(

        "input",

        resizeInput

      );

    }


    window.addEventListener(

      "resize",

      handleWindowResize

    );

  }


  /* =========================================================
     INITIAL GREETING
     ========================================================= */

  function initializeGreeting() {

    /*
     * This is only the visual starting state.
     *
     * No Brain request is made here.
     */

    setVisualState(
      "friendlyWave"
    );


    setDefaultQuickActions();

  }


  /* =========================================================
     INITIALIZE INTERNAL STATE
     ========================================================= */

  function initializeState() {

    STATE.sessionId =
      getSessionId();


    initializePageContext();

  }


  /* =========================================================
     REFRESH PAGE CONTEXT
     =========================================================

     Useful if the host page changes the data attributes
     without completely rebuilding the page.
     ========================================================= */

  function refreshPageContext() {

    initializePageContext();

  }


  /* =========================================================
     PUBLIC Na'Vi API
     =========================================================

     A deliberately small public interface.

     The API allows the host page to:

       • open Na'Vi
       • close Na'Vi
       • toggle Na'Vi
       • ask Na'Vi a question
       • change visual state
       • refresh page context

     It does NOT expose Brain internals.
     ========================================================= */

  function exposePublicAPI() {

    window.NaVi =
      window.NaVi ||
      {};


    window.NaVi.open =
      openChat;


    window.NaVi.close =
      closeChat;


    window.NaVi.toggle =
      toggleChat;


    window.NaVi.ask =
      sendMessage;


    window.NaVi.setState =
      setVisualState;


    window.NaVi.refreshContext =
      refreshPageContext;

  }


  /* =========================================================
     FRONTEND SAFETY CHECK
     ========================================================= */

  function frontendSafetyCheck() {

    const requiredConfig = [

      "apiEndpoint",

      "protocol",

      "protocolVersion"

    ];


    for (
      let i = 0;
      i < requiredConfig.length;
      i++
    ) {

      const key =
        requiredConfig[i];


      if (
        !CONFIG[key]
      ) {

        console.warn(

          `Na'Vi Frontend: missing CONFIG.${key}`

        );

      }

    }


    if (
      typeof window.fetch !==
        "function"
    ) {

      console.error(

        "Na'Vi Frontend: fetch is not available."

      );


      return false;

    }


    return true;

  }


  /* =========================================================
     FRONTEND RECOVERY
     ========================================================= */

  function recoverFrontend() {

    STATE.processing =
      false;


    removeTyping();


    setSendDisabled(
      false
    );


    if (
      STATE.elements &&
      STATE.elements.character
    ) {

      setVisualState(
        "calm"
      );

    }

  }


  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function initialize() {

    /*
     * Prevent the frontend from being initialized twice.
     */

    if (
      STATE.initialized
    ) {

      return;

    }


    /*
     * Verify the basic browser requirements before creating
     * the interface.
     */

    if (
      !frontendSafetyCheck()
    ) {

      return;

    }


    STATE.initialized =
      true;


    /* -------------------------------------------------------
       INTERNAL STATE
       ------------------------------------------------------- */

    initializeState();


    /* -------------------------------------------------------
       CSS
       ------------------------------------------------------- */

    injectStyles();


    /* -------------------------------------------------------
       INTERFACE
       ------------------------------------------------------- */

    createInterface();


    /*
     * Apply the default position after the interface has
     * been inserted into the document.
     */

    requestAnimationFrame(

      function () {

        applyDefaultCharacterPosition();

      }

    );


    /* -------------------------------------------------------
       EVENTS
       ------------------------------------------------------- */

    bindEvents();


    /* -------------------------------------------------------
       INITIAL VISUAL STATE
       ------------------------------------------------------- */

    initializeGreeting();


    /* -------------------------------------------------------
       PUBLIC API
       ------------------------------------------------------- */

    exposePublicAPI();

  }


  /* =========================================================
     DOM READY
     ========================================================= */

  if (
    document.readyState ===
      "loading"
  ) {

    document.addEventListener(

      "DOMContentLoaded",

      initialize,

      {
        once:
          true
      }

    );

  } else {

    initialize();

  }


  /* =========================================================
     FINAL FRONTEND BOOT
     =========================================================

     Nothing below this point is required.

     The IIFE closes here so that internal variables and
     functions do not leak into the global browser scope.

     The only intentional public object is:

       window.NaVi

     ========================================================= */

})();