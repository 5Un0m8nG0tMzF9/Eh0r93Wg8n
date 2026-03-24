// ==============================
// GLOBAL INITIALIZER
// ==============================
document.addEventListener("DOMContentLoaded", function() {

if (document.getElementById("notepad")) {
  initNotepad();
}

if (document.getElementById("calculator")) {
  initCalculator();
}

if (document.getElementById("countdown-timer")) {
  initCountdownTimer();
}

if (document.getElementById("stopwatch")) {
  initStopwatch();
}

if (document.getElementById("word-char-counter")) {
  initWordCharCounter();
}

if (document.getElementById("random-number-generator")) {
  initRandomNumberGenerator();
}

if (document.getElementById("unit-converter")) {
  initUnitConverter();
}

if (document.getElementById("text-case-converter")) {
  initTextCaseConverter();
}

if (document.getElementById("lorem-ipsum-generator")) {
  initLoremGenerator();
}

if (document.getElementById("json-formatter")) {
  initJsonFormatter();
}

if (document.getElementById("password-generator")) {
  initPasswordGenerator();
}

if (document.getElementById("text-difference-checker")) {
  initTextDifferenceChecker();
}


});


// ==============================
// NOTEPAD
// ==============================
function initNotepad() {

  const notepad = document.getElementById("notepad");
  const wordCount = document.getElementById("word-count");
  const charCount = document.getElementById("char-count");
  const STORAGE_KEY = "notepad-content";
  const TIME_KEY = "notepad-last-saved";
  const CURSOR_KEY = "notepad-cursor";
  const saveStatus = document.getElementById("save-status");

  if (!notepad) return;

  // -------------------------------
  // Load saved content
  // -------------------------------
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) notepad.value = saved;

  // -------------------------------
  // Restore cursor position
  // -------------------------------
  const savedCursor = localStorage.getItem(CURSOR_KEY);
  if (savedCursor !== null) {
    const pos = Math.min(parseInt(savedCursor, 10), notepad.value.length);
    notepad.selectionStart = notepad.selectionEnd = pos;
  }

  // -------------------------------
  // Format saved timestamp
  // -------------------------------
  function formatSavedTime(date) {
    const now = new Date();
    const sameDay = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    if (sameDay) return `Saved today at ${time}`;
    if (isYesterday) return `Saved yesterday at ${time}`;

    const datePart = date.toLocaleDateString([], { month: "short", day: "numeric" });
    return `Saved ${datePart} at ${time}`;
  }

  const lastSaved = localStorage.getItem(TIME_KEY);
  if (lastSaved && saveStatus) {
    saveStatus.innerText = formatSavedTime(new Date(lastSaved));
  }

  // -------------------------------
  // Word & character counters
  // -------------------------------
  function updateCount() {
    const text = notepad.value.trim();
    const words = text === "" ? 0 : text.split(/\s+/).length;
    const chars = text.length;

    if (wordCount) wordCount.innerText = words;
    if (charCount) charCount.innerText = chars;
  }

  // -------------------------------
  // Auto-grow
  // -------------------------------
  function autogrow() {
    notepad.style.height = 'auto';
    const minHeight = window.innerHeight * 0.8;
    notepad.style.height = Math.max(notepad.scrollHeight, minHeight) + 'px';
  }

  // -------------------------------
  // Plain-text paste
  // -------------------------------
  notepad.addEventListener("paste", function(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    const start = notepad.selectionStart;
    const end = notepad.selectionEnd;
    notepad.value = notepad.value.slice(0, start) + text + notepad.value.slice(end);
    notepad.selectionStart = notepad.selectionEnd = start + text.length;
    updateCount();
    autogrow();
  });

  // -------------------------------
  // Tab key support
  // -------------------------------
  notepad.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = notepad.selectionStart;
      const end = notepad.selectionEnd;

      // Insert 4 spaces at the cursor position
      const tabSpaces = "    ";
      notepad.value = notepad.value.slice(0, start) + tabSpaces + notepad.value.slice(end);
      notepad.selectionStart = notepad.selectionEnd = start + tabSpaces.length;

      // Trigger updateCount and autogrow just like input
      updateCount();
      autogrow();
    }
  });

  // -------------------------------
  // Auto-save
  // -------------------------------
  notepad.addEventListener("input", function() {
    updateCount();
    autogrow();
    if (saveStatus) saveStatus.innerText = "Saving...";

    localStorage.setItem(STORAGE_KEY, notepad.value);

    const now = new Date();
    localStorage.setItem(TIME_KEY, now.toISOString());
    localStorage.setItem(CURSOR_KEY, notepad.selectionStart);

    if (saveStatus) {
      setTimeout(() => { saveStatus.innerText = formatSavedTime(now); }, 500);
    }
  });

  // -------------------------------
  // Initial setup
  // -------------------------------
  updateCount();
  autogrow();
  notepad.focus();

  // -------------------------------
  // Buttons
  // -------------------------------
  document.getElementById("copy-btn")?.addEventListener("click", function(e) {
    e.preventDefault();
    navigator.clipboard.writeText(notepad.value);
    const btn = document.getElementById("copy-btn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 1500);
    notepad.focus();
  });

  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function(e) {
      e.preventDefault();
      if (!confirm("Are you sure you want to clear everything?")) return;
      notepad.value = "";
      localStorage.removeItem(STORAGE_KEY);
      if (wordCount) wordCount.innerText = 0;
      if (charCount) charCount.innerText = 0;
      autogrow();
      notepad.focus();
    });
  }

  function downloadTXT() {
    const blob = new Blob([notepad.value], { type: "text/plain" });
    const link = document.createElement("a");
    const firstLine = notepad.value.split("\n")[0].trim();
    link.download = (firstLine ? firstLine.substring(0,30) : "note") + ".txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    notepad.focus();
  }

  document.getElementById("download-txt")?.addEventListener("click", function(e) {
    e.preventDefault();
    downloadTXT();
  });

  document.getElementById("download-pdf")?.addEventListener("click", function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });

    const margin = 72;
    const topMargin = 80;
    const bottomMargin = 80;
    const lineHeight = 16;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin*2;

    pdf.setFont("helvetica");
    pdf.setFontSize(11.6);

    const wrappedText = pdf.splitTextToSize(notepad.value, usableWidth);
    let y = topMargin;
    wrappedText.forEach(line => {
      if (y + lineHeight > pageHeight - bottomMargin) {
        pdf.addPage();
        y = topMargin;
      }
      pdf.text(margin, y, line);
      y += lineHeight;
    });

    pdf.save("note.pdf");
    notepad.focus();
  });

  // -------------------------------
  // Ctrl/Cmd + S shortcut
  // -------------------------------
  document.addEventListener("keydown", function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      downloadTXT();
    }
  });
}


// ==============================
// CALCULATOR
// ==============================
function initCalculator() {

const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll(".calc-btn");
const equalsBtn = document.getElementById("equals-btn");
const clearBtn = document.getElementById("clear-btn");
const backspaceBtn = document.getElementById("backspace-btn");
const copyBtn = document.getElementById("copy-result-btn");

if (!display) return;

let expression = "";

// -------------------------
// Symbol Mapping
// -------------------------
function formatForDisplay(expr) {
return expr.replace(/\*/g, "×").replace(/\//g, "÷");
}

function formatForEval(expr) {
return expr.replace(/×/g, "*").replace(/÷/g, "/");
}

function updateDisplay() {
if (!expression) {
display.textContent = "0";
return;
}

display.textContent = formatForDisplay(expression);
}

function isOperator(char) {
return ["+", "-", "*", "/"].includes(char);
}

// -------------------------
// Decimal Limiter
// -------------------------
function formatResult(result) {
if (Number.isInteger(result)) return result.toString();
return parseFloat(result.toFixed(10)).toString();
}

// -------------------------
// Parentheses Auto-Balance
// -------------------------
function balanceParentheses(expr) {
let open = (expr.match(/\(/g) || []).length;
let close = (expr.match(/\)/g) || []).length;
let diff = open - close;

while (diff > 0) {
expr += ")";
diff--;
}

return expr;
}

// -------------------------
// Validation
// -------------------------
function canAppend(value) {

if (!expression) {
if (isOperator(value) && value !== "-") return false;
if (value === ")") return false;
}

const lastChar = expression.slice(-1);

if (isOperator(value) && lastChar === "(" && value !== "-") return false;

if (value === "(" && /[0-9)]/.test(lastChar)) return false;

if (value === ".") {
const parts = expression.split(/[\+\-\*\/\(\)]/);
const lastNumber = parts[parts.length - 1];
if (lastNumber.includes(".")) return false;
}

return true;
}

// -------------------------
// Button Clicks
// -------------------------
buttons.forEach(btn => {
btn.addEventListener("click", function (e) {
e.preventDefault();
const value = btn.getAttribute("data-value");
if (!value) return;

const lastChar = expression.slice(-1);

if (isOperator(value) && isOperator(lastChar)) {
expression = expression.slice(0, -1) + value;
updateDisplay();
return;
}

if (canAppend(value)) {
expression += value;
updateDisplay();
}
});
});

// -------------------------
// Evaluate
// -------------------------
function evaluateExpression() {
if (!expression) return;

try {
let evalExpression = balanceParentheses(expression);
evalExpression = formatForEval(evalExpression);

if (!/^[0-9+\-*/().\s]+$/.test(evalExpression)) {
throw new Error("Invalid characters");
}

let result = Function('"use strict"; return (' + evalExpression + ')')();

if (!isFinite(result)) throw new Error("Math error");

expression = formatResult(result);
updateDisplay();

} catch {
display.textContent = "Error";
expression = "";
}
}

// -------------------------
// Equals
// -------------------------
if (equalsBtn) {
equalsBtn.addEventListener("click", function (e) {
e.preventDefault();
evaluateExpression();
});
}

// -------------------------
// Clear
// -------------------------
if (clearBtn) {
clearBtn.addEventListener("click", function (e) {
e.preventDefault();
expression = "";
updateDisplay();
});
}

// -------------------------
// Backspace
// -------------------------
if (backspaceBtn) {
backspaceBtn.addEventListener("click", function (e) {
e.preventDefault();
expression = expression.slice(0, -1);
updateDisplay();
});
}

// -------------------------
// Copy Result
// -------------------------
if (copyBtn) {
copyBtn.addEventListener("click", function (e) {
e.preventDefault();
if (!expression) return;

navigator.clipboard.writeText(expression);

const originalText = copyBtn.textContent;
copyBtn.textContent = "Copied!";
setTimeout(function () {
copyBtn.textContent = originalText;
}, 1500);
});
}

// -------------------------
// Keyboard Support
// -------------------------
document.addEventListener("keydown", function (e) {

const key = e.key;

if ((key >= "0" && key <= "9") || key === ".") {
e.preventDefault();
if (canAppend(key)) {
expression += key;
updateDisplay();
}
}

if (["+", "-", "*", "/"].includes(key)) {
e.preventDefault();
const lastChar = expression.slice(-1);

if (isOperator(lastChar)) {
expression = expression.slice(0, -1) + key;
} else if (canAppend(key)) {
expression += key;
}

updateDisplay();
}

if (key === "(" || key === ")") {
e.preventDefault();
if (canAppend(key)) {
expression += key;
updateDisplay();
}
}

if (key === "Enter" || key === "=") {
e.preventDefault();
evaluateExpression();
}

if (key === "Backspace") {
e.preventDefault();
expression = expression.slice(0, -1);
updateDisplay();
}

if (key === "Escape") {
e.preventDefault();
expression = "";
updateDisplay();
}

});

updateDisplay();

}


// ==============================
// COUNTDOWN TIMER
// ==============================
function initCountdownTimer() {
  const display = document.getElementById("timer-display");
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const resetBtn = document.getElementById("reset-btn");
  const clearBtn = document.getElementById("clear-btn");
  const statusText = document.getElementById("timer-status");
  const presets = document.querySelectorAll(".preset-chip");

  if (!display) return;

  let originalSeconds = 0;
  let remainingSeconds = 0;
  let interval = null;
  let isRunning = false;
  const MAX_SECONDS = 359999; // 99:59:59

  // -------------------------------
  // Helpers
  // -------------------------------
  function formatSeconds(s){
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return String(h).padStart(2,'0') + ':' +
           String(m).padStart(2,'0') + ':' +
           String(sec).padStart(2,'0');
  }

  function setStatus(text){
    statusText.style.opacity = 0.6;
    statusText.textContent = text;
  }

  function stopTimer(){
    clearInterval(interval);
    isRunning = false;
  }

  function updateDisplay(seconds){
    remainingSeconds = Math.max(0, Math.min(seconds, MAX_SECONDS));
    display.textContent = formatSeconds(remainingSeconds);
  }

  // -------------------------------
  // Preset Buttons
  // -------------------------------
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      const addSeconds = parseInt(btn.dataset.time, 10);
      remainingSeconds += addSeconds;
      originalSeconds += addSeconds;
      if (remainingSeconds > MAX_SECONDS) {
        remainingSeconds = MAX_SECONDS;
        originalSeconds = MAX_SECONDS;
      }
      updateDisplay(remainingSeconds);
      setStatus('');
    });
  });

  // -------------------------------
  // Start / Resume
  // -------------------------------
  startBtn.addEventListener('click', () => {
    if (isRunning || remainingSeconds <= 0) return;
    isRunning = true;
    setStatus('Running');

    interval = setInterval(() => {
      remainingSeconds--;
      updateDisplay(remainingSeconds);
      if (remainingSeconds <= 0){
        stopTimer();
        setStatus("Time's Up");
      }
    }, 1000);
  });

  // -------------------------------
  // Stop
  // -------------------------------
  stopBtn.addEventListener('click', () => {
    if (!isRunning) return;
    stopTimer();
    setStatus('Paused');
  });

  // -------------------------------
  // Reset
  // -------------------------------
  resetBtn.addEventListener('click', () => {
    stopTimer();
    remainingSeconds = originalSeconds;
    updateDisplay(originalSeconds);
    setStatus('Ready');
  });

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn.addEventListener('click', () => {
    stopTimer();
    remainingSeconds = 0;
    originalSeconds = 0;
    updateDisplay(0);
    setStatus('Ready');
  });

  // -------------------------------
  // Init Display
  // -------------------------------
  updateDisplay(0);
  setStatus('Ready');

}

// ==============================
// STOPWATCH
// ==============================
function initStopwatch() {

  const display = document.getElementById("stopwatch-display");
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const resetBtn = document.getElementById("reset-btn");
  const lapBtn = document.getElementById("lap-btn");
  const lapList = document.getElementById("lap-list");
  const clearLapsBtn = document.getElementById("clear-laps-btn");

  if (!display) return;

  let startTime = 0;
  let elapsedTime = 0;
  let interval = null;
  let isRunning = false;

  function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return (
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + ":" +
      String(centiseconds).padStart(2, "0")
    );
  }

  function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
  }

  function start() {
    if (isRunning) return;

    isRunning = true;
    startTime = Date.now() - elapsedTime;

    interval = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }

  function stop() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(interval);
  }

  function reset() {
    isRunning = false;
    clearInterval(interval);
    elapsedTime = 0;
    updateDisplay();
  }

  function lap() {
    if (!isRunning) return;

    const lapItem = document.createElement("div");
    lapItem.textContent = formatTime(elapsedTime);
    lapList.prepend(lapItem);
  }

  startBtn.addEventListener("click", start);
  stopBtn.addEventListener("click", stop);
  resetBtn.addEventListener("click", reset);
  lapBtn.addEventListener("click", lap);
  clearLapsBtn.addEventListener("click", function () {
    lapList.innerHTML = "";
  });

  updateDisplay();
}


// ==============================
// WORD CHARACTER COUNTER
// ==============================
function initWordCharCounter() {

const textInput = document.getElementById("text-input");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const charNoSpaces = document.getElementById("char-no-spaces");
const readingTime = document.getElementById("reading-time");
const clearButton = document.getElementById("clear-text");

if (!textInput) return;

let timeout;

// -------------------------------
// Update word, character, reading time counts
// -------------------------------
function updateCounts() {
const text = textInput.value;

const characters = text.length;
const charactersNoSpaces = text.replace(/\s/g, "").length;

const words = text.trim().split(/\s+/).filter(word => word.length > 0);
const wordTotal = text.trim() === "" ? 0 : words.length;

const readTime = wordTotal === 0 ? 0 : Math.max(1, Math.ceil(wordTotal / 200));

wordCount.textContent = wordTotal;
charCount.textContent = characters;
charNoSpaces.textContent = charactersNoSpaces;
readingTime.textContent = readTime === 0 ? 0 : readTime + " min";
}

// -------------------------------
// Debounce for smooth typing
// -------------------------------
function debounceUpdate() {
clearTimeout(timeout);
timeout = setTimeout(updateCounts, 40);
}

textInput.addEventListener("input", debounceUpdate);

textInput.addEventListener("paste", function () {
setTimeout(updateCounts, 0);
});

clearButton.addEventListener("click", function () {
textInput.value = "";
updateCounts();
textInput.focus();
});

textInput.focus();
}


// ==============================
// RANDOM NUMBER GENERATOR
// ==============================
function initRandomNumberGenerator() {

  const minInput = document.getElementById("min-number");
  const maxInput = document.getElementById("max-number");
  const generateBtn = document.getElementById("generate-btn");
  const resultDisplay = document.getElementById("result-number");
  const copyBtn = document.getElementById("copy-result");
  const historyList = document.getElementById("history-list");
  const clearBtn = document.getElementById("clear-btn");

  if (!minInput || !maxInput || !generateBtn || !resultDisplay) return;

  let lastGeneratedNumber = 0; // store last generated number for copy button

  // Default values
  if (minInput.value === "") minInput.value = 1;
  if (maxInput.value === "") maxInput.value = 100;

  // -------------------------------
  // Enforce input digit limit
  // -------------------------------
  const maxDigits = 10; // supports numbers up to 1,000,000,000

  [minInput, maxInput].forEach(input => {
    input.addEventListener("input", () => {
      if (input.value.length > maxDigits) {
        input.value = input.value.slice(0, maxDigits);
      }
    });
  });

  // -------------------------------
  // Generate number
  // -------------------------------
  function generateNumber() {
    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);

    if (isNaN(min) || isNaN(max)) return;

    // Clamp to safe range
    min = Math.max(-1000000000, Math.min(min, 1000000000));
    max = Math.max(-1000000000, Math.min(max, 1000000000));

    // Swap if min > max
    if (min > max) [min, max] = [max, min];

    // Update inputs with clamped values
    minInput.value = min;
    maxInput.value = max;

    const finalNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    animateNumber(finalNumber);
  }

  // -------------------------------
  // Animate number
  // -------------------------------
  function animateNumber(finalNumber) {
    lastGeneratedNumber = finalNumber;

    let cycles = 10;

    const interval = setInterval(() => {
      let min = parseInt(minInput.value, 10);
      let max = parseInt(maxInput.value, 10);

      const temp = Math.floor(Math.random() * (max - min + 1)) + min;

      resultDisplay.textContent = temp.toLocaleString();

      cycles--;
      if (cycles <= 0) {
        clearInterval(interval);
        resultDisplay.textContent = finalNumber.toLocaleString();
        updateHistory(finalNumber);
      }
    }, 40);
  }

  // -------------------------------
  // Update history
  // -------------------------------
  function updateHistory(num) {
    if (!historyList) return;

    const item = document.createElement("div");
    item.textContent = num.toLocaleString();

    historyList.prepend(item);
  }

  // -------------------------------
  // Event listeners
  // -------------------------------
  generateBtn.addEventListener("click", e => {
    e.preventDefault();
    generateNumber();
  });

  minInput.addEventListener("keydown", e => {
    if (e.key === "Enter") generateNumber();
  });

  maxInput.addEventListener("keydown", e => {
    if (e.key === "Enter") generateNumber();
  });

  // Copy button
  copyBtn?.addEventListener("click", e => {
    e.preventDefault();
    if (lastGeneratedNumber !== null) {
      navigator.clipboard.writeText(lastGeneratedNumber.toString());
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy Result";
      }, 1500);
    }
  });

  // Clear button
  clearBtn?.addEventListener("click", e => {
    e.preventDefault();

    if (historyList) historyList.innerHTML = "";
    if (resultDisplay) resultDisplay.textContent = "0";
    lastGeneratedNumber = 0;

    // Reset inputs to default
    if (minInput) minInput.value = 1;
    if (maxInput) maxInput.value = 100;
  });

}


// ==============================
// UNIT CONVERTER
// ==============================
function initUnitConverter() {

const categorySelect = document.getElementById("category-select");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const inputValue = document.getElementById("input-value");

const resultFrom = document.getElementById("result-from");
const resultDisplay = document.getElementById("result-value");

const resetBtn = document.getElementById("reset-btn");
const copyBtn = document.getElementById("copy-result");
const swapBtn = document.getElementById("swap-btn");

if (!categorySelect || !fromUnit || !toUnit || !inputValue) return;

const unitLabels = {
m:{singular:"meter",plural:"meters"},
km:{singular:"kilometer",plural:"kilometers"},
cm:{singular:"centimeter",plural:"centimeters"},
mi:{singular:"mile",plural:"miles"},
ft:{singular:"foot",plural:"feet"},
in:{singular:"inch",plural:"inches"},
g:{singular:"gram",plural:"grams"},
kg:{singular:"kilogram",plural:"kilograms"},
lb:{singular:"pound",plural:"pounds"},
oz:{singular:"ounce",plural:"ounces"},
c:{singular:"°C",plural:"°C"},
f:{singular:"°F",plural:"°F"},
k:{singular:"K",plural:"K"},
s:{singular:"second",plural:"seconds"},
min:{singular:"minute",plural:"minutes"},
hr:{singular:"hour",plural:"hours"},
day:{singular:"day",plural:"days"},
l:{singular:"liter",plural:"liters"},
ml:{singular:"milliliter",plural:"milliliters"},
cup:{singular:"cup",plural:"cups"},
gal:{singular:"gallon",plural:"gallons"},
floz:{singular:"fluid ounce",plural:"fluid ounces"},
mps:{singular:"m/s",plural:"m/s"},
kmh:{singular:"km/h",plural:"km/h"},
mph:{singular:"mph",plural:"mph"},
knot:{singular:"knot",plural:"knots"}
};

const units = {
length:{units:{m:{name:"Meters",factor:1}, km:{name:"Kilometers",factor:1000}, cm:{name:"Centimeters",factor:0.01}, mi:{name:"Miles",factor:1609.34}, ft:{name:"Feet",factor:0.3048}, in:{name:"Inches",factor:0.0254}}},
weight:{units:{g:{name:"Grams",factor:1}, kg:{name:"Kilograms",factor:1000}, lb:{name:"Pounds",factor:453.592}, oz:{name:"Ounces",factor:28.3495}}},
temperature:{units:{c:{name:"Celsius"}, f:{name:"Fahrenheit"}, k:{name:"Kelvin"}}},
time:{units:{s:{name:"Seconds",factor:1}, min:{name:"Minutes",factor:60}, hr:{name:"Hours",factor:3600}, day:{name:"Days",factor:86400}}},
volume:{units:{l:{name:"Liters",factor:1}, ml:{name:"Milliliters",factor:0.001}, cup:{name:"Cups",factor:0.236588}, gal:{name:"Gallons",factor:3.78541}, floz:{name:"Fluid Ounces",factor:0.0295735}}},
speed:{units:{mps:{name:"Meters/sec",factor:1}, kmh:{name:"Kilometers/hour",factor:0.277778}, mph:{name:"Miles/hour",factor:0.44704}, knot:{name:"Knots",factor:0.514444}}}
};

function formatUnit(value,unit){
const abs=Math.abs(value);
const label=unitLabels[unit];
if(!label) return "";
return abs===1 ? label.singular : label.plural;
}

function populateUnits(category){
fromUnit.innerHTML="";
toUnit.innerHTML="";
const unitSet=units[category].units;
for(let key in unitSet){
const option1=document.createElement("option");
option1.value=key;
option1.textContent=unitSet[key].name;
fromUnit.appendChild(option1);

const option2=document.createElement("option");
option2.value=key;
option2.textContent=unitSet[key].name;
toUnit.appendChild(option2);
}
toUnit.selectedIndex=1;
convert();
}

function convert(){
const value=parseFloat(inputValue.value);
if(isNaN(value)){
resultFrom.textContent="Result";
resultDisplay.textContent="0";
return;
}

const category=categorySelect.value;
const from=fromUnit.value;
const to=toUnit.value;
let result;

if(category==="temperature"){
if(from==="c"&&to==="f") result=(value*9/5)+32;
else if(from==="f"&&to==="c") result=(value-32)*5/9;
else if(from==="c"&&to==="k") result=value+273.15;
else if(from==="k"&&to==="c") result=value-273.15;
else if(from==="f"&&to==="k") result=(value-32)*5/9+273.15;
else if(from==="k"&&to==="f") result=(value-273.15)*9/5+32;
else result=value;
}else{
const fromFactor=units[category].units[from].factor;
const toFactor=units[category].units[to].factor;
const base=value*fromFactor;
result=base/toFactor;
}

const formatted=result.toFixed(6).replace(/\.?0+$/,"");
const fromLabel=formatUnit(value,from);
const toLabel=formatUnit(result,to);

resultFrom.textContent=value+" "+fromLabel;
resultDisplay.textContent=formatted+" "+toLabel;
}

// -------------------------------
// Event listeners
// -------------------------------
categorySelect.addEventListener("change",function(){
populateUnits(this.value);
});
fromUnit.addEventListener("change",convert);
toUnit.addEventListener("change",convert);
inputValue.addEventListener("input",convert);

swapBtn?.addEventListener("click",function(){
const temp=fromUnit.value;
fromUnit.value=toUnit.value;
toUnit.value=temp;
convert();
});

resetBtn?.addEventListener("click",function(e){
e.preventDefault();
inputValue.value="";
resultDisplay.textContent="0";
resultFrom.textContent="Result";
categorySelect.value="length";
populateUnits("length");
inputValue.focus();
});

copyBtn?.addEventListener("click", function(){
navigator.clipboard.writeText(resultDisplay.textContent);
copyBtn.textContent = "Copied!";
setTimeout(function(){
copyBtn.textContent = "Copy Result";
},1500);
});

// --- PAGE LOAD DEFAULT ---
categorySelect.value = "length";
populateUnits("length");

inputValue.focus();

}


// ==============================
// TEXT CASE CONVERTER
// ==============================
function initTextCaseConverter() {

const input = document.getElementById("text-input");
const output = document.getElementById("text-output");

const upperBtn = document.getElementById("uppercase-btn");
const lowerBtn = document.getElementById("lowercase-btn");
const capitalizeBtn = document.getElementById("capitalize-btn");
const sentenceBtn = document.getElementById("sentencecase-btn");
const alternateBtn = document.getElementById("alternate-btn");
const spacesBtn = document.getElementById("spaces-btn");

const copyBtn = document.getElementById("copy-result");
const clearBtn = document.getElementById("clear-btn");

if (!input || !output) return;

let currentMode = null;

function updateOutput(text) {
output.textContent = text;
}

function getInput() {
return input.value || "";
}

// -------------------------
// Conversions
// -------------------------

function toUpper(text) {
return text.replace(/[a-z]/g, c => c.toUpperCase());
}

function toLower(text) {
return text.replace(/[A-Z]/g, c => c.toLowerCase());
}

function capitalizeWords(text) {
return text.replace(/\b[a-zA-Z][a-zA-Z']*/g, word =>
word[0].toUpperCase() + word.slice(1)
);
}

function sentenceCase(text) {
let result = "";
let capitalizeNext = true;
for (let i = 0; i < text.length; i++) {
const char = text[i];
if (capitalizeNext && /[a-zA-Z]/.test(char)) {
result += char.toUpperCase();
capitalizeNext = false;
} else {
result += char;
}
if (/[.!?]/.test(char)) capitalizeNext = true;
}
return result;
}

function alternatingCase(text) {
let result = "";
let useUpper = false;
for (let i = 0; i < text.length; i++) {
const char = text[i];
if (/[a-zA-Z]/.test(char)) {
result += useUpper ? char.toUpperCase() : char.toLowerCase();
useUpper = !useUpper;
} else {
result += char;
}
}
return result;
}

function trimSpaces(text) {
return text.replace(/\s+/g, " ").trim();
}

// -------------------------
// Apply Mode
// -------------------------

function applyMode() {
if (!currentMode) return;

const text = getInput();
let result = text;

switch (currentMode) {
case "upper": result = toUpper(text); break;
case "lower": result = toLower(text); break;
case "capitalize": result = capitalizeWords(text); break;
case "sentence": result = sentenceCase(text); break;
case "alternate": result = alternatingCase(text); break;
case "spaces": result = trimSpaces(text); break;
}

updateOutput(result);
}

// -------------------------
// Button Events
// -------------------------

upperBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="upper"; applyMode(); });
lowerBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="lower"; applyMode(); });
capitalizeBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="capitalize"; applyMode(); });
sentenceBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="sentence"; applyMode(); });
alternateBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="alternate"; applyMode(); });
spacesBtn?.addEventListener("click", e => { e.preventDefault(); currentMode="spaces"; applyMode(); });

input.addEventListener("input", applyMode);

// -------------------------
// Copy Result
// -------------------------

copyBtn?.addEventListener("click", function(e){
e.preventDefault();
const value = output.textContent;
if(!value) return;

navigator.clipboard.writeText(value);

const originalText = copyBtn.textContent;
copyBtn.textContent = "Copied!";

setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
});

// -------------------------
// Clear
// -------------------------

clearBtn?.addEventListener("click", function(e){
e.preventDefault();
input.value = "";
output.textContent = "";
currentMode = null;
input.focus();
});

input.focus();

}


// ==============================
// LOREM IPSUM GENERATOR
// ==============================
function initLoremGenerator() {

  const paragraphsRadio = document.getElementById("type-paragraphs");
  const sentencesRadio = document.getElementById("type-sentences");
  const wordsRadio = document.getElementById("type-words");

  const amountInput = document.getElementById("lorem-amount");
  const startCheckbox = document.getElementById("lorem-start");
  const startWrap = document.getElementById("lorem-start-wrap");

  const generateBtn = document.getElementById("lorem-generate");
  const copyBtn = document.getElementById("lorem-copy");
  const clearBtn = document.getElementById("lorem-clear");

  const output = document.getElementById("lorem-output");

  if (!amountInput || !output) return;

  // -------------------------
  // Base Lorem Word Bank
  // -------------------------
  const loremWords = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua").split(" ");

  // -------------------------
  // Helpers
  // -------------------------
  function getType() {
    if (paragraphsRadio?.checked) return "paragraphs";
    if (sentencesRadio?.checked) return "sentences";
    if (wordsRadio?.checked) return "words";
    return "paragraphs";
  }

  function getAmount() {
    let val = parseInt(amountInput.value, 10);
    if (isNaN(val)) return null;
    // Clamp to allowed range
    val = Math.max(1, Math.min(100, val));
    return val;
  }

  function randomWord() {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  }

  function generateWords(count) {
    let words = [];
    for (let i = 0; i < count; i++) {
      words.push(randomWord());
    }
    return words.join(" ");
  }

  function generateSentence() {
    let length = Math.floor(Math.random() * 8) + 8;
    let sentence = generateWords(length);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  }

  function generateParagraph() {
    let sentenceCount = Math.floor(Math.random() * 3) + 3;
    let sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  }

  // -------------------------
  // Start Toggle Logic
  // -------------------------
  function updateStartToggle() {
    if (!startCheckbox || !startWrap) return;

    if (getType() === "paragraphs") {
      startCheckbox.disabled = false;
      startWrap.classList.remove("disabled");
    } else {
      startCheckbox.checked = false;
      startCheckbox.disabled = true;
      startWrap.classList.add("disabled");
    }
  }

  // -------------------------
  // Generate
  // -------------------------
  function generate() {
    const type = getType();
    const amount = getAmount();

    if (!amount) {
      output.innerHTML = "";
      return;
    }

    const startWithLorem = startCheckbox?.checked;
    let result = "";

    if (type === "words") result = generateWords(amount);

    if (type === "sentences") {
      let arr = [];
      for (let i = 0; i < amount; i++) arr.push(generateSentence());
      result = arr.join(" ");
    }

    if (type === "paragraphs") {
      let arr = [];
      for (let i = 0; i < amount; i++) arr.push(generateParagraph());
      result = arr.join("<br><br>");
    }

    if (startWithLorem && type === "paragraphs" && result.length > 0) {
      const base = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      let parts = result.split("<br><br>");
      parts[0] = base + " " + parts[0];
      result = parts.join("<br><br>");
    }

    output.innerHTML = result;
  }

  // -------------------------
  // Real-time input clamping
  // -------------------------
  amountInput.addEventListener("input", () => {
    let val = parseInt(amountInput.value, 10);
    if (isNaN(val)) return;
    if (val < 1) amountInput.value = 1;
    if (val > 100) amountInput.value = 100;
  });

  // -------------------------
  // Events
  // -------------------------
  generateBtn?.addEventListener("click", function(e) {
    e.preventDefault();
    generate();
  });

  paragraphsRadio?.addEventListener("change", updateStartToggle);
  sentencesRadio?.addEventListener("change", updateStartToggle);
  wordsRadio?.addEventListener("change", updateStartToggle);

  // -------------------------
  // Copy
  // -------------------------
  copyBtn?.addEventListener("click", function(e) {
    e.preventDefault();
    const value = output.innerText;
    if (!value) return;

    navigator.clipboard.writeText(value);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";

    setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
  });

  // -------------------------
  // Clear
  // -------------------------
  clearBtn?.addEventListener("click", function(e) {
    e.preventDefault();

    amountInput.value = "";
    output.innerHTML = "";

    if (paragraphsRadio) paragraphsRadio.checked = true;
    if (sentencesRadio) sentencesRadio.checked = false;
    if (wordsRadio) wordsRadio.checked = false;

    if (startCheckbox) startCheckbox.checked = false;

    updateStartToggle();

    amountInput.focus();
  });

  // -------------------------
  // Init State
  // -------------------------
  output.innerHTML = "";
  amountInput.value = "";

  if (paragraphsRadio) paragraphsRadio.checked = true;
  if (sentencesRadio) sentencesRadio.checked = false;
  if (wordsRadio) wordsRadio.checked = false;

  if (startCheckbox) startCheckbox.checked = false;

  updateStartToggle();

  amountInput.focus();

}


// ==============================
// JSON FORMATTER
// ==============================
function initJsonFormatter() {

  const input = document.getElementById("paste-json");
  const output = document.getElementById("output-json");

  const formatBtn = document.getElementById("format-json");
  const clearBtn = document.getElementById("clear-json");
  const downloadBtn = document.getElementById("download-json");
  const copyBtn = document.getElementById("copy-json");

  if (!input || !output) return;

  // -------------------------
  // Helpers
  // -------------------------

  function updateOutput(text) {
    output.textContent = text;
  }

  function getInput() {
    return input.value || "";
  }

  // -------------------------
  // Format JSON
  // -------------------------

  function formatJSON(e) {
    if (e) e.preventDefault();

    const raw = getInput().trim();

    if (!raw) {
      updateOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);

      updateOutput(formatted);

    } catch (error) {
      updateOutput("Invalid JSON");
    }
  }

  // -------------------------
  // Copy Result (Nogstack Standard)
  // -------------------------

  function copyJSON(e) {
    e.preventDefault();

    const value = output.textContent;

    if (!value) return;

    navigator.clipboard.writeText(value);

    const originalText = copyBtn.textContent;

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  }

  // -------------------------
  // Download JSON
  // -------------------------

  function downloadJSON(e) {
    e.preventDefault();

    const text = output.textContent;

    if (!text) return;

    const blob = new Blob([text], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // -------------------------
  // Clear
  // -------------------------

  function clearJSON(e) {
    e.preventDefault();

    input.value = "";
    updateOutput("");

    input.focus();
  }

  // -------------------------
  // Keyboard Shortcut
  // -------------------------

  input.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      formatJSON();
    }
  });

  // -------------------------
  // Button Events
  // -------------------------

  formatBtn?.addEventListener("click", formatJSON);
  clearBtn?.addEventListener("click", clearJSON);
  copyBtn?.addEventListener("click", copyJSON);
  downloadBtn?.addEventListener("click", downloadJSON);

  // -------------------------
  // Auto-focus
  // -------------------------

  input.focus();

}


// ==============================
// PASSWORD GENERATOR
// ==============================
function initPasswordGenerator() {

  const output = document.getElementById("password-output");
  const regenerateBtn = document.getElementById("regenerate-password-btn");
  const copyBtn = document.getElementById("copy-password-btn");
  const clearBtn = document.getElementById("clear-password-generator");

  const lengthInput = document.getElementById("password-length-input");

  const uppercaseCheckbox = document.getElementById("include-uppercase-checkbox");
  const lowercaseCheckbox = document.getElementById("include-lowercase-checkbox");
  const numbersCheckbox = document.getElementById("include-numbers-checkbox");
  const symbolsCheckbox = document.getElementById("include-symbols-checkbox");

  const minNumbersInput = document.getElementById("min-numbers-input");
  const minSymbolsInput = document.getElementById("min-symbols-input");

  const strengthText = document.getElementById("password-strength-text");

  if (!output) return;

  // Character sets
  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*";

  // Utilities
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function ensureAtLeastOneChecked(changedBox) {
    const boxes = [
      uppercaseCheckbox,
      lowercaseCheckbox,
      numbersCheckbox,
      symbolsCheckbox
    ];

    const anyChecked = boxes.some(box => box.checked);

    if (!anyChecked) {
      changedBox.checked = true;
    }
  }

function updateStrength(length, typesCount) {

  let strength = "Weak";
  let className = "strength-weak";

  if (length >= 12 && typesCount >= 2) {
    strength = "Medium";
    className = "strength-medium";
  }

  if (length >= 16 && typesCount >= 3) {
    strength = "Strong";
    className = "strength-strong";
  }

  if (length >= 24 && typesCount === 4) {
    strength = "Very Strong";
    className = "strength-very-strong";
  }

  if (!strengthText) return;

  strengthText.textContent = "Strength: " + strength;

  // Remove old strength classes
  strengthText.classList.remove(
    "strength-weak",
    "strength-medium",
    "strength-strong",
    "strength-very-strong"
  );

  // Add the new one
  strengthText.classList.add(className);

}

  function generatePassword() {

    let length = parseInt(lengthInput.value, 10);
    let minNumbers = parseInt(minNumbersInput.value, 10);
    let minSymbols = parseInt(minSymbolsInput.value, 10);

    // Allow empty while typing
    if (isNaN(length) || isNaN(minNumbers) || isNaN(minSymbols)) {
      return;
    }

    // Clamp values
    length = clamp(length, 1, 128);
    minNumbers = clamp(minNumbers, 0, 5);
    minSymbols = clamp(minSymbols, 0, 5);

    // Normalize inputs
    lengthInput.value = length;
    minNumbersInput.value = minNumbers;
    minSymbolsInput.value = minSymbols;

    let charset = "";
    let passwordArray = [];
    let typesCount = 0;

    if (uppercaseCheckbox.checked) {
      charset += UPPERCASE;
      typesCount++;
    }

    if (lowercaseCheckbox.checked) {
      charset += LOWERCASE;
      typesCount++;
    }

    if (numbersCheckbox.checked) {
      charset += NUMBERS;
      typesCount++;
    }

    if (symbolsCheckbox.checked) {
      charset += SYMBOLS;
      typesCount++;
    }

    if (!charset) return;

    // Minimum numbers
    if (numbersCheckbox.checked) {
      for (let i = 0; i < minNumbers; i++) {
        passwordArray.push(
          NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
        );
      }
    }

    // Minimum symbols
    if (symbolsCheckbox.checked) {
      for (let i = 0; i < minSymbols; i++) {
        passwordArray.push(
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        );
      }
    }

    // Fill remaining characters
    while (passwordArray.length < length) {
      passwordArray.push(
        charset[Math.floor(Math.random() * charset.length)]
      );
    }

    // Shuffle and trim
    passwordArray = shuffle(passwordArray).slice(0, length);

    const password = passwordArray.join("");

    output.textContent = password;

    updateStrength(length, typesCount);
  }

  // Copy logic
  const originalCopyText = copyBtn?.textContent || "Copy Password";

  function copyPassword() {

    if (!output.textContent) return;

    navigator.clipboard.writeText(output.textContent);

    if (!copyBtn) return;

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = originalCopyText;
    }, 1500);
  }

  // Reset logic
  function resetGenerator() {

    if (lengthInput) lengthInput.value = 30;

    if (uppercaseCheckbox) uppercaseCheckbox.checked = true;
    if (lowercaseCheckbox) lowercaseCheckbox.checked = true;
    if (numbersCheckbox) numbersCheckbox.checked = true;
    if (symbolsCheckbox) symbolsCheckbox.checked = true;

    if (minNumbersInput) minNumbersInput.value = 1;
    if (minSymbolsInput) minSymbolsInput.value = 1;

    generatePassword();
  }

  // Event listeners
  regenerateBtn?.addEventListener("click", generatePassword);
  copyBtn?.addEventListener("click", copyPassword);
  clearBtn?.addEventListener("click", resetGenerator);

  lengthInput?.addEventListener("input", generatePassword);
  minNumbersInput?.addEventListener("input", generatePassword);
  minSymbolsInput?.addEventListener("input", generatePassword);

  uppercaseCheckbox?.addEventListener("change", function () {
    ensureAtLeastOneChecked(this);
    generatePassword();
  });

  lowercaseCheckbox?.addEventListener("change", function () {
    ensureAtLeastOneChecked(this);
    generatePassword();
  });

  numbersCheckbox?.addEventListener("change", function () {
    ensureAtLeastOneChecked(this);
    generatePassword();
  });

  symbolsCheckbox?.addEventListener("change", function () {
    ensureAtLeastOneChecked(this);
    generatePassword();
  });

  // Initial generation
  generatePassword();

}


// ==============================
// TEXT DIFFERENCE CHECKER
// ==============================
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

  function splitWords(text) {
    return text.split(/\s+/);
  }

  function updateStatus() {
    counter.textContent = `Differences found: ${differences.length}`;
    position.textContent =
      differences.length === 0
        ? "Difference 0 of 0"
        : `Difference ${currentIndex + 1} of ${differences.length}`;
  }

  function clearHighlights() {
    highlightA.innerHTML = "";
    highlightB.innerHTML = "";
    output.innerHTML = "";
    differences = [];
    currentIndex = -1;
    updateStatus();
  }

  // -------------------------
  // Diff computation
  // -------------------------
  function computeDiff() {
    clearHighlights();

    const textA = inputA.value;
    const textB = inputB.value;
    if (!textA.trim() || !textB.trim()) return;

    const wordsA = splitWords(normalizeText(textA));
    const wordsB = splitWords(normalizeText(textB));
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

      // Start of contiguous difference
      let start = i;
      let diffWordsA = [];
      let diffWordsB = [];

      while (i < maxLength && (wordsA[i] !== wordsB[i])) {
        if (wordsA[i]) diffWordsA.push(wordsA[i]);
        if (wordsB[i]) diffWordsB.push(wordsB[i]);
        i++;
      }

      // Determine type
      let type = "changed";
      if (!diffWordsA.length) type = "added";
      else if (!diffWordsB.length) type = "removed";

      // Highlight HTML
      htmlA += diffWordsA.length
        ? `<span class="diff-${type}">${diffWordsA.join(" ")}</span> `
        : "";
      htmlB += diffWordsB.length
        ? `<span class="diff-${type}">${diffWordsB.join(" ")}</span> `
        : "";

      // Save difference object
      differences.push({
        type,
        textA: diffWordsA.join(" "),
        textB: diffWordsB.join(" "),
        indicesA: [start, start + diffWordsA.length],
        indicesB: [start, start + diffWordsB.length],
      });
    }

    highlightA.innerHTML = htmlA;
    highlightB.innerHTML = htmlB;

    if (differences.length > 0) {
      currentIndex = 0;
      showCurrentDifference();
    }

    updateStatus();
  }

  function showCurrentDifference() {
    if (currentIndex < 0 || currentIndex >= differences.length) return;
    const diff = differences[currentIndex];

    output.innerHTML = `
      <strong>Text A:</strong> ${diff.textA || "(none)"}<br>
      <strong>Text B:</strong> ${diff.textB || "(none)"}<br>
      <strong>Type:</strong> ${diff.type}
    `;

    // Highlight active difference in overlays
    const spansA = highlightA.querySelectorAll(`.diff-${diff.type}`);
    const spansB = highlightB.querySelectorAll(`.diff-${diff.type}`);

    [spansA, spansB].forEach(group =>
      group.forEach(span => span.classList.remove("diff-active"))
    );

    // Activate only current difference
    if (diff.type === "added") {
      spansB.forEach((span, idx) => {
        if (idx === 0) span.classList.add("diff-active");
      });
    } else if (diff.type === "removed") {
      spansA.forEach((span, idx) => {
        if (idx === 0) span.classList.add("diff-active");
      });
    } else {
      spansA.forEach((span, idx) => {
        if (idx === 0) span.classList.add("diff-active");
      });
      spansB.forEach((span, idx) => {
        if (idx === 0) span.classList.add("diff-active");
      });
    }

    updateStatus();
  }

  // -------------------------
  // Navigation
  // -------------------------
  function nextDifference() {
    if (!differences.length) return;
    currentIndex = (currentIndex + 1) % differences.length;
    showCurrentDifference();
  }

  function prevDifference() {
    if (!differences.length) return;
    currentIndex = (currentIndex - 1 + differences.length) % differences.length;
    showCurrentDifference();
  }

  // -------------------------
  // Button actions
  // -------------------------
  function clearInput(input, highlight) {
    input.value = "";
    highlight.innerHTML = "";
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
    clearInput(inputA, highlightA);
    updateCompareState();
    inputA.focus();
  });

  clearB.addEventListener("click", () => {
    clearInput(inputB, highlightB);
    updateCompareState();
    inputB.focus();
  });

  copyA.addEventListener("click", () => copyInput(inputA));
  copyB.addEventListener("click", () => copyInput(inputB));

  clearAllBtn.addEventListener("click", clearAll);

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
