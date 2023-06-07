onmessage = (event) => {
  console.clear();
  Alpine.store("data").nodes =
    event.data.pluginMessage.textElementsSelected;
  let clientStorage = event.data.pluginMessage.clientStorage;
  // TODO: Add in clientStorage option
};

const insertData = function (text) {
  let selectedNodesLength = Alpine.store("data").nodes;
  let data = [];
  for(let x = 0; x < Alpine.store("data").nodes; x++){
    data.push(`${text}-${x}`)
  }
  parent.postMessage(
    { pluginMessage: { type: "add-data", data } },
    "*"
  );
};

const cancel = function () {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};

document.addEventListener("alpine:init", () => {
  Alpine.store("data", {
    text: "Yo",
    nodes: 1,
  });
});