let cl = console.log;

// DOM Elements
const btns = document.querySelectorAll("button");
const startGameBtn = document.getElementById("start-game-btn");
const startScreen = document.getElementById("start-screen");
const app = document.getElementById("app");
const progressBar = document.getElementById("indicator");
const inputForm = document.getElementById("user-input-form");
const inputContainers = document.querySelectorAll(".input-container");
const nextBtn = document.querySelector(".next-btn");
const storyScreen = document.getElementById("story-screen");

// Variables
let totalPrompts;
let promptsCompleted = 0;
let storyTitle;
let story;

// button hover effect

btns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("hover"));
  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("hover");
    btn.classList.add("leave");
    setTimeout(() => btn.classList.remove("leave"), 200);
  });
});

// Start screen
startGameBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  app.style.display = "flex";
  fetchRandStory();
});

// Fetch story
function fetchRandStory() {
  fetch("story-templates.json")
    .then((res) => res.json())
    .then((data) => {
      const storyTemplate = data[Math.floor(Math.random() * data.length)];
      populateInputs(storyTemplate);
      totalPrompts = storyTemplate.inputPrompts.length;
      storyTitle = storyTemplate.title;
      story = storyTemplate.story;
      addInputListener();
      updateNextButtonState();
    })
    .catch((err) => console.error("Fetch error:", err));
}

// populate input containers
function populateInputs(storyTemplate) {
  storyTemplate.inputPrompts.forEach((prompt) => {
    const input = createInput(prompt);
    inputForm.append(input);
  });

  // show first input container
  const firstInputContainer = document.querySelectorAll(".input-container")[0];
  firstInputContainer.classList.add("show");
  firstInputContainer.querySelector("input").focus();
}

function createInput(prompt) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";
  inputContainer.innerHTML = `<label for="input-${prompt.id}">${prompt.prompt}</label>
    <input type="text" name="input-${prompt.id}" id="input-${prompt.id}">`;
  return inputContainer;
}

// Progress bar
function styleProgressBar() {
  promptsCompleted++;
  progressBar.style.width = `${(promptsCompleted / totalPrompts) * 100}%`;
}

// Update next button state based on current input
function updateNextButtonState() {
  const currentInput = document.querySelector(".input-container.show input");
  if (currentInput) {
    const isFilled = currentInput.value.trim() !== "";
    nextBtn.classList.toggle("hover", isFilled);
    nextBtn.style.pointerEvents = isFilled ? "all" : "none";
    nextBtn.style.cursor = isFilled ? "pointer" : "default";
  }
}

// Individual inputs styles and next buttons

function advance() {
  const currentInput = document.querySelector(".input-container.show");
  // prettier-ignore
  const nextInput = document.querySelector(".input-container.show + .input-container");
  if (currentInput.querySelector("input").value.trim() === "") return;
  if (nextInput) {
    styleProgressBar();
    currentInput.classList.remove("show");
    nextInput.classList.add("show");
    nextInput.querySelector("input").focus();
    updateNextButtonState();
  } else {
    inputForm.dispatchEvent(new Event("submit"));
  }
}

function addInputListener() {
  const inputFields = document.querySelectorAll(".input-container input");
  inputFields.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.toggle("inputed", input.value.trim() !== "");
      if (input.closest(".input-container.show")) {
        updateNextButtonState();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.closest(".input-container.show")) {
        e.preventDefault();
        advance();
      }
    });
  });
}

nextBtn.addEventListener("pointerdown", advance);

// form data submission
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = new FormData(e.target);
  let updatedStory = story;

  for (let i = 1; i <= totalPrompts; i++) {
    const input = inputData.get(`input-${i}`);
    if (input) {
      // prettier-ignore
      updatedStory = updatedStory.replace( `{${i}}`, `<strong>${input}</strong>`);
    }
  }

  showStoryScreen(updatedStory);
});

function showStoryScreen(updatedStory) {
  document.getElementById("story-title").innerHTML = storyTitle;
  document.getElementById("story-container").innerHTML = updatedStory;
  app.style.display = "none";
  storyScreen.style.display = "flex";
}
