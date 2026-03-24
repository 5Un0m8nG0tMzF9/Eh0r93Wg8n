function initTextDifferenceChecker() {
  const wrapper = document.getElementById("text-difference-checker");
  if (!wrapper) return;

  // Inputs
  const inputA = document.getElementById("text-diff-input-a");
  const inputB = document.getElementById("text-diff-input-b");

  // Highlight overlays
  const highlightA = document.getElementById("text-diff-highlight-a");
  const highlightB = document.getElementById("text-diff-highlight-b");

  // Buttons
  const clearA = document.getElementById("text-diff-clear-a");
  const copyA = document.getElementById("text-diff-copy-a");
  const clearB = document.getElementById("text-diff-clear-b");
  const copyB = document.getElementById("text-diff-copy-b");
  const compareBtn = document.getElementById("text-diff-compare-btn");
  const clearAllBtn = document.getElementById("text-diff-clear-all");
  const nextBtn = document.getElementById("text-diff-next-btn");
  const prevBtn = document.getElementById("text-diff-prev-btn");

  // Status
  const counter = document.getElementById("text-diff-counter");
  const position = document.getElementById("text-diff-position");

  // Output
  const output = document.getElementById("text-diff-output");

  // Options
  const ignoreCase = document.getElementById("text-diff-ignore-case");
  const ignoreWhitespace = document.getElementById("text-diff-ignore-whitespace");

  // State
  let differences = [];
  let currentIndex = -1;

  // -------------------------
  // Utilities
  // -------------------------
  function normalizeText(text) {
    if (ignoreCase.checked) text = text.toLowerCase();
    if (ignoreWhitespace.checked) text = text.replace(/\s+/g, " ");
    return text;
  }

  function updateStatus() {
    counter.textContent = `Differences found: ${differences.length}`;
    position.textContent =
      differences.length === 0 ? "Difference 0 of 0" : `Difference ${currentIndex + 1} of ${differences.length}`;
  }

  function clearHighlights() {
    highlightA.innerHTML = "";
    highlightB.innerHTML = "";
    output.innerHTML = "";
    differences = [];
    currentIndex = -1;
    updateStatus();
  }

  function scrollToCurrent() {
    if (currentIndex < 0 || currentIndex >= differences.length) return;
    const diff = differences[currentIndex];
    diff.elA.scrollIntoView({ behavior: "smooth", block: "center" });
    diff.elB.scrollIntoView({ behavior: "smooth", block: "center" });

    differences.forEach(d => d.elA.classList.remove("diff-active"));
    differences.forEach(d => d.elB.classList.remove("diff-active"));

    diff.elA.classList.add("diff-active");
    diff.elB.classList.add("diff-active");

    // Update output
    output.innerHTML = `Type: ${diff.type}<br>Text A: ${diff.textA}<br>Text B: ${diff.textB}`;
  }

  // -------------------------
  // Diff Logic (Grouped)
  // -------------------------
  function computeDiff() {
    clearHighlights();

    const textA = normalizeText(inputA.value);
    const textB = normalizeText(inputB.value);
    if (!textA.trim() && !textB.trim()) return;

    const wordsA = textA.split(/\s+/);
    const wordsB = textB.split(/\s+/);
    const maxLength = Math.max(wordsA.length, wordsB.length);

    let htmlA = "";
    let htmlB = "";

    differences = [];

    let i = 0;
    while (i < maxLength) {
      const wordA = wordsA[i] || "";
      const wordB = wordsB[i] || "";

      if (wordA === wordB) {
        htmlA += wordA ? wordA + " " : "";
        htmlB += wordB ? wordB + " " : "";
        i++;
        continue;
      }

      // Determine type
      let type = "";
      let textAGroup = "";
      let textBGroup = "";

      if (wordA && !wordB) {
        type = "removed";
        textAGroup = wordA;
        textBGroup = "";
        htmlA += `<span class="diff-removed">${wordA}</span> `;
      } else if (!wordA && wordB) {
        type = "added";
        textAGroup = "";
        textBGroup = wordB;
        htmlB += `<span class="diff-added">${wordB}</span> `;
      } else {
        type = "changed";
        textAGroup = wordA;
        textBGroup = wordB;
        htmlA += `<span class="diff-changed">${wordA}</span> `;
        htmlB += `<span class="diff-changed">${wordB}</span> `;
      }

      differences.push({
        elA: htmlA ? highlightA.querySelectorAll("span").item(highlightA.querySelectorAll("span").length) : null,
        elB: htmlB ? highlightB.querySelectorAll("span").item(highlightB.querySelectorAll("span").length) : null,
        type,
        textA: textAGroup,
        textB: textBGroup,
      });

      i++;
    }

    highlightA.innerHTML = htmlA;
    highlightB.innerHTML = htmlB;

    if (differences.length > 0) {
      currentIndex = 0;
      scrollToCurrent();
    }

    updateStatus();
  }

  // -------------------------
  // Navigation
  // -------------------------
  function nextDifference() {
    if (!differences.length) return;
    currentIndex = (currentIndex + 1) % differences.length;
    scrollToCurrent();
    updateStatus();
  }

  function prevDifference() {
    if (!differences.length) return;
    currentIndex = (currentIndex - 1 + differences.length) % differences.length;
    scrollToCurrent();
    updateStatus();
  }

  // -------------------------
  // Button Actions
  // -------------------------
  function clearInput(input) {
    input.value = "";
  }

  function copyInput(input) {
    input.select();
    document.execCommand("copy");
  }

  function clearAll() {
    inputA.value = "";
    inputB.value = "";
    ignoreCase.checked = false;
    ignoreWhitespace.checked = false;
    clearHighlights();
    inputA.focus();
  }

  function updateCompareState() {
    compareBtn.disabled = !inputA.value.trim() || !inputB.value.trim();
  }

  // -------------------------
  // Event Listeners
  // -------------------------
  compareBtn.addEventListener("click", computeDiff);
  nextBtn.addEventListener("click", nextDifference);
  prevBtn.addEventListener("click", prevDifference);

  clearA.addEventListener("click", () => {
    clearInput(inputA);
    updateCompareState();
    inputA.focus();
  });

  clearB.addEventListener("click", () => {
    clearInput(inputB);
    updateCompareState();
    inputB.focus();
  });

  clearAllBtn.addEventListener("click", clearAll);

  copyA.addEventListener("click", () => copyInput(inputA));
  copyB.addEventListener("click", () => copyInput(inputB));

  inputA.addEventListener("input", updateCompareState);
  inputB.addEventListener("input", updateCompareState);
  ignoreCase.addEventListener("change", computeDiff);
  ignoreWhitespace.addEventListener("change", computeDiff);

  // -------------------------
  // Initial State
  // -------------------------
  updateCompareState();
  updateStatus();
  inputA.focus();
}
