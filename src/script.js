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

const insertData = () => {
  console.log("inserting...");
  let text = document.querySelector(".builder-content").innerText;
  parent.postMessage({ pluginMessage: { type: "insert data", text } }, "*");
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
