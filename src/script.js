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
  let val = window.falso.find(f => f.text === text);
  return val?.function(val?.config) || '';
}

const insertData = () => {
  console.log("inserting...");
  let text = document.querySelector(".builder-content").innerText;
  let textArray = []
  for(let i = 0; i < Alpine.store("data").nodes; i++){
    textArray.push(`${getFakeData('Last Name')}, ${getFakeData('First Name')} ${getFakeData('Doesn\'t Exist')} --- ${getFakeData('Integer')}`);
  }
  parent.postMessage({ pluginMessage: { type: "insert data", textArray } }, "*");
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
