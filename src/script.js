onmessage = (event) => {
  // console.clear();
  let message = event.data.pluginMessage.message;
  console.log("message", message);
  Alpine.store("data").nodes = event.data.pluginMessage.textElementsSelected;
  if (message === "compile data") {
    insertData();
  }
  let clientStorage = event.data.pluginMessage.clientStorage;
  // TODO: Add in clientStorage option
};

const checkLength = () => {
  console.log("Checking Length...");
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
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    // Create an empty text node
    const emptyTextNode = document.createTextNode("\u00A0");
    console.log(span.nextSibling);
    span.parentNode.insertBefore(emptyTextNode, span.nextSibling);

    // Set the cursor right after the empty text node
    const newRange = document.createRange();
    newRange.setStartAfter(emptyTextNode);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  console.log(falsoObj.text);
  Alpine.store("data").showInsertTypes = false;
};

const insertData = () => {
  console.log("inserting...");

  const unEscapeCharacters = (str) => {
    // This is necessary to convert characters like &nbsp; to ' ' and &amp; to '&'
    var parser = new DOMParser();
    var parsedHTML = parser.parseFromString(str, "text/html");
    return parsedHTML.documentElement.innerText;
  };

  let builderContent = document.querySelector(".builder-content").innerHTML;
  let builderArray = builderContent.replace(
    /<span contenteditable="false">(.*?)<\/span>/g,
    "|>falso|>|>$1|>falso"
  );
  builderArray = builderArray.split("|>falso");

  let insertIntoSelectedTextNodes = [];
  for (let i = 0; i < Alpine.store("data").nodes; i++) {
    let textNodeBuiltData = [];
    builderArray.forEach((str) => {
      if (str.startsWith("|>|>")) {
        let funcTextName = str.replace("|>|>", "");
        let foundFuncObj = Alpine.store("data").falso.find(
          (obj) => obj.text == funcTextName
        );
        if (foundFuncObj) {
          textNodeBuiltData.push(foundFuncObj.function(foundFuncObj.config));
        }
      } else {
        textNodeBuiltData.push(unEscapeCharacters(str));
      }
    });
    insertIntoSelectedTextNodes.push(textNodeBuiltData.join(""));
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
