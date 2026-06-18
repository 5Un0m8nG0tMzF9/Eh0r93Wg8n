

function initBmiCalculator() {

  const wrapper = document.getElementById("bmi-calculator");

  if (!wrapper) return;

  // -------------------------------
  // Unit Modes
  // -------------------------------
  const imperialMode = document.getElementById("imperial-mode");

  const metricMode = document.getElementById("metric-mode");

  // -------------------------------
  // Field Wrappers
  // -------------------------------
  const imperialFields = document.getElementById("imperial-fields");

  const metricFields = document.getElementById("metric-fields");

  // -------------------------------
  // Imperial Inputs
  // -------------------------------
  const heightFeet = document.getElementById("height-feet");

  const heightInches = document.getElementById("height-inches");

  const weightLbs = document.getElementById("weight-lbs");

  // -------------------------------
  // Metric Inputs
  // -------------------------------
  const heightCm = document.getElementById("height-cm");

  const weightKg = document.getElementById("weight-kg");

  // -------------------------------
  // Controls
  // -------------------------------
  const calculateBtn = document.getElementById("bmi-calculate");

  const copyBtn = document.getElementById("bmi-copy");

  const clearBtn = document.getElementById("bmi-clear");

  const result = document.getElementById("bmi-result");

  const commentary = document.getElementById("bmi-commentary");

  // -------------------------------
  // Helpers
  // -------------------------------
  function updateMode() {

    imperialFields.style.display =
      imperialMode.checked ? "flex" : "none";

    metricFields.style.display =
      metricMode.checked ? "flex" : "none";

    if (imperialMode.checked) {

      heightFeet.focus();

    } else {

      heightCm.focus();

    }

  }

  function getCategory(bmi) {

    if (bmi < 18.5) {
      return "Underweight";
    }

    if (bmi < 25) {
      return "Normal Weight";
    }

    if (bmi < 30) {
      return "Overweight";
    }

    return "Obesity";

  }

  // -------------------------------
  // Mode Events
  // -------------------------------
  imperialMode?.addEventListener(
    "change",
    updateMode
  );

  metricMode?.addEventListener(
    "change",
    updateMode
  );

  // -------------------------------
  // Calculate
  // -------------------------------
  function calculateBMI() {

    let bmi = 0;

    // -------------------------------
    // Imperial
    // -------------------------------
    if (imperialMode.checked) {

      const feet = parseFloat(heightFeet.value);

      const inches = parseFloat(
        heightInches.value || 0
      );

      const pounds = parseFloat(weightLbs.value);

      if (isNaN(feet) ||
        isNaN(pounds) ||
        feet <= 0 ||
        pounds <= 0) {

        result.textContent = "-";
        commentary.textContent = "";
        result.dataset.copyValue = "";
        return;

      }

      const totalInches = (feet * 12) + inches;

      bmi =
        (pounds * 703) /
        (totalInches * totalInches);

    }










    // -------------------------------
    // Metric
    // -------------------------------
    else {

      const cm = parseFloat(heightCm.value);

      const kg = parseFloat(weightKg.value);

      if (isNaN(cm) ||
        isNaN(kg) ||
        cm <= 0 ||
        kg <= 0) {

        result.textContent = "-";
        commentary.textContent = "";
        result.dataset.copyValue = "";
        return;

      }

      const meters = cm / 100;

      bmi =
        kg /
        (meters * meters);

    }

    // -------------------------------
    // Output
    // -------------------------------
    const bmiRounded = bmi.toFixed(1);

    const category = getCategory(bmi);

    result.textContent =
      bmiRounded;

    result.dataset.copyValue =
      bmiRounded;

    commentary.textContent =
      category;

  }

  // -------------------------------
  // Calculate Button
  // -------------------------------
  calculateBtn?.addEventListener(
    "click",
    calculateBMI
  );

  // -------------------------------
  // Enter Key Support
  // -------------------------------
  [
    heightFeet,
    heightInches,
    weightLbs,
    heightCm,
    weightKg
  ].forEach(input => {

    if (!input) return;

    input.addEventListener(
      "keydown",
      (e) => {

        if (e.key === "Enter") {

          e.preventDefault();
          calculateBMI();

        }

      }
    );

  });

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const value = result.dataset.copyValue;

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      heightFeet.value = "";
      heightInches.value = "";
      weightLbs.value = "";

      heightCm.value = "";
      weightKg.value = "";

      result.textContent = "-";
      commentary.textContent = "-";
      result.dataset.copyValue = "";

      if (imperialMode.checked) {

        heightFeet.focus();

      } else {

        heightCm.focus();

      }

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  imperialMode.checked = true;
  metricMode.checked = false;

  updateMode();

  result.textContent = "-";
  commentary.textContent = "-";
  result.dataset.copyValue = "";

  heightFeet.focus();

}


function initBmrCalculator() {

  const wrapper = document.getElementById("bmr-calculator");

  if (!wrapper) return;

  // -------------------------------
  // Mode Radios
  // -------------------------------
  const imperialMode = document.getElementById("bmr-imperial-mode");

  const metricMode = document.getElementById("bmr-metric-mode");

  // -------------------------------
  // Field Wrappers
  // -------------------------------
  const imperialFields = document.getElementById("bmr-imperial-fields");

  const metricFields = document.getElementById("bmr-metric-fields");

  // -------------------------------
  // Shared Inputs
  // -------------------------------
  const ageInput = document.getElementById("bmr-age");

  const sexInput = document.getElementById("bmr-sex");

  // -------------------------------
  // Imperial Inputs
  // -------------------------------
  const heightFeet = document.getElementById("bmr-height-feet");

  const heightInches = document.getElementById("bmr-height-inches");

  const weightPounds = document.getElementById("bmr-weight-pounds");

  // -------------------------------
  // Metric Inputs
  // -------------------------------
  const heightCm = document.getElementById("bmr-height-cm");

  const weightKg = document.getElementById("bmr-weight-kg");

  // -------------------------------
  // Controls
  // -------------------------------
  const calculateBtn = document.getElementById("bmr-calculate");

  const copyBtn = document.getElementById("bmr-copy");

  const clearBtn = document.getElementById("bmr-clear");

  // -------------------------------
  // Outputs
  // -------------------------------
  const result = document.getElementById("bmr-result");

  const sedentaryOutput = document.getElementById("bmr-sedentary");

  const lightlyOutput = document.getElementById("bmr-lightly");

  const moderatelyOutput = document.getElementById("bmr-moderately");

  const veryOutput = document.getElementById("bmr-very");

  const extremelyOutput = document.getElementById("bmr-extremely");

  // -------------------------------
  // Helpers
  // -------------------------------
  function updateMode() {

    imperialFields.style.display =
      imperialMode.checked
        ? "flex"
        : "none";

    metricFields.style.display =
      metricMode.checked
        ? "flex"
        : "none";

    ageInput.focus();

  }

  function clearOutputs() {

    result.textContent = "-";

    sedentaryOutput.textContent = "-";
    lightlyOutput.textContent = "-";
    moderatelyOutput.textContent = "-";
    veryOutput.textContent = "-";
    extremelyOutput.textContent = "-";

    result.dataset.copyValue = "";

  }

  function formatNumber(value) {

    return Math.round(value)
      .toLocaleString();

  }

  // -------------------------------
  // Calculate
  // -------------------------------
  function calculateBmr() {

    const age = parseInt(ageInput.value, 10);

    const sex = sexInput.value;

    if (!age ||
      age <= 0 ||
      !sex) {

      clearOutputs();
      return;

    }

    let heightCmValue;
    let weightKgValue;

    // -----------------------------
    // Imperial
    // -----------------------------
    if (imperialMode.checked) {

      const feet = parseFloat(heightFeet.value);

      const inches = parseFloat(heightInches.value) || 0;

      const pounds = parseFloat(weightPounds.value);

      if (isNaN(feet) ||
        isNaN(pounds)) {

        clearOutputs();
        return;

      }

      const totalInches = (feet * 12) + inches;

      heightCmValue =
        totalInches * 2.54;

      weightKgValue =
        pounds * 0.45359237;

    }










    // -----------------------------
    // Metric
    // -----------------------------
    else {

      heightCmValue =
        parseFloat(heightCm.value);

      weightKgValue =
        parseFloat(weightKg.value);

      if (isNaN(heightCmValue) ||
        isNaN(weightKgValue)) {

        clearOutputs();
        return;

      }

    }

    // -----------------------------
    // Mifflin-St Jeor
    // -----------------------------
    let bmr;

    if (sex === "male") {

      bmr =
        (10 * weightKgValue) +
        (6.25 * heightCmValue) -
        (5 * age) +
        5;

    } else {

      bmr =
        (10 * weightKgValue) +
        (6.25 * heightCmValue) -
        (5 * age) -
        161;

    }

    const sedentary = Math.round(bmr * 1.2);

    const lightlyActive = Math.round(bmr * 1.375);

    const moderatelyActive = Math.round(bmr * 1.55);

    const veryActive = Math.round(bmr * 1.725);

    const extremelyActive = Math.round(bmr * 1.9);

    const formattedBmr = formatNumber(bmr);

    result.textContent =
      formattedBmr + " Calories";

    sedentaryOutput.textContent =
      sedentary.toLocaleString() + " Calories";

    lightlyOutput.textContent =
      lightlyActive.toLocaleString() + " Calories";

    moderatelyOutput.textContent =
      moderatelyActive.toLocaleString() + " Calories";

    veryOutput.textContent =
      veryActive.toLocaleString() + " Calories";

    extremelyOutput.textContent =
      extremelyActive.toLocaleString() + " Calories";

    result.dataset.copyValue =
      `BMR: ${formattedBmr}

Sedentary: ${sedentary.toLocaleString()}
Lightly Active: ${lightlyActive.toLocaleString()}
Moderately Active: ${moderatelyActive.toLocaleString()}
Very Active: ${veryActive.toLocaleString()}
Extremely Active: ${extremelyActive.toLocaleString()}`;

  }

  // -------------------------------
  // Mode Events
  // -------------------------------
  imperialMode?.addEventListener(
    "change",
    updateMode
  );

  metricMode?.addEventListener(
    "change",
    updateMode
  );

  // -------------------------------
  // Calculate
  // -------------------------------
  calculateBtn?.addEventListener(
    "click",
    calculateBmr
  );

  // -------------------------------
  // Enter Key
  // -------------------------------
  [
    ageInput,
    heightFeet,
    heightInches,
    weightPounds,
    heightCm,
    weightKg
  ].forEach(input => {

    if (!input) return;

    input.addEventListener(
      "keydown",
      (e) => {

        if (e.key === "Enter") {

          e.preventDefault();
          calculateBmr();

        }

      }
    );

  });

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const value = result.dataset.copyValue;

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      ageInput.value = "";

      sexInput.selectedIndex = 0;

      heightFeet.value = "";
      heightInches.value = "";
      weightPounds.value = "";

      heightCm.value = "";
      weightKg.value = "";

      clearOutputs();

      ageInput.focus();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  imperialMode.checked = true;
  metricMode.checked = false;

  updateMode();

  clearOutputs();

  ageInput.focus();

}


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
  // Calculator Percent Logic
  // -------------------------
  function processPercentages(expr) {

  // Addition
  // 200+10% -> 200+(200*10/100)
  expr = expr.replace(
    /(\d+(\.\d+)?)\+(\d+(\.\d+)?)%/g,
    "$1+($1*$3/100)"
  );

  // Subtraction
  // 200-10% -> 200-(200*10/100)
  expr = expr.replace(
    /(\d+(\.\d+)?)\-(\d+(\.\d+)?)%/g,
    "$1-($1*$3/100)"
  );

  // Multiplication
  // 200*10% -> 200*(10/100)
  expr = expr.replace(
    /(\d+(\.\d+)?)\*(\d+(\.\d+)?)%/g,
    "$1*($3/100)"
  );

  // Division
  // 200/10% -> 200/(10/100)
  expr = expr.replace(
    /(\d+(\.\d+)?)\/(\d+(\.\d+)?)%/g,
    "$1/($3/100)"
  );

  // Standalone percentages LAST
  // 50% -> (50/100)
  expr = expr.replace(
    /(\d+(\.\d+)?)%/g,
    "($1/100)"
  );

  return expr;
}

  // -------------------------
  // Validation
  // -------------------------
  function canAppend(value) {

    if (!expression) {
      if (isOperator(value) && value !== "-") return false;
      if (value === ")") return false;
      if (value === "%") return false;
    }

    const lastChar = expression.slice(-1);

    if (isOperator(value) && isOperator(lastChar)) {
      return false;
    }

    if (isOperator(value) && lastChar === "(" && value !== "-") {
      return false;
    }

    if (value === "(" && /[0-9)%]/.test(lastChar)) {
      return false;
    }

    if (value === "%") {
      if (!/[0-9)]/.test(lastChar)) return false;
    }

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

      if (
        isOperator(value) &&
        isOperator(lastChar)
      ) {
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

      evalExpression = processPercentages(evalExpression);

      if (!/^[0-9+\-*/().%\s]+$/.test(evalExpression)) {
        throw new Error("Invalid characters");
      }

      let result = Function(
        '"use strict"; return (' + evalExpression + ')'
      )();

      if (!isFinite(result)) {
        throw new Error("Math error");
      }

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

    if (key === "%") {

      e.preventDefault();

      if (canAppend("%")) {
        expression += "%";
        updateDisplay();
      }
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

function initPercentageCalculator() {

  const wrapper = document.getElementById("percentage-calculator");

  if (!wrapper) return;

  // -------------------------------
  // Radio Modes
  // -------------------------------
  const percentOfMode = document.getElementById("percent-of-mode");

  const percentTotalMode = document.getElementById("percent-total-mode");

  const percentChangeMode = document.getElementById("percent-change-mode");

  // -------------------------------
  // Field Wrappers
  // -------------------------------
  const percentOfFields = document.getElementById("percent-of-fields");

  const percentTotalFields = document.getElementById("percent-total-fields");

  const percentChangeFields = document.getElementById("percent-change-fields");

  // -------------------------------
  // Inputs
  // -------------------------------
  const percentInput = document.getElementById("percent-input");

  const numberInput = document.getElementById("number-input");

  const valueInput = document.getElementById("value-input");

  const totalInput = document.getElementById("total-input");

  const originalInput = document.getElementById("original-input");

  const newInput = document.getElementById("new-input");

  // -------------------------------
  // Controls
  // -------------------------------
  const calculateBtn = document.getElementById("percent-calculate");

  const copyBtn = document.getElementById("percent-copy");

  const clearBtn = document.getElementById("percent-clear");

  // -------------------------------
  // Outputs
  // -------------------------------
  const result = document.getElementById("percent-result");

  const commentary = document.getElementById("result-commentary");

  // -------------------------------
  // Show Active Mode
  // -------------------------------
  function updateMode() {

    percentOfFields.style.display =
      percentOfMode.checked
        ? "grid"
        : "none";

    percentTotalFields.style.display =
      percentTotalMode.checked
        ? "grid"
        : "none";

    percentChangeFields.style.display =
      percentChangeMode.checked
        ? "grid"
        : "none";

    commentary.style.color = "";

    if (percentChangeMode.checked) {

      commentary.textContent = "-";

    } else {

      commentary.textContent = "";

    }

    // Auto Focus
    if (percentOfMode.checked) {

      percentInput.focus();

    } else if (percentTotalMode.checked) {

      valueInput.focus();

    } else if (percentChangeMode.checked) {

      originalInput.focus();

    }

  }

  percentOfMode?.addEventListener(
    "change",
    updateMode
  );

  percentTotalMode?.addEventListener(
    "change",
    updateMode
  );

  percentChangeMode?.addEventListener(
    "change",
    updateMode
  );

  // -------------------------------
  // Calculate
  // -------------------------------
  function calculatePercentage() {

    let output = "0";
    let commentaryText = "";
    let copyValue = "";

    // -----------------------------
    // Mode 1
    // -----------------------------
    if (percentOfMode.checked) {

      const percent = parseFloat(percentInput.value);

      const number = parseFloat(numberInput.value);

      if (isNaN(percent) ||
        isNaN(number)) {

        result.textContent = "0";
        commentary.textContent = "";
        commentary.style.color = "";
        result.dataset.copyValue = "";

        return;

      }

      const calculated = (percent / 100) * number;

      const rounded = Number.isInteger(calculated)
        ? calculated
        : parseFloat(
          calculated.toFixed(2)
        );

      output =
        rounded.toLocaleString();

      copyValue =
        rounded.toString();

    }




    // -----------------------------
    // Mode 2
    // -----------------------------
    else if (percentTotalMode.checked) {

      const value = parseFloat(valueInput.value);

      const total = parseFloat(totalInput.value);

      if (isNaN(value) ||
        isNaN(total) ||
        total === 0) {

        result.textContent = "0";
        commentary.textContent = "";
        commentary.style.color = "";
        result.dataset.copyValue = "";

        return;

      }

      const calculated = (value / total) * 100;

      const formatted = parseFloat(
        calculated.toFixed(2)
      );

      output =
        formatted + "%";

      copyValue =
        formatted.toString();

    }




    // -----------------------------
    // Mode 3
    // -----------------------------
    else if (percentChangeMode.checked) {

      const original = parseFloat(originalInput.value);

      const newer = parseFloat(newInput.value);

      if (isNaN(original) ||
        isNaN(newer) ||
        original === 0) {

        result.textContent = "0";
        commentary.textContent = "-";
        commentary.style.color = "";
        result.dataset.copyValue = "";

        return;

      }

      const change = ((newer - original) / original) * 100;

      const formatted = parseFloat(
        Math.abs(change).toFixed(2)
      );

      output =
        formatted + "%";

      copyValue =
        formatted.toString();

      if (change > 0) {

        commentaryText = "Increase";
        commentary.style.color = "green";

      } else if (change < 0) {

        commentaryText = "Decrease";
        commentary.style.color = "red";

      } else {

        commentaryText = "No Change";
        commentary.style.color = "";

      }

    }

    if (!percentChangeMode.checked) {

      commentary.style.color = "";

    }

    result.textContent =
      output;

    commentary.textContent =
      commentaryText;

    result.dataset.copyValue =
      copyValue;

  }

  calculateBtn?.addEventListener(
    "click",
    calculatePercentage
  );

  // -------------------------------
  // Enter Key Calculates
  // -------------------------------
  [
    percentInput,
    numberInput,
    valueInput,
    totalInput,
    originalInput,
    newInput
  ].forEach(input => {

    if (!input) return;

    input.addEventListener(
      "keydown",
      (e) => {

        if (e.key === "Enter") {

          e.preventDefault();
          calculatePercentage();

        }

      }
    );

  });

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const valueToCopy = result.dataset.copyValue;

      if (!valueToCopy) return;

      try {

        await navigator.clipboard.writeText(
          valueToCopy
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      percentInput.value = "";
      numberInput.value = "";

      valueInput.value = "";
      totalInput.value = "";

      originalInput.value = "";
      newInput.value = "";

      result.textContent = "0";

      commentary.textContent =
        percentChangeMode.checked
          ? "-"
          : "";

      commentary.style.color = "";

      result.dataset.copyValue = "";

      if (percentOfMode.checked) {

        percentInput.focus();

      } else if (percentTotalMode.checked) {

        valueInput.focus();

      } else if (percentChangeMode.checked) {

        originalInput.focus();

      }

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  percentOfMode.checked = true;
  percentTotalMode.checked = false;
  percentChangeMode.checked = false;

  updateMode();

  result.textContent = "0";
  commentary.textContent = "";
  commentary.style.color = "";

  result.dataset.copyValue = "";

  percentInput.focus();

}


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
    m: { singular: "meter", plural: "meters" },
    km: { singular: "kilometer", plural: "kilometers" },
    cm: { singular: "centimeter", plural: "centimeters" },
    mi: { singular: "mile", plural: "miles" },
    ft: { singular: "foot", plural: "feet" },
    in: { singular: "inch", plural: "inches" },
    g: { singular: "gram", plural: "grams" },
    kg: { singular: "kilogram", plural: "kilograms" },
    lb: { singular: "pound", plural: "pounds" },
    oz: { singular: "ounce", plural: "ounces" },
    c: { singular: "°C", plural: "°C" },
    f: { singular: "°F", plural: "°F" },
    k: { singular: "K", plural: "K" },
    s: { singular: "second", plural: "seconds" },
    min: { singular: "minute", plural: "minutes" },
    hr: { singular: "hour", plural: "hours" },
    day: { singular: "day", plural: "days" },
    l: { singular: "liter", plural: "liters" },
    ml: { singular: "milliliter", plural: "milliliters" },
    cup: { singular: "cup", plural: "cups" },
    gal: { singular: "gallon", plural: "gallons" },
    floz: { singular: "fluid ounce", plural: "fluid ounces" },
    mps: { singular: "m/s", plural: "m/s" },
    kmh: { singular: "km/h", plural: "km/h" },
    mph: { singular: "mph", plural: "mph" },
    knot: { singular: "knot", plural: "knots" }
  };

  const units = {
    length: { units: { m: { name: "Meters", factor: 1 }, km: { name: "Kilometers", factor: 1000 }, cm: { name: "Centimeters", factor: 0.01 }, mi: { name: "Miles", factor: 1609.34 }, ft: { name: "Feet", factor: 0.3048 }, in: { name: "Inches", factor: 0.0254 } } },
    weight: { units: { g: { name: "Grams", factor: 1 }, kg: { name: "Kilograms", factor: 1000 }, lb: { name: "Pounds", factor: 453.592 }, oz: { name: "Ounces", factor: 28.3495 } } },
    temperature: { units: { c: { name: "Celsius" }, f: { name: "Fahrenheit" }, k: { name: "Kelvin" } } },
    time: { units: { s: { name: "Seconds", factor: 1 }, min: { name: "Minutes", factor: 60 }, hr: { name: "Hours", factor: 3600 }, day: { name: "Days", factor: 86400 } } },
    volume: { units: { l: { name: "Liters", factor: 1 }, ml: { name: "Milliliters", factor: 0.001 }, cup: { name: "Cups", factor: 0.236588 }, gal: { name: "Gallons", factor: 3.78541 }, floz: { name: "Fluid Ounces", factor: 0.0295735 } } },
    speed: { units: { mps: { name: "Meters/sec", factor: 1 }, kmh: { name: "Kilometers/hour", factor: 0.277778 }, mph: { name: "Miles/hour", factor: 0.44704 }, knot: { name: "Knots", factor: 0.514444 } } }
  };

  function formatUnit(value, unit) {
    const abs = Math.abs(value);
    const label = unitLabels[unit];
    if (!label) return "";
    return abs === 1 ? label.singular : label.plural;
  }

  function populateUnits(category) {
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
    const unitSet = units[category].units;
    for (let key in unitSet) {
      const option1 = document.createElement("option");
      option1.value = key;
      option1.textContent = unitSet[key].name;
      fromUnit.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = key;
      option2.textContent = unitSet[key].name;
      toUnit.appendChild(option2);
    }
    toUnit.selectedIndex = 1;
    convert();
  }

  function convert() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
      resultFrom.textContent = "-";
      resultDisplay.textContent = "-";
      return;
    }

    const category = categorySelect.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    let result;

    if (category === "temperature") {
      if (from === "c" && to === "f") result = (value * 9 / 5) + 32;
      else if (from === "f" && to === "c") result = (value - 32) * 5 / 9;
      else if (from === "c" && to === "k") result = value + 273.15;
      else if (from === "k" && to === "c") result = value - 273.15;
      else if (from === "f" && to === "k") result = (value - 32) * 5 / 9 + 273.15;
      else if (from === "k" && to === "f") result = (value - 273.15) * 9 / 5 + 32;
      else result = value;
    } else {
      const fromFactor = units[category].units[from].factor;
      const toFactor = units[category].units[to].factor;
      const base = value * fromFactor;
      result = base / toFactor;
    }

    const formatted = result.toFixed(6).replace(/\.?0+$/, "");
    const fromLabel = formatUnit(value, from);
    const toLabel = formatUnit(result, to);

    resultFrom.textContent = value + " " + fromLabel;
    resultDisplay.textContent = formatted + " " + toLabel;
  }

  // -------------------------------
  // Event listeners
  // -------------------------------
  categorySelect.addEventListener("change", function () {
    populateUnits(this.value);
  });
  fromUnit.addEventListener("change", convert);
  toUnit.addEventListener("change", convert);
  inputValue.addEventListener("input", convert);

  swapBtn?.addEventListener("click", function () {
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    convert();
  });

  resetBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    inputValue.value = "";
    resultDisplay.textContent = "-";
    resultFrom.textContent = "-";
    categorySelect.value = "length";
    populateUnits("length");
    inputValue.focus();
  });

  copyBtn?.addEventListener("click", function () {
    navigator.clipboard.writeText(resultDisplay.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(function () {
      copyBtn.textContent = "Copy Result";
    }, 1500);
  });

  // --- PAGE LOAD DEFAULT ---
  categorySelect.value = "length";
  populateUnits("length");

  inputValue.focus();

}


function initBase64Tool() {

  const wrapper = document.getElementById("base64-tool");

  if (!wrapper) return;

  const input = document.getElementById("base-input");

  const output = document.getElementById("base-output");

  const encodeMode = document.getElementById("encode-mode");

  const decodeMode = document.getElementById("decode-mode");

  const convertBtn = document.getElementById("base-convert");

  const copyBtn = document.getElementById("base-copy");

  const clearBtn = document.getElementById("base-clear");

  if (!input ||
    !output ||
    !encodeMode ||
    !decodeMode) return;

  // -------------------------------
  // Convert
  // -------------------------------
  function convertBase64() {

    const value = input.value.trim();

    if (!value) {

      output.textContent = "";
      output.dataset.copyValue = "";
      return;

    }

    try {

      let result = "";

      if (encodeMode.checked) {

        result = btoa(
          unescape(
            encodeURIComponent(value)
          )
        );

      } else {

        result = decodeURIComponent(
          escape(
            atob(value)
          )
        );

      }

      output.textContent = result;
      output.dataset.copyValue = result;

    } catch (err) {

      output.textContent = "Invalid Base64 input";
      output.dataset.copyValue = "";

    }

  }

  // -------------------------------
  // Convert Button
  // -------------------------------
  convertBtn?.addEventListener(
    "click",
    convertBase64
  );

  // -------------------------------
  // Enter Key
  // -------------------------------
  input.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter" &&
        !e.shiftKey) {

        e.preventDefault();
        convertBase64();

      }

    }
  );

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const value = output.dataset.copyValue ||
        output.textContent;

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      input.value = "";
      output.textContent = "";
      output.dataset.copyValue = "";

      encodeMode.checked = true;
      decodeMode.checked = false;

      input.focus();

    }
  );

  // -------------------------------
  // Mode Change
  // -------------------------------
  encodeMode?.addEventListener(
    "change",
    () => {

      output.textcontent = "";
      output.dataset.copyValue = "";

    }
  );

  decodeMode?.addEventListener(
    "change",
    () => {

      output.textContent = "";
      output.dataset.copyValue = "";

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  encodeMode.checked = true;
  decodeMode.checked = false;

  output.dataset.copyValue = "";

  input.focus();

}


function initBdTool() {

  const wrapper = document.getElementById("bd-tool");

  if (!wrapper) return;

  const input = document.getElementById("bd-input");

  const binaryRadio = document.getElementById("binary-to-decimal");
  const decimalRadio = document.getElementById("decimal-to-binary");

  const convertBtn = document.getElementById("bd-convert");

  const output = document.getElementById("bd-output");

  const copyBtn = document.getElementById("bd-copy");
  const clearBtn = document.getElementById("bd-clear");

  if (
    !input ||
    !binaryRadio ||
    !decimalRadio ||
    !convertBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusInput() {
    input.focus();
  }

  function updateMode() {
    resetOutput();
    focusInput();
  }

  function convertValue() {

  const lines = input.value.split("\n");

  if (!lines.length) {
    resetOutput();
    return;
  }

  const results = [];

  // -------------------------------
  // Binary → Decimal
  // -------------------------------
  if (binaryRadio.checked) {

    for (const line of lines) {

      const value = line.trim();

      // Preserve blank lines
      if (!value) {
        results.push("");
        continue;
      }

      if (!/^[01]+$/.test(value)) {
        results.push("Invalid Binary");
        continue;
      }

      results.push(
        parseInt(value, 2).toString()
      );

    }

  }

  // -------------------------------
  // Decimal → Binary
  // -------------------------------
  else {

    for (const line of lines) {

      const value = line.trim();

      // Preserve blank lines
      if (!value) {
        results.push("");
        continue;
      }

      if (!/^\d+$/.test(value)) {
        results.push("Invalid Decimal");
        continue;
      }

      results.push(
        Number(value).toString(2)
      );

    }

  }

  const result =
    results.join("\n");

  output.textContent = result;
  output.dataset.copyValue = result;

  }

  convertBtn.addEventListener(
    "click",
    convertValue
  );

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();
        convertValue();

      }

    }
  );

  binaryRadio.addEventListener(
    "change",
    updateMode
  );

  decimalRadio.addEventListener(
    "change",
    updateMode
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(
          "Copy failed:",
          error
        );

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      resetOutput();

      focusInput();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  binaryRadio.checked = true;
  decimalRadio.checked = false;

  updateMode();

}

function initColorConverter() {

  const wrapper = document.getElementById("color-converter");

  if (!wrapper) return;

  const hexRgbRadio = document.getElementById("color-hex-rgb");
  const rgbHexRadio = document.getElementById("color-rgb-hex");
  const hexHslRadio = document.getElementById("color-hex-hsl");
  const hslHexRadio = document.getElementById("color-hsl-hex");

  const input = document.getElementById("color-input");

  const convertBtn = document.getElementById("color-convert");

  const output = document.getElementById("color-output");

  const copyBtn = document.getElementById("color-copy");
  const clearBtn = document.getElementById("color-clear");

  if (
    !hexRgbRadio ||
    !rgbHexRadio ||
    !hexHslRadio ||
    !hslHexRadio ||
    !input ||
    !convertBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusInput() {
    input.focus();
  }

  function updateMode() {

    resetOutput();

    if (hexRgbRadio.checked) {
      input.placeholder = "#FF0000";
    } else if (rgbHexRadio.checked) {
      input.placeholder = "255, 0, 0";
    } else if (hexHslRadio.checked) {
      input.placeholder = "#FF0000";
    } else if (hslHexRadio.checked) {
      input.placeholder = "0, 100%, 50%";
    }

    focusInput();

  }

  function hexToRgb(hex) {

    hex = hex.replace("#", "").trim();

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(char => char + char)
        .join("");
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return null;
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `${r}, ${g}, ${b}`;

  }

  function rgbToHex(rgb) {

    rgb = rgb.replace(/rgb\s*\(/i, "")
      .replace(/\)/g, "");

    const parts = rgb
      .split(",")
      .map(part => parseInt(part.trim(), 10));

    if (
      parts.length !== 3 ||
      parts.some(value =>
        isNaN(value) ||
        value < 0 ||
        value > 255
      )
    ) {
      return null;
    }

    return (
      "#" +
      parts
        .map(value =>
          value
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
        .toUpperCase()
    );

  }

  function hexToHsl(hex) {

    hex = hex.replace("#", "");

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(char => char + char)
        .join("");
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return null;
    }

    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {

      h = 0;
      s = 0;

    } else {

      const d = max - min;

      s =
        l > 0.5
          ? d / (2 - max - min)
          : d / (max + min);

      switch (max) {

        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        default:
          h = (r - g) / d + 4;

      }

      h /= 6;

    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;

  }

  function hslToHex(hsl) {

    hsl = hsl
      .replace(/hsl\s*\(/i, "")
      .replace(/\)/g, "")
      .replace(/%/g, "");

    const parts = hsl
      .split(",")
      .map(part => Number(part.trim()));

    if (
      parts.length !== 3 ||
      parts.some(value => isNaN(value))
    ) {
      return null;
    }

    let [h, s, l] = parts;

    h /= 360;
    s /= 100;
    l /= 100;

    let r;
    let g;
    let b;

    if (s === 0) {

      r = g = b = l;

    } else {

      const hue2rgb = (p, q, t) => {

        if (t < 0) t += 1;
        if (t > 1) t -= 1;

        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }

        return p;

      };

      const q =
        l < 0.5
          ? l * (1 + s)
          : l + s - l * s;

      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);

    }

    return (
      "#" +
      [r, g, b]
        .map(value =>
          Math.round(value * 255)
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
        .toUpperCase()
    );

  }

  function convert() {

    const lines =
      input.value.split("\n");

    if (!lines.length) {
      resetOutput();
      return;
    }

    const results = [];

    for (const line of lines) {

      const value = line.trim();

      if (!value) {
        results.push("");
        continue;
      }

      let result = null;

      if (hexRgbRadio.checked) {
        result = hexToRgb(value);
      } else if (rgbHexRadio.checked) {
        result = rgbToHex(value);
      } else if (hexHslRadio.checked) {
        result = hexToHsl(value);
      } else if (hslHexRadio.checked) {
        result = hslToHex(value);
      }

      results.push(
        result || "Invalid Color"
      );

    }

    const finalResult =
      results.join("\n");

    output.textContent = finalResult;
    output.dataset.copyValue = finalResult;

  }

  convertBtn.addEventListener(
    "click",
    convert
  );

  [
    hexRgbRadio,
    rgbHexRadio,
    hexHslRadio,
    hslHexRadio
  ].forEach(radio => {

    radio.addEventListener(
      "change",
      updateMode
    );

  });

  input.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        convert();
      }

    }
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent = "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(error);

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      resetOutput();
      focusInput();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------

  hexRgbRadio.checked = true;
  rgbHexRadio.checked = false;
  hexHslRadio.checked = false;
  hslHexRadio.checked = false;

  updateMode();

}

function initHashGenerator() {

  const wrapper = document.getElementById("hash-generator");

  if (!wrapper) return;

  const sha256Radio = document.getElementById("sha-256");
  const sha1Radio = document.getElementById("sha-1");
  const md5Radio = document.getElementById("md5");

  const input = document.getElementById("hash-input");

  const generateBtn = document.getElementById("hash-generate");

  const output = document.getElementById("hash-output");

  const copyBtn = document.getElementById("hash-copy");
  const clearBtn = document.getElementById("hash-clear");

  if (
    !sha256Radio ||
    !sha1Radio ||
    !md5Radio ||
    !input ||
    !generateBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusInput() {
    input.focus();
  }

  function updateMode() {
    resetOutput();
    focusInput();
  }

  async function hashLine(value, algorithm) {

    try {

      const encoder = new TextEncoder();

      const data = encoder.encode(value);

      const hashBuffer =
        await crypto.subtle.digest(
          algorithm,
          data
        );

      const hashArray =
        Array.from(
          new Uint8Array(hashBuffer)
        );

      return hashArray
        .map(byte =>
          byte
            .toString(16)
            .padStart(2, "0")
        )
        .join("");

    } catch {

      return "Invalid Input";

    }

  }

  async function generateHash() {

    const lines =
      input.value.split("\n");

    if (!lines.length) {
      resetOutput();
      return;
    }

    const results = [];

    // -------------------------------
    // MD5
    // -------------------------------
    if (md5Radio.checked) {

      for (const line of lines) {

        const value = line.trim();

        // Preserve blank lines
        if (!value) {
          results.push("");
          continue;
        }

        results.push(
          md5(value)
        );

      }

      const result =
        results.join("\n");

      output.textContent = result;
      output.dataset.copyValue = result;

      return;

    }

    // -------------------------------
    // SHA Algorithms
    // -------------------------------
    let algorithm = "SHA-256";

    if (sha1Radio.checked) {
      algorithm = "SHA-1";
    }

    for (const line of lines) {

      const value = line.trim();

      // Preserve blank lines
      if (!value) {
        results.push("");
        continue;
      }

      const hash =
        await hashLine(
          value,
          algorithm
        );

      results.push(hash);

    }

    const result =
      results.join("\n");

    output.textContent = result;
    output.dataset.copyValue = result;

  }

  generateBtn.addEventListener(
    "click",
    generateHash
  );

  [
    sha256Radio,
    sha1Radio,
    md5Radio
  ].forEach(radio => {

    radio.addEventListener(
      "change",
      updateMode
    );

  });

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();
        generateHash();

      }

    }
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(error);

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      resetOutput();

      focusInput();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  sha256Radio.checked = true;
  sha1Radio.checked = false;
  md5Radio.checked = false;

  updateMode();

}

function initHtmlTool() {

  const wrapper = document.getElementById("html-tool");

  if (!wrapper) return;

  const input = document.getElementById("html-input");

  const encodeRadio = document.getElementById("html-encode");
  const decodeRadio = document.getElementById("html-decode");

  const convertBtn = document.getElementById("html-convert");

  const output = document.getElementById("html-output");

  const copyBtn = document.getElementById("html-copy");
  const clearBtn = document.getElementById("html-clear");

  if (
    !input ||
    !encodeRadio ||
    !decodeRadio ||
    !convertBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusInput() {
    input.focus();
  }

  function updateMode() {
    resetOutput();
    focusInput();
  }

  function encodeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

  }

  function decodeHtml(text) {

    const textarea = document.createElement("textarea");

    textarea.innerHTML = text;

    return textarea.value;

  }

  function convertHtml() {

    const value = input.value;

    if (!value) {

      resetOutput();
      return;

    }

    let result = "";

    if (encodeRadio.checked) {

      result = encodeHtml(value);

    } else {

      result = decodeHtml(value);

    }

    output.textContent = result;
    output.dataset.copyValue = result;

  }

  convertBtn.addEventListener(
    "click",
    convertHtml
  );

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();
        convertHtml();

      }

    }
  );

  encodeRadio.addEventListener(
    "change",
    updateMode
  );

  decodeRadio.addEventListener(
    "change",
    updateMode
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(
          "Copy failed:",
          error
        );

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      resetOutput();

      focusInput();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  encodeRadio.checked = true;
  decodeRadio.checked = false;

  updateMode();

}

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


function initUnixConverter() {

  const timestampField = document.getElementById("unix-timestamp-field");
  const dateField = document.getElementById("unix-date-field");

  const timestampInput = document.getElementById("unix-timestamp-input");
  const dateInput = document.getElementById("unix-date-input");

  const timestampRadio = document.getElementById("unix-timestamp");
  const dateRadio = document.getElementById("unix-date");

  const convertBtn = document.getElementById("unix-convert");
  const output = document.getElementById("unix-output");

  const copyBtn = document.getElementById("unix-copy");
  const clearBtn = document.getElementById("unix-clear");

  if (
    !timestampField ||
    !dateField ||
    !timestampInput ||
    !dateInput ||
    !timestampRadio ||
    !dateRadio ||
    !convertBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function getMode() {
    return timestampRadio.checked ? "timestamp" : "date";
  }

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusActiveInput() {
    if (getMode() === "timestamp") {
      timestampInput.focus();
    } else {
      dateInput.focus();
    }
  }

  function updateMode() {

    timestampField.style.display =
      timestampRadio.checked ? "flex" : "none";

    dateField.style.display =
      dateRadio.checked ? "flex" : "none";

    resetOutput();
    focusActiveInput();

  }

  function convertTimestampToDate() {

    const lines =
      timestampInput.value.split("\n");

    if (!lines.length) {
      resetOutput();
      return;
    }

    const results = [];

    for (const line of lines) {

      const value = line.trim();

      // Preserve blank lines
      if (!value) {
        results.push("");
        continue;
      }

      let timestamp = Number(value);

      if (!Number.isFinite(timestamp)) {
        results.push("Invalid Timestamp");
        continue;
      }

      // 10 digits = seconds
      // 13 digits = milliseconds
      if (Math.abs(timestamp) < 1000000000000) {
        timestamp *= 1000;
      }

      const date = new Date(timestamp);

      if (isNaN(date.getTime())) {
        results.push("Invalid Timestamp");
        continue;
      }

      const localDate = date.toLocaleString(
        undefined,
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit"
        }
      );

      results.push(
        `UTC: ${date.toUTCString()} | Local: ${localDate}`
      );

    }

    const result =
      results.join("\n");

    output.textContent = result;
    output.dataset.copyValue = result;

  }

  function convertDateToTimestamp() {

    const value = dateInput.value;

    if (!value) {
      resetOutput();
      return;
    }

    const timestamp = Math.floor(
      new Date(value).getTime() / 1000
    );

    if (!Number.isFinite(timestamp)) {
      resetOutput();
      return;
    }

    output.textContent = timestamp;
    output.dataset.copyValue = String(timestamp);

  }

  function convert() {

    if (getMode() === "timestamp") {
      convertTimestampToDate();
    } else {
      convertDateToTimestamp();
    }

  }

  function clearCurrentMode() {

    if (getMode() === "timestamp") {
      timestampInput.value = "";
    } else {
      dateInput.value = "";
    }

    resetOutput();
    focusActiveInput();

  }

  convertBtn.addEventListener(
    "click",
    convert
  );

  timestampRadio.addEventListener(
    "change",
    updateMode
  );

  dateRadio.addEventListener(
    "change",
    updateMode
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) {
        return;
      }

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(error);

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    clearCurrentMode
  );

  timestampInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        convert();
      }

    }
  );

  dateInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        convert();
      }

    }
  );

  // -------------------------------
  // Init
  // -------------------------------

  timestampRadio.checked = true;
  dateRadio.checked = false;

  updateMode();

}

function initUrlTool() {

  const wrapper = document.getElementById("url-tool");

  if (!wrapper) return;

  // -------------------------------
  // Elements
  // -------------------------------
  const input = document.getElementById("url-input");

  const output = document.getElementById("url-output");

  const encodeMode = document.getElementById("encode-url");

  const decodeMode = document.getElementById("decode-url");

  const convertBtn = document.getElementById("convert-url");

  const copyBtn = document.getElementById("url-copy");

  const clearBtn = document.getElementById("url-clear");

  if (!input ||
    !output ||
    !encodeMode ||
    !decodeMode) return;

  // -------------------------------
  // Convert
  // -------------------------------
  function convertUrl() {

    const value = input.value.trim();

    if (!value) {

      output.textContent = "";
      output.dataset.copyValue = "";
      return;

    }

    try {

      let result = "";

      if (encodeMode.checked) {

        result = encodeURIComponent(
          value
        );

      } else {

        result = decodeURIComponent(
          value
        );

      }

      output.textContent = result;
      output.dataset.copyValue = result;

    } catch (err) {

      output.textContent =
        "Invalid URL input";

      output.dataset.copyValue = "";

    }

  }

  // -------------------------------
  // Convert Button
  // -------------------------------
  convertBtn?.addEventListener(
    "click",
    convertUrl
  );

  // -------------------------------
  // Enter Key
  // -------------------------------
  input.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter" &&
        !e.shiftKey) {

        e.preventDefault();
        convertUrl();

      }

    }
  );

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const value = output.dataset.copyValue ||
        output.textContent;

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      input.value = "";

      output.textContent = "";
      output.dataset.copyValue = "";

      encodeMode.checked = true;
      decodeMode.checked = false;

      input.focus();

    }
  );

  // -------------------------------
  // Mode Change
  // -------------------------------
  encodeMode?.addEventListener(
    "change",
    () => {

      output.textContent = "";
      output.dataset.copyValue = "";

    }
  );

  decodeMode?.addEventListener(
    "change",
    () => {

      output.textContent = "";
      output.dataset.copyValue = "";

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  encodeMode.checked = true;
  decodeMode.checked = false;

  output.dataset.copyValue = "";

  input.focus();

}


function initUUIDGenerator() {

  const wrapper = document.getElementById("uuid-generator");

  if (!wrapper) return;

  const quantityInput = document.getElementById("quantity-input");
  const generateBtn = document.getElementById("uuid-generate");
  const output = document.getElementById("uuid-output");
  const copyBtn = document.getElementById("uuid-copy");
  const clearBtn = document.getElementById("uuid-clear");

  // -------------------------------
  // Generate UUIDs
  // -------------------------------
  function generateUUIDs() {

    let quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity)) quantity = 1;

    quantity = Math.max(1, Math.min(quantity, 1000));

    quantityInput.value = quantity;

    const uuids = [];

    for (let i = 0; i < quantity; i++) {
      uuids.push(crypto.randomUUID());
    }

    output.textContent = uuids.join("\n");

  }

  // -------------------------------
  // Generate Button
  // -------------------------------
  generateBtn.addEventListener("click", generateUUIDs);

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn.addEventListener("click", async () => {

    if (!output.textContent.trim()) return;

    try {

      await navigator.clipboard.writeText(output.textContent);

      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";

      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 1500);

    } catch (err) {
      console.error("Copy failed:", err);
    }

  });

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn.addEventListener("click", () => {

    output.textContent = "";
    quantityInput.value = 1;
    quantityInput.focus();
    quantityInput.select();

  });

  // -------------------------------
  // Enter Key Generates
  // -------------------------------
  quantityInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
      e.preventDefault();
      generateUUIDs();
    }

  });

  // -------------------------------
  // Init
  // -------------------------------
  quantityInput.value = 1;
  quantityInput.focus();
  quantityInput.select();

}


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


function initQrGenerator() {
  
  const input = document.getElementById("qr-input");
  const generateBtn = document.getElementById("qr-generate");
  const clearBtn = document.getElementById("qr-clear");
  const downloadBtn = document.getElementById("qr-download");
  const output = document.getElementById("qr-output");

  if (
    !input ||
    !generateBtn ||
    !clearBtn ||
    !downloadBtn ||
    !output
  ) {
    return;
  }

  let qrCode = null;

  function clearQr() {
    output.innerHTML = "";
    qrCode = null;
  }

  function generateQr() {
    const text = input.value.trim();

    clearQr();

    if (!text) {
      return;
    }

    qrCode = new QRCode(output, {
      text,
      width: 500,
      height: 500,
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  generateBtn.addEventListener("click", generateQr);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      generateQr();
    }
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearQr();
    input.focus();
  });

  downloadBtn.addEventListener("click", () => {
    const canvas = output.querySelector("canvas");

    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
      return;
    }

    const img = output.querySelector("img");

    if (img && img.src) {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "qr-code.png";
      link.click();
    }
  });

  input.focus();
}

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


function initSlugGenerator() {

  const wrapper = document.getElementById("slug-generator");

  if (!wrapper) return;

  const input = document.getElementById("slug-input");

  const generateBtn = document.getElementById("slug-generate");

  const output = document.getElementById("slug-output");

  const copyBtn = document.getElementById("slug-copy");
  const clearBtn = document.getElementById("slug-clear");

  if (
    !input ||
    !generateBtn ||
    !output ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  const originalCopyText = copyBtn.textContent;

  function resetOutput() {
    output.textContent = "";
    output.dataset.copyValue = "";
  }

  function focusInput() {
    input.focus();
  }

  function createSlug(value) {

    return value
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  }

  function generateSlug() {

    const lines =
      input.value.split("\n");

    if (!lines.length) {
      resetOutput();
      return;
    }

    const results = [];

    for (const line of lines) {

      const value = line.trim();

      // Preserve blank lines
      if (!value) {
        results.push("");
        continue;
      }

      results.push(
        createSlug(value)
      );

    }

    const result =
      results.join("\n");

    output.textContent = result;
    output.dataset.copyValue = result;

  }

  generateBtn.addEventListener(
    "click",
    generateSlug
  );

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();
        generateSlug();

      }

    }
  );

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        output.dataset.copyValue || "";

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalCopyText;

        }, 1500);

      } catch (error) {

        console.error(
          "Copy failed:",
          error
        );

      }

    }
  );

  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      resetOutput();

      focusInput();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  resetOutput();

  focusInput();

}

function initDuplicateLineRemover() {
  
  const input = document.getElementById("dlr-input");
  const output = document.getElementById("dlr-output");

  const removeBtn = document.getElementById("dlr-remove");
  const copyBtn = document.getElementById("dlr-copy");
  const clearBtn = document.getElementById("dlr-clear");

  if (!input || !output || !removeBtn || !copyBtn || !clearBtn) return;

  function removeDuplicates() {
    const lines = input.value.split("\n");
    const uniqueLines = [...new Set(lines)];

    output.textContent = uniqueLines.join("\n");
  }

  removeBtn.addEventListener("click", removeDuplicates);

  copyBtn.addEventListener("click", async () => {
    if (!output.textContent) return;

    await navigator.clipboard.writeText(output.textContent);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    output.textContent = "";
    input.focus();
  });

  input.focus();

}


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

    amountInput.focus();

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
  generateBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    generate();
  });

  paragraphsRadio?.addEventListener("change", updateStartToggle);
  sentencesRadio?.addEventListener("change", updateStartToggle);
  wordsRadio?.addEventListener("change", updateStartToggle);

  // -------------------------
  // Copy
  // -------------------------
  copyBtn?.addEventListener("click", function (e) {
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
  clearBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    amountInput.value = "";
    output.innerHTML = "";

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
  notepad.addEventListener("paste", function (e) {
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
  notepad.addEventListener("keydown", function (e) {
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
  notepad.addEventListener("input", function () {
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
  document.getElementById("copy-btn")?.addEventListener("click", function (e) {
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
    clearBtn.addEventListener("click", function (e) {
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
    link.download = (firstLine ? firstLine.substring(0, 30) : "note") + ".txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    notepad.focus();
  }

  document.getElementById("download-txt")?.addEventListener("click", function (e) {
    e.preventDefault();
    downloadTXT();
  });

  document.getElementById("download-pdf")?.addEventListener("click", function (e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });

    const margin = 72;
    const topMargin = 80;
    const bottomMargin = 80;
    const lineHeight = 16;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin * 2;

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
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      downloadTXT();
    }
  });
}

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
    return text.replace(/\b[a-zA-Z][a-zA-Z']*/g, word => word[0].toUpperCase() + word.slice(1)
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
  upperBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "upper"; applyMode(); });
  lowerBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "lower"; applyMode(); });
  capitalizeBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "capitalize"; applyMode(); });
  sentenceBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "sentence"; applyMode(); });
  alternateBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "alternate"; applyMode(); });
  spacesBtn?.addEventListener("click", e => { e.preventDefault(); currentMode = "spaces"; applyMode(); });

  input.addEventListener("input", applyMode);

  // -------------------------
  // Copy Result
  // -------------------------
  copyBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const value = output.textContent;
    if (!value) return;

    navigator.clipboard.writeText(value);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";

    setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
  });

  // -------------------------
  // Clear
  // -------------------------
  clearBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    input.value = "";
    output.textContent = "";
    currentMode = null;
    input.focus();
  });

  input.focus();

}


function initTextSorter() {
  
  const input = document.getElementById("ts-input");
  const output = document.getElementById("ts-output");

  const removeEmpty = document.getElementById("ts-remove-empty");
  const removeDup = document.getElementById("ts-remove-dup");

  const azBtn = document.getElementById("ts-az");
  const zaBtn = document.getElementById("ts-za");

  const sortBtn = document.getElementById("ts-sort");
  const copyBtn = document.getElementById("ts-copy");
  const clearBtn = document.getElementById("ts-clear");

  if (
    !input ||
    !output ||
    !removeEmpty ||
    !removeDup ||
    !azBtn ||
    !zaBtn ||
    !sortBtn ||
    !copyBtn ||
    !clearBtn
  ) {
    return;
  }

  // -------------------------------
  // Init
  // -------------------------------
  azBtn.checked = true;
  zaBtn.checked = false;

  input.focus();

  // -------------------------------
  // Mode Focus
  // -------------------------------
  azBtn.addEventListener("change", () => {
    input.focus();
  });

  zaBtn.addEventListener("change", () => {
    input.focus();
  });

  // -------------------------------
  // Sort
  // -------------------------------
  sortBtn.addEventListener("click", () => {

    let lines = input.value.split("\n");

    if (removeEmpty.checked) {
      lines = lines.filter(
        line => line.trim() !== ""
      );
    }

    if (removeDup.checked) {
      lines = [...new Set(lines)];
    }

    // Sort alphabetically while
    // keeping empty lines at bottom
    lines.sort((a, b) => {

      const aEmpty =
        a.trim() === "";

      const bEmpty =
        b.trim() === "";

      if (aEmpty && !bEmpty) {
        return 1;
      }

      if (!aEmpty && bEmpty) {
        return -1;
      }

      return a.localeCompare(b);

    });

    if (zaBtn.checked) {
      lines.reverse();
    }

    output.textContent =
      lines.join("\n");

  });

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn.addEventListener(
    "click",
    () => {

      const text =
        output.textContent.trim();

      if (!text) return;

      navigator.clipboard.writeText(
        text
      );

      const originalText =
        copyBtn.textContent;

      copyBtn.textContent =
        "Copied!";

      setTimeout(() => {

        copyBtn.textContent =
          originalText;

      }, 1500);

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn.addEventListener(
    "click",
    () => {

      input.value = "";

      output.textContent = "";

      removeEmpty.checked = false;
      removeDup.checked = false;

      // Preserve active sort mode

      input.focus();

    }
  );

}

function initWordCharCounter() {

  const textInput = document.getElementById("text-input");
  const wordCount = document.getElementById("word-count");
  const charCount = document.getElementById("char-count");
  const charNoSpaces = document.getElementById("char-no-spaces");
  const readingTime = document.getElementById("reading-time");
  const clearButton = document.getElementById("clear-text");
  const copyButton = document.getElementById("copy-text");

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

  // -------------------------------
  // Copy Text
  // -------------------------------
  copyButton.addEventListener("click", function () {

    if (!textInput.value.trim()) return;

    navigator.clipboard.writeText(textInput.value);

    const originalText = copyButton.textContent;
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1500);

  });

  // -------------------------------
  // Clear
  // -------------------------------
  clearButton.addEventListener("click", function () {
    textInput.value = "";
    updateCounts();
    textInput.focus();
  });

  textInput.focus();

}


function initAgeCalculator() {

  const wrapper = document.getElementById("age-calculator");

  if (!wrapper) return;

  const birthDateInput = document.getElementById("birth-date");

  const calculateBtn = document.getElementById("age-calculate");
  const copyBtn = document.getElementById("age-copy");
  const clearBtn = document.getElementById("age-clear");

  const result = document.getElementById("age-result");

  // -------------------------------
  // Calculate Age
  // -------------------------------
  function calculateAge() {

    const birthDateValue = birthDateInput.value;

    if (!birthDateValue) {

      result.textContent = "0 Years";
      result.dataset.copyValue = "";

      return;

    }

    const birthDate = new Date(birthDateValue);
    const today = new Date();

    let years = today.getFullYear() -
      birthDate.getFullYear();

    let months = today.getMonth() -
      birthDate.getMonth();

    let days = today.getDate() -
      birthDate.getDate();

    // -------------------------------
    // Borrow Days
    // -------------------------------
    if (days < 0) {

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
      months--;

    }

    // -------------------------------
    // Borrow Months
    // -------------------------------
    if (months < 0) {

      months += 12;
      years--;

    }

    // -------------------------------
    // Build Display Text
    // -------------------------------
    const parts = [];

    if (years > 0) {
      parts.push(
        `${years} Year${years === 1 ? "" : "s"}`
      );
    }

    if (months > 0) {
      parts.push(
        `${months} Month${months === 1 ? "" : "s"}`
      );
    }

    if (days > 0) {
      parts.push(
        `${days} Day${days === 1 ? "" : "s"}`
      );
    }

    // If age is exactly zero
    if (parts.length === 0) {
      parts.push("0 Years");
    }

    const displayText = parts.join(", ");

    result.textContent = displayText;
    result.dataset.copyValue = displayText;

  }

  // -------------------------------
  // Calculate Button
  // -------------------------------
  calculateBtn.addEventListener(
    "click",
    calculateAge
  );

  // -------------------------------
  // Enter Key
  // -------------------------------
  birthDateInput.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        e.preventDefault();
        calculateAge();

      }

    }
  );

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn.addEventListener(
    "click",
    async () => {

      const valueToCopy = result.dataset.copyValue;

      if (!valueToCopy) return;

      try {

        await navigator.clipboard.writeText(
          valueToCopy
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn.addEventListener(
    "click",
    () => {

      birthDateInput.value = "";

      result.textContent =
        "0 Years";

      result.dataset.copyValue = "";

      birthDateInput.focus();

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  result.textContent = "-";
  result.dataset.copyValue = "";

  birthDateInput.focus();

}


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

  let runningAnimation = null;
  let flashAnimation = null;

  const MAX_SECONDS = 359999; // 99:59:59




  // -------------------------------
  // Helpers
  // -------------------------------
  function formatSeconds(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(sec).padStart(2, '0');
  }

  function setStatus(text) {
    statusText.style.opacity = 0.6;
    statusText.textContent = text;
  }

  function stopTimer() {
    clearInterval(interval);
    isRunning = false;
  }

  function updateDisplay(seconds) {
    remainingSeconds = Math.max(0, Math.min(seconds, MAX_SECONDS));
    display.textContent = formatSeconds(remainingSeconds);
  }

  function startRunningAnimation() {
    stopRunningAnimation();

    let dots = 0;

    runningAnimation = setInterval(() => {
      dots = (dots + 1) % 4;
      statusText.textContent = 'Running' + '.'.repeat(dots) + ' ';
    }, 500);
  }

  function stopRunningAnimation() {
    clearInterval(runningAnimation);
  }

  function startTimesUpFlash() {
    stopTimesUpFlash();

    let visible = true;

    flashAnimation = setInterval(() => {
      statusText.textContent = "Time's Up!";
      statusText.style.opacity = visible ? 1 : 0.3;
      visible = !visible;
    }, 500);
  }

  function stopTimesUpFlash() {
    clearInterval(flashAnimation);
    statusText.style.opacity = 0.6;
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
      // Ready stays visible
    });
  });

  // -------------------------------
  // Start / Resume
  // -------------------------------
  startBtn.addEventListener('click', () => {
    if (isRunning || remainingSeconds <= 0) return;

    stopTimesUpFlash();

    isRunning = true;
    setStatus('Running');
    startRunningAnimation();

    interval = setInterval(() => {
      remainingSeconds--;

      updateDisplay(remainingSeconds);

      if (remainingSeconds <= 0) {
        stopTimer();
        stopRunningAnimation();
        startTimesUpFlash();
      }
    }, 1000);
  });

  // -------------------------------
  // Stop
  // -------------------------------
  stopBtn.addEventListener('click', () => {
    if (!isRunning) return;

    stopTimer();
    stopRunningAnimation();
    setStatus('Paused');
  });

  // -------------------------------
  // Reset
  // -------------------------------
  resetBtn.addEventListener('click', () => {
    stopTimer();
    stopRunningAnimation();
    stopTimesUpFlash();

    remainingSeconds = originalSeconds;

    updateDisplay(originalSeconds);
    setStatus('Ready');
  });

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn.addEventListener('click', () => {
    stopTimer();
    stopRunningAnimation();
    stopTimesUpFlash();

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

function initDateCalculator() {

  const wrapper = document.getElementById("date-calculator");

  if (!wrapper) return;

  // -------------------------------
  // Radio Modes
  // -------------------------------
  const daysBetweenMode = document.getElementById("days-between-mode");

  const dateFromMode = document.getElementById("date-from-mode");

  // -------------------------------
  // Field Wrappers
  // -------------------------------
  const daysBetweenFields = document.getElementById("days-between-fields");

  const dateFromFields = document.getElementById("date-from-fields");

  // -------------------------------
  // Inputs
  // -------------------------------
  const startDate = document.getElementById("start-date");

  const endDate = document.getElementById("end-date");

  const baseDate = document.getElementById("base-date");

  const dateAmount = document.getElementById("date-amount");

  const dateUnit = document.getElementById("date-unit");

  const dateDirection = document.getElementById("date-direction");

  // -------------------------------
  // Controls
  // -------------------------------
  const calculateBtn = document.getElementById("date-calculate");

  const copyBtn = document.getElementById("date-copy");

  const clearBtn = document.getElementById("date-clear");

  const result = document.getElementById("date-result");

  const commentary = document.getElementById("date-commentary");

  // -------------------------------
  // Helpers
  // -------------------------------
  function formatDate(date) {

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  }

  function updateMode() {

    daysBetweenFields.style.display =
      daysBetweenMode.checked ? "grid" : "none";

    dateFromFields.style.display =
      dateFromMode.checked ? "grid" : "none";

  }

  // -------------------------------
  // Radio Events
  // -------------------------------
  daysBetweenMode?.addEventListener(
    "change",
    updateMode
  );

  dateFromMode?.addEventListener(
    "change",
    updateMode
  );

  // -------------------------------
  // Calculate
  // -------------------------------
  function calculateDate() {

    result.dataset.copyValue = "";

    //
    // MODE 1
    // HOW MANY DAYS APART?
    //
    if (daysBetweenMode.checked) {

      if (!startDate.value || !endDate.value) {
        result.textContent = "0";
        commentary.textContent = "";
        return;
      }

      const start = new Date(startDate.value);

      const end = new Date(endDate.value);

      const diffMs = Math.abs(end - start);

      const diffDays = Math.round(
        diffMs / (1000 * 60 * 60 * 24)
      );

      result.textContent =
        diffDays.toLocaleString() +
        (diffDays === 1 ? " Day" : " Days");

      result.dataset.copyValue =
        diffDays.toString();

      const weeks = Math.floor(diffDays / 7);
      const remainingDays = diffDays % 7;
      const hours = diffDays * 24;

      let weekText = "";

      if (weeks > 0) {

        weekText =
          `${weeks.toLocaleString()} Week${weeks === 1 ? "" : "s"}`;

        if (remainingDays > 0) {
          weekText +=
            `, ${remainingDays.toLocaleString()} Day${remainingDays === 1 ? "" : "s"}`;
        }

      } else {

        weekText =
          `${remainingDays.toLocaleString()} Day${remainingDays === 1 ? "" : "s"}`;

      }

      commentary.textContent =
        `${weekText} • ${hours.toLocaleString()} Hours`;

      return;

    }

    //
    // MODE 2
    // WHAT DATE WILL IT BE?
    //
    if (dateFromMode.checked) {

      if (!baseDate.value ||
        dateAmount.value === "" ||
        !dateUnit.value) {

        result.textContent = "0";
        commentary.textContent = "";
        return;

      }

      const date = new Date(baseDate.value);

      let amount = parseInt(dateAmount.value, 10);

      if (isNaN(amount)) {

        result.textContent = "0";
        commentary.textContent = "";
        return;

      }

      if (dateDirection &&
        dateDirection.value === "before") {
        amount = -amount;
      }

      const unit = dateUnit.value;

      const newDate = new Date(date);

      switch (unit) {

        case "days":
          newDate.setDate(
            newDate.getDate() + amount
          );
          break;

        case "weeks":
          newDate.setDate(
            newDate.getDate() + (amount * 7)
          );
          break;

        case "months":
          newDate.setMonth(
            newDate.getMonth() + amount
          );
          break;

        case "years":
          newDate.setFullYear(
            newDate.getFullYear() + amount
          );
          break;

      }

      const formattedDate = formatDate(newDate);

      result.textContent =
        formattedDate;

      result.dataset.copyValue =
        formattedDate;

      const absAmount = Math.abs(amount);

      const direction = amount >= 0
        ? "After"
        : "Before";

      const unitLabel = unit.charAt(0).toUpperCase() +
        unit.slice(1);

      commentary.textContent =
        `${absAmount} ${unitLabel} ${direction} ${formatDate(date)}`;

    }

  }

  // -------------------------------
  // Calculate Button
  // -------------------------------
  calculateBtn?.addEventListener(
    "click",
    calculateDate
  );

  // -------------------------------
  // Enter Key Support
  // -------------------------------
  [
    startDate,
    endDate,
    baseDate,
    dateAmount
  ].forEach(input => {

    if (!input) return;

    input.addEventListener(
      "keydown",
      (e) => {

        if (e.key === "Enter") {

          e.preventDefault();
          calculateDate();

        }

      }
    );

  });

  // -------------------------------
  // Copy
  // -------------------------------
  copyBtn?.addEventListener(
    "click",
    async () => {

      const value = result.dataset.copyValue;

      if (!value) return;

      try {

        await navigator.clipboard.writeText(
          value
        );

        const originalText = copyBtn.textContent;

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            originalText;

        }, 1500);

      } catch (err) {

        console.error(
          "Copy failed:",
          err
        );

      }

    }
  );

  // -------------------------------
  // Clear
  // -------------------------------
  clearBtn?.addEventListener(
    "click",
    () => {

      startDate.value = "";
      endDate.value = "";

      baseDate.value = "";
      dateAmount.value = "";

      if (dateUnit) {
        dateUnit.selectedIndex = 0;
      }

      if (dateDirection) {
        dateDirection.selectedIndex = 0;
      }

      result.textContent = "0";
      commentary.textContent = "-";
      result.dataset.copyValue = "";

      if (daysBetweenMode.checked) {

        startDate.focus();

      } else if (dateFromMode.checked) {

        baseDate.focus();

      }

    }
  );

  // -------------------------------
  // Init
  // -------------------------------
  if (daysBetweenMode) {
    daysBetweenMode.checked = true;
  }

  if (dateFromMode) {
    dateFromMode.checked = false;
  }

  updateMode();

  result.textContent = "0";
  commentary.textContent = "-";
  result.dataset.copyValue = "";

}

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

if (document.getElementById("duplicate-line-remover")) {
  initDuplicateLineRemover();
}

if (document.getElementById("text-sorter")) {
  initTextSorter();
}

if (document.getElementById("uuid-generator")) {
  initUUIDGenerator();
}

if (document.getElementById("percentage-calculator")) {
  initPercentageCalculator();
}

if (document.getElementById("age-calculator")) { 
  initAgeCalculator(); 
}

if (document.getElementById("date-calculator")) { 
  initDateCalculator(); 
}

if (document.getElementById("base64-tool")) {
  initBase64Tool();
}

if (document.getElementById("url-tool")) {
  initUrlTool();
}

if (document.getElementById("bmi-calculator")) {
  initBmiCalculator();
}

if (document.getElementById("bmr-calculator")) {
  initBmrCalculator();
}

if (document.getElementById("qr-generator")) {
  initQrGenerator();
}

if (document.getElementById("unix-converter")) {
  initUnixConverter();
}

if (document.getElementById("color-converter")) {
  initColorConverter();
}

if (document.getElementById("hash-generator")) {
  initHashGenerator();
}

if (document.getElementById("slug-generator")) {
  initSlugGenerator();
}

if (document.getElementById("html-tool")) {
  initHtmlTool();
}

if (document.getElementById("bd-tool")) {
  initBdTool();
}

});
