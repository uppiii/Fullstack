const focusOptions = {
  automation: {
    title: "AI & workflow automation",
    description: "Explore where thoughtful automation could remove manual steps and give your team more room for higher-value work.",
    recommendation: "Start with a workflow discovery session",
    nextStep: "Map one repetitive workflow, its inputs, and the outcome your team needs. That gives a discovery conversation a concrete place to begin."
  },
  software: {
    title: "Custom software & product development",
    description: "Turn a product idea or disconnected tools into a focused build conversation with clearer users, needs, and priorities.",
    recommendation: "Start with product discovery",
    nextStep: "Identify the primary user and the first problem to solve. A small, well-scoped first release can validate the direction before it grows."
  },
  cloud: {
    title: "Cloud & infrastructure",
    description: "Get a clearer view of the systems, reliability, or scale challenge behind your cloud and infrastructure goals.",
    recommendation: "Start with an architecture review",
    nextStep: "Bring a simple map of the systems involved and the constraint you need to address, such as reliability, security, or cost."
  },
  growth: {
    title: "Digital growth & technical SEO",
    description: "Connect your digital presence to a growth goal, then work out which discovery or performance opportunity deserves attention first.",
    recommendation: "Start with a digital growth audit",
    nextStep: "Choose one outcome to improve and note where your audience currently finds or drops off from your digital experience."
  }
};

const state = {
  focus: null,
  teamSize: 5,
  weeklyHours: 5,
  timeline: "In 1–3 months"
};

const panels = {
  focus: document.querySelector("#step-one"),
  details: document.querySelector("#step-two"),
  result: document.querySelector("#step-result")
};
const stepCount = document.querySelector("#step-count");
const stepKicker = document.querySelector("#step-kicker");
const progressFill = document.querySelector("#progress-fill");
const choiceCards = [...document.querySelectorAll(".choice-card")];
const teamSizeInput = document.querySelector("#team-size");
const weeklyHoursInput = document.querySelector("#weekly-hours");
const timelineInput = document.querySelector("#timeline");

function showPanel(panel) {
  Object.entries(panels).forEach(([name, element]) => {
    element.hidden = name !== panel;
  });

  if (panel === "focus") {
    stepCount.innerHTML = '01 <span>/ 02</span>';
    stepKicker.textContent = "PROJECT FIT CHECK";
    progressFill.style.width = "50%";
  } else if (panel === "details") {
    stepCount.innerHTML = '02 <span>/ 02</span>';
    stepKicker.textContent = "A LITTLE CONTEXT";
    progressFill.style.width = "100%";
  } else {
    stepCount.textContent = "READY";
    stepKicker.textContent = "YOUR PROJECT FIT";
    progressFill.style.width = "100%";
  }

  document.querySelector(".planner-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

choiceCards.forEach((card, index) => {
  card.addEventListener("click", () => selectFocus(card));
  card.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const nextCard = choiceCards[(index + direction + choiceCards.length) % choiceCards.length];
    nextCard.focus();
    selectFocus(nextCard);
  });
});

function selectFocus(card) {
  state.focus = card.dataset.focus;
  choiceCards.forEach((option) => {
    option.setAttribute("aria-checked", String(option === card));
    option.tabIndex = option === card ? 0 : -1;
  });
  document.querySelector("#focus-error").hidden = true;
}

document.querySelector("#continue-button").addEventListener("click", () => {
  if (!state.focus) {
    document.querySelector("#focus-error").hidden = false;
    choiceCards[0].focus();
    return;
  }
  showPanel("details");
  document.querySelector("#back-button").focus();
});

document.querySelector("#back-button").addEventListener("click", () => {
  showPanel("focus");
  choiceCards.find((card) => card.dataset.focus === state.focus).focus();
});

teamSizeInput.addEventListener("input", () => {
  state.teamSize = Number(teamSizeInput.value);
  document.querySelector("#team-size-output").textContent = `${state.teamSize} ${state.teamSize === 1 ? "person" : "people"}`;
});

weeklyHoursInput.addEventListener("input", () => {
  state.weeklyHours = Number(weeklyHoursInput.value);
  document.querySelector("#weekly-hours-output").textContent = `${state.weeklyHours} ${state.weeklyHours === 1 ? "hour" : "hours"}`;
});

timelineInput.addEventListener("change", () => {
  state.timeline = timelineInput.value;
});

document.querySelector("#results-button").addEventListener("click", () => {
  if (!timelineInput.value) {
    document.querySelector("#details-error").hidden = false;
    timelineInput.focus();
    return;
  }

  state.timeline = timelineInput.value;
  const fit = focusOptions[state.focus];
  if (!fit) {
    throw new Error("Cannot create a project fit without a valid focus.");
  }

  const potentialHours = Math.round(state.teamSize * state.weeklyHours * 0.6);
  document.querySelector("#result-title").textContent = `A strong starting point: ${fit.title}.`;
  document.querySelector("#result-description").textContent = fit.description;
  document.querySelector("#recommendation-title").textContent = fit.recommendation;
  document.querySelector("#recommendation-description").textContent = `${fit.nextStep} Your preferred start: ${state.timeline.toLowerCase()}.`;
  document.querySelector("#hours-result").textContent = String(potentialHours);
  document.querySelector("#details-error").hidden = true;
  document.querySelector("#copy-status").textContent = "";
  showPanel("result");
  document.querySelector("#restart-button").focus();
});

function createBrief() {
  const fit = focusOptions[state.focus];
  const potentialHours = Math.round(state.teamSize * state.weeklyHours * 0.6);
  return [
    "Cynbit project-fit brief",
    `Project focus: ${fit.title}`,
    `Team involved: ${state.teamSize} ${state.teamSize === 1 ? "person" : "people"}`,
    `Time spent on the workflow: ${state.weeklyHours} ${state.weeklyHours === 1 ? "hour" : "hours"} per person, per week`,
    `Potential time back (illustrative): ${potentialHours} hours per week`,
    `Preferred start: ${state.timeline}`,
    `Suggested first step: ${fit.recommendation}`,
    `What to explore: ${fit.nextStep}`
  ].join("\n");
}

document.querySelector("#copy-button").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(createBrief());
    status.textContent = "Your project brief is copied and ready to share.";
  } catch (error) {
    status.textContent = "Clipboard access is unavailable here. You can still share your answers on the Cynbit contact page.";
  }
});

document.querySelector("#restart-button").addEventListener("click", () => {
  state.focus = null;
  state.teamSize = 5;
  state.weeklyHours = 5;
  state.timeline = "In 1–3 months";
  teamSizeInput.value = "5";
  weeklyHoursInput.value = "5";
  timelineInput.value = state.timeline;
  document.querySelector("#team-size-output").textContent = "5 people";
  document.querySelector("#weekly-hours-output").textContent = "5 hours";
  document.querySelector("#copy-status").textContent = "";
  choiceCards.forEach((card, index) => {
    card.setAttribute("aria-checked", "false");
    card.tabIndex = index === 0 ? 0 : -1;
  });
  showPanel("focus");
  document.querySelector("#continue-button").focus();
});
