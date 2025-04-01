document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.getElementById("text-input");
  const excludeSpaces = document.getElementById("exclude-spaces");
  const setLimit = document.getElementById("set-limit");
  const readingTime = document.getElementById("reading-time");
  const charCount = document.getElementById("charCount");
  const wordCount = document.getElementById("wordCount");
  const sentenceCount = document.getElementById("sentenceCount");
  const letterDensityMessage = document.getElementById(
    "letter-density-message"
  );
  const letterDensityBars = document.getElementById("letter-density-bars");
  const pageColorToggle = document.getElementById("button");
  const textArea = document.getElementById("text-input");
  const logo = document.getElementById("logo");
  const title = document.getElementById("title");
  
  let characterCount = 0;

  textInput.addEventListener("input", update);
  excludeSpaces.addEventListener("change", update);
  setLimit.addEventListener("change", update);

  function update() {
    const text = textInput.value;

    if (setLimit.checked && characterCount >= 300) {
      textInput.value = text.substring(0, 300);
    }

    const currentText = textInput.value;

    characterCount = excludeSpaces.checked
      ? currentText.replace(/\s+/g, "").length
      : currentText.length;

    charCount.textContent = characterCount;

    if (setLimit.checked && characterCount >= 300) {
      textInput.style.border = "2px solid var(--Orange1)";
    } else {
      textInput.style.border = "none";
    }

    const wordsArray = currentText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    wordCount.textContent = wordsArray.length;

    const sentences = currentText
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0);

    sentenceCount.textContent = sentences.length;

    const wordsPerMinute = Math.ceil(wordsArray.length / 238);
    readingTime.textContent = wordsPerMinute + " min read";

    updateLetterDensity(currentText);
  }

  function updateLetterDensity(text) {
    const letterCounts = {};
    const letters = text.toLowerCase().replace(/[^a-z]/g, "");

    if (letters.length === 0) {
      letterDensityMessage.textContent = "Type something to see letter density";
      letterDensityBars.innerHTML = "";
      return;
    }

    // Count each letter
    for (const letter of letters) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    // Sort letters by frequency (highest first)
    const sortedLetters = Object.keys(letterCounts).sort(
      (a, b) => letterCounts[b] - letterCounts[a]
    );

    // Clear previous content
    letterDensityMessage.textContent = "Letter Density";
    letterDensityBars.innerHTML = "";

    // Take top letters (you can adjust the number)
    const topLetters = sortedLetters.slice(0, 5);

    // Create bars for each letter
    topLetters.forEach((letter) => {
      const count = letterCounts[letter];
      const percentage = ((count / letters.length) * 100).toFixed(2);

      const barContainer = document.createElement("div");
      barContainer.className = "bar-container";
      barContainer.style.display = "flex";
      barContainer.style.alignItems = "center";
      barContainer.style.margin = "10px 0";
      barContainer.style.width = "100%";

      // Letter on the left
      const letterElement = document.createElement("div");
      letterElement.className = "letter";
      letterElement.textContent = letter.toUpperCase();
      letterElement.style.width = "30px";
      letterElement.style.fontSize = "18px";
      letterElement.style.fontWeight = "bold";

      // Bar wrapper to control the width
      const barWrapper = document.createElement("div");
      barWrapper.style.flex = "1";
      barWrapper.style.marginLeft = "10px";
      barWrapper.style.marginRight = "10px";

      // Bar in the middle
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = "20px";
      bar.style.backgroundColor = "#D3A0FA"; // Purple color
      bar.style.borderRadius = "10px";

      // Calculate relative width based on highest frequency
      const highestFrequency = letterCounts[sortedLetters[0]];
      const relativeWidth = (count / highestFrequency) * 100;
      bar.style.width = `${relativeWidth}%`;

      // Count and percentage on the right
      const countElement = document.createElement("div");
      countElement.className = "count";
      countElement.textContent = `${count} (${percentage}%)`;
      countElement.style.width = "120px";
      countElement.style.textAlign = "right";

      // Add elements to container
      barContainer.appendChild(letterElement);
      barWrapper.appendChild(bar);
      barContainer.appendChild(barWrapper);
      barContainer.appendChild(countElement);

      // Add container to the chart
      letterDensityBars.appendChild(barContainer);
    });

    // Add "See more" button if there are more letters
    if (sortedLetters.length > 5) {
      const seeMoreButton = document.createElement("button");
      seeMoreButton.textContent = "See more ↓";
      seeMoreButton.style.background = "none";
      seeMoreButton.style.border = "none";
      seeMoreButton.style.color = "white";
      seeMoreButton.style.cursor = "pointer";
      seeMoreButton.style.marginTop = "10px";
      letterDensityBars.appendChild(seeMoreButton);

      let showingMore = false;

      seeMoreButton.addEventListener("click", function () {
        if (!showingMore) {
          // Show more letters (from 6th to 15th or all remaining)
          const additionalLetters = sortedLetters.slice(5, 15);

          // Create bars for additional letters
          additionalLetters.forEach((letter) => {
            const count = letterCounts[letter];
            const percentage = ((count / letters.length) * 100).toFixed(2);

            const barContainer = document.createElement("div");
            barContainer.className = "bar-container";
            barContainer.style.display = "flex";
            barContainer.style.alignItems = "center";
            barContainer.style.margin = "10px 0";
            barContainer.style.width = "100%";

            // Letter on the left
            const letterElement = document.createElement("div");
            letterElement.className = "letter";
            letterElement.textContent = letter.toUpperCase();
            letterElement.style.width = "30px";
            letterElement.style.fontSize = "18px";
            letterElement.style.fontWeight = "bold";

            // Bar wrapper to control the width
            const barWrapper = document.createElement("div");
            barWrapper.style.flex = "1";
            barWrapper.style.marginLeft = "10px";
            barWrapper.style.marginRight = "10px";

            // Bar in the middle
            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = "20px";
            bar.style.backgroundColor = "#D3A0FA"; // Purple color
            bar.style.borderRadius = "10px";

            // Calculate relative width based on highest frequency
            const highestFrequency = letterCounts[sortedLetters[0]];
            const relativeWidth = (count / highestFrequency) * 100;
            bar.style.width = `${relativeWidth}%`;

            // Count and percentage on the right
            const countElement = document.createElement("div");
            countElement.className = "count";
            countElement.textContent = `${count} (${percentage}%)`;
            countElement.style.width = "120px";
            countElement.style.textAlign = "right";

            // Add elements to container
            barContainer.appendChild(letterElement);
            barWrapper.appendChild(bar);
            barContainer.appendChild(barWrapper);
            barContainer.appendChild(countElement);

            // Add container to the chart
            letterDensityBars.appendChild(barContainer);
          });

          // Change button text
          seeMoreButton.textContent = "See less ↑";
          showingMore = true;
          letterDensityBars.appendChild(seeMoreButton);
        } else {
          // Remove additional bars (keep only the first 5)
          const allBars = letterDensityBars.querySelectorAll(".bar-container");
          for (let i = allBars.length - 1; i >= 5; i--) {
            allBars[i].remove();
          }

          // Change button text back
          seeMoreButton.textContent = "See more ↓";
          showingMore = false;
        }
      });
    }
  }

  pageColorToggle.addEventListener("click", () => {
    const body = document.body;
    const optionsContainer = document.querySelectorAll(".checkmark");
    const checkmarkSpans = document.querySelectorAll(".cheese");
    const textInput = document.getElementById("text-input")

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
      body.style.backgroundColor = "var(--Neutral-10)";
      body.style.color = "var(--Neutral-900)";
      textArea.style.color = "var(--Neutral-900)";
      textArea.style.backgroundColor = "var(--Neutral-200)";
      pageColorToggle.src = "./assets/images/icon-moon.svg";
      logo.src = "./assets/images/logo-light-theme.svg";
      title.style.color = "var(--Neutral-900)";
      textInput.style.color = "var(--Neutral-900)"
      
      // Change color of options container and checkmark spans
      optionsContainer.forEach(container => {
        container.style.borderColor = "var(--Neutral-900)";
      });
      
      checkmarkSpans.forEach(span => {
        span.style.color = "var(--Neutral-900)";
      });

    } else {
      body.style.backgroundColor = "";
      body.style.color = "";
      textArea.style.color = "";
      textArea.style.backgroundColor = "";
      pageColorToggle.src = "./assets/images/icon-sun.svg";
      logo.src = "./assets/images/logo-dark-theme.svg";
      title.style.color = "";
      textInput.style.color = ""
      
      // Reset color of options container and checkmark spans
      optionsContainer.forEach(container => {
        container.style.borderColor = "";
      });
      
      checkmarkSpans.forEach(span => {
        span.style.color = "";
      });
    }
  });

  update();
});
