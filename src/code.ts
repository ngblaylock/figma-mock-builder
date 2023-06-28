let textElementsSelected = 0;

const setTextNodesLength = () => {
  textElementsSelected = 0;
  for (const node of figma.currentPage.selection) {
    if (node.type == "TEXT") {      
      textElementsSelected++;
    }
  }
};

// * Uncomment the following to test new users without clientStorage set
// figma.clientStorage.deleteAsync('mockBuilder').then(res => {
//   console.info("Deleted", res);
// })

figma.clientStorage.getAsync("mockBuilder").then((res) => {
  setTextNodesLength();
  figma.showUI(__html__, { height: 448, width: 448, title: "Mock Builder" });
  figma.ui.postMessage({
    message: "initialize",
    textElementsSelected,
    clientStorage: res,
  });
});

figma.ui.onmessage = async (msg) => {
  setTextNodesLength();  
  if (msg.type === "check length") {
    if (!textElementsSelected) {
      figma.closePlugin(
        "No text nodes were selected. Did you select a group or frame instead?"
      );
    } else {
      figma.ui.postMessage({ message: "compile data", textElementsSelected });
    }
  }  
  else if (msg.type === "insert data") {
    figma.clientStorage.setAsync("mockBuilder", msg.clientStorageData);
    for (const node of figma.currentPage.selection) {
      if (node.type == "TEXT") {
        const fonts = node.getRangeAllFontNames(0, node.characters.length);
        for (const font of fonts) {
          await figma.loadFontAsync(font);
        }
        node.characters = msg.insertIntoSelectedTextNodes.pop();
      }
    }
  }
  else if (msg.type === "cancel") {
    figma.closePlugin();
  }
  else{
    figma.closePlugin('An unexpected error occurred.')
  }
};
