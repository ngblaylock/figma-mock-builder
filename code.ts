let textElementsSelected = 0;

for (const node of figma.currentPage.selection) {
  if (node.type == 'TEXT') {
    textElementsSelected++;
  }
}

// * Uncomment the following to test new users without clientStorage set
// figma.clientStorage.deleteAsync('mockBuilder').then(res => {
//   console.log("Deleted", res);
// })

figma.clientStorage.getAsync('mockBuilder').then(res => {
  figma.showUI(__html__, {height: 448, width: 448, title: "Mock Builder"});
  figma.ui.postMessage({textElementsSelected, clientStorage: res});
})

figma.ui.onmessage = async (msg) => {  
  if (msg.type === 'add-data') {
    
    const textNodesSelected = msg.data.length;
    figma.clientStorage.setAsync('mockBuilder', msg.clientStorageData)
    for (const node of figma.currentPage.selection) {
      if (node.type == 'TEXT') {        
        const fonts = node.getRangeAllFontNames(0, node.characters.length);
        for (const font of fonts) {
          await figma.loadFontAsync(font);
        }
        node.characters = msg.data.shift();
      }
    }    
    figma.closePlugin(!textNodesSelected? 'Oops! Make sure at least one text layer is selected.' : '');
  }
  if(msg.type === 'cancel'){
    figma.closePlugin();
  }
};
