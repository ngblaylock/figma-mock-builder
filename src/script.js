onmessage = (event) => {
  // console.clear();
  let message = event.data.pluginMessage.message;
  console.info("message", message);
  Alpine.store("data").nodes = event.data.pluginMessage.textElementsSelected;
  if (message === "compile data") {
    insertData();
  }
  let clientStorage = event.data.pluginMessage.clientStorage;
  // TODO: Add in clientStorage option
};

const checkLength = () => {
  console.info("Checking Length...");
  parent.postMessage({ pluginMessage: { type: "check length" } }, "*");
};

const openPopup = () => {
  Alpine.store("data").showInsertTypes = !Alpine.store("data").showInsertTypes;
};

const insertFalsoBlock = (falsoObj) => {
  // Inserts into the builder tab from the selection made
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const span = document.createElement("span");
    span.textContent = falsoObj.text;
    span.setAttribute("contenteditable", "false");
    span.setAttribute("data-function", falsoObj.text);
    const range = selection.getRangeAt(0);
    range.deleteContents();
    if (falsoObj?.userInput?.length) {
      // add in custom inputs
      falsoObj.userInput.forEach((input) => {
        let v = falsoObj.config[input.configModel];
        if (input?.configModel && input?.type !== "select") {
          span.innerHTML += `<input type="${input.type}" name="${
            input.configModel
          }" id=${"u" + Math.random().toString(26).slice(2)} placeholder="${v}" />`;
        } else if (input?.configModel && input?.type === "select") {
          // add in select here
        } else if (input?.text) {
          span.innerHTML += input.text;
        }
      });
    }
    range.insertNode(span);

    // Create an empty text node
    const emptyTextNode = document.createTextNode("\u00A0");
    span.parentNode.insertBefore(emptyTextNode, span.nextSibling);

    // Set the cursor right after the empty text node
    const newRange = document.createRange();
    newRange.setStartAfter(emptyTextNode);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  Alpine.store("data").showInsertTypes = false;
};

const insertData = () => {
  console.info("inserting...");

  const unEscapeCharacters = (str) => {
    // This is necessary to convert characters like &nbsp; to ' ' and &amp; to '&'
    var parser = new DOMParser();
    var parsedHTML = parser.parseFromString(str, "text/html");
    return parsedHTML.documentElement.innerText;
  };

  let builderContent = document.querySelector(".builder-content").innerHTML;
  var tempElement = document.createElement("div");
  tempElement.innerHTML = builderContent;
  var childNodes = tempElement.childNodes;

  let insertTemplate = [];

  for (var i = 0; i < childNodes.length; i++) {
    let node = childNodes[i];
    if (node.nodeName === "#text") {
      // simply add in the text
      insertTemplate.push(node.nodeValue);
    } else if (
      node.nodeName === "SPAN" &&
      node.getAttribute("contenteditable") == "false"
    ) {
      // add the falso data with it's config values
      let dataFunction = node.getAttribute("data-function");
      let falsoObj = JSON.parse(
        JSON.stringify(Alpine.store("data").falso)
      ).find((f) => f.text === dataFunction);
      [...node.querySelectorAll("input")].forEach((input) => {
        // Something prevents getting the value with input.value, so this is how you get it.
        let inputVal = document.getElementById(input.getAttribute("id")).value;
        // convert to number if that is what it expects
        input.getAttribute("type") === "number"
          ? (inputVal = parseFloat(inputVal))
          : null;
        falsoObj.config[input.getAttribute("name")] =
          inputVal || falsoObj.config[input.getAttribute("name")];
      });
      // This is pushing the items as an array to template for each text node.
      insertTemplate.push(falsoObj);
    }
  }

  // For each node selected in Figma, we need to apply the template
  let insertIntoSelectedTextNodes = [];
  for (let i = 0; i < Alpine.store("data").nodes; i++) {
    // compiling the template for each text node
    let generatedTemplateString = ''
    insertTemplate.forEach(item => {
      if(typeof(item) === 'string'){
        generatedTemplateString += item;
      }
      else{
        // This should be the dynamic data as an object
        let falsoObj = Alpine.store('data').falso.find(f => item.text === f.text)
        generatedTemplateString += falsoObj.function(item.config)
      }
    })
    insertIntoSelectedTextNodes.push(generatedTemplateString);
  }
  parent.postMessage(
    { pluginMessage: { type: "insert data", insertIntoSelectedTextNodes } },
    "*"
  );
};

const cancel = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};

document.addEventListener("alpine:init", () => {
  Alpine.store("data", {
    showInsertTypes: false,
    openTab: "Builder",
    nodes: 1,
    search: "",
    falso: [],
    get categorizedFalso() {
      let category = [];
      this.falso.forEach((f) => {
        if (f.text.toLowerCase().includes(this.search.toLowerCase())) {
          const foundCategoryIndex = category.findIndex((c) => {
            return c.category === f.category;
          });
          foundCategoryIndex < 0
            ? category.push({ category: f.category, functions: [f] })
            : category[foundCategoryIndex].functions.push(f);
        }
      });
      return category;
    },
  });
});

window.addEventListener("load", function () {
  const textBox = document.querySelector(".builder-content");
  textBox.focus();
  const range = document.createRange();
  range.selectNodeContents(textBox);
  range.collapse(false); // Set the range to the end
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
});
