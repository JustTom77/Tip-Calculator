const billInputContainer = document.getElementById("input");
const peopleInputContainer = document.getElementById("number-of-people-input");
const inputField = document.getElementById("input-field");
const peopleInputField = document.getElementById(
  "number-of-people-input-field"
);
const btn = document.querySelectorAll(
  "div.select-tip-input-container > button"
);
const zeroText = document.getElementById("zero-text");
const btnCustom = document.getElementById("btn-custom");
const tipAmount = document.getElementById("tip-amount");
const tipTotal = document.getElementById("tip-total");
const resetBtn = document.getElementById("reset");

function removeBorder() {
  billInputContainer.style.border = "none";
}

function removeBorderPeople() {
  peopleInputContainer.style.border = "none";
  zeroText.style.display = "none";
}

inputField.addEventListener("focus", () => {
  billInputContainer.style.border = "2px solid hsl(172, 67%, 45%)";

  console.log("focus");
});

peopleInputField.addEventListener("focus", () => {
  peopleInputContainer.style.border = "2px solid #FF4C29";
});

function calculation(bill, people, tipPercent) {
  billProPerson = bill / people;
  console.log("Bill/Person excl. Tip:", parseFloat(billProPerson));
  tipProPerson = (billProPerson / 100) * tipPercent;
  tipProPersonRounded = Math.round((tipProPerson + Number.EPSILON) * 100) / 100;
  console.log("Tip/Person:", tipProPersonRounded);
  tipAmount.innerText = `$${tipProPersonRounded}`;
  billTotalProPerson = billProPerson + tipProPersonRounded;
  billTotalProPersonRounded =
    Math.round((billTotalProPerson + Number.EPSILON) * 100) / 100;
  console.log("Bill/Person incl. Tip:", billTotalProPersonRounded);
  tipTotal.innerText = `$${billTotalProPersonRounded}`;
}

btn.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    let buttonValue = parseInt(e.target.value);
    let numberOfPeople = parseInt(peopleInputField.value);
    inputField.value = inputField.value.replace(/,/g, ".");
    let bill = parseFloat(inputField.value);

    if (numberOfPeople === 0 || peopleInputField.value.length === 0) {
      zeroText.style.display = "inline-block";
    } else {
      calculation(bill, numberOfPeople, buttonValue);
    }
  });
});

function getCustomPercent() {
  let customButtonValue = parseInt(btnCustom.value);
  console.log(customButtonValue);
  let numberOfPeople = parseInt(peopleInputField.value);
  let bill = parseFloat(inputField.value);
  calculation(bill, numberOfPeople, customButtonValue);
}

resetBtn.addEventListener("click", e => {
  e.preventDefault();
  inputField.value = "";
  peopleInputField.value = "";
  tipAmount.innerText = "$0.00";
  tipTotal.innerText = "$0.00";
  resetBtn.style.backgroundColor = "hsl(183, 100%, 20%)";
  resetBtn.style.color = "hsla(183, 90%, 15%, 0.6)";
});
