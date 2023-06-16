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

const getFakeData = (text) => {
  let val = Alpine.store("data").falso.find((f) => f.text === text);
  return val?.function(val?.config) || "";
};

const insertFalsoBlock = (falsoObj) => {
  console.log(falsoObj.text);
}

const unEscapeCharacters = (str) => {
  // This is necessary to convert characters like &nbsp; to ' ' and &amp; to '&'
  var parser = new DOMParser();
  var parsedHTML = parser.parseFromString(str, "text/html");
  return parsedHTML.documentElement.innerText;
};

const insertData = () => {
  console.log("inserting...");
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
        let foundFuncObj = Alpine.store("data").falso.find((obj) => obj.text == funcTextName);
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
  });
});
