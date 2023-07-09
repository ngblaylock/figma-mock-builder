"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    setTextNodesLength();
    if (msg.type === "check length") {
        if (!textElementsSelected) {
            figma.notify('No text nodes were selected. Did you select a group or frame instead?');
        }
        else {
            figma.ui.postMessage({ message: "compile data", textElementsSelected });
        }
    }
    else if (msg.type === "insert data") {
        figma.clientStorage.setAsync("mockBuilder", msg.clientStorageData);
        for (const node of figma.currentPage.selection) {
            if (node.type == "TEXT") {
                const fonts = node.getRangeAllFontNames(0, node.characters.length);
                for (const font of fonts) {
                    yield figma.loadFontAsync(font);
                }
                node.characters = msg.insertIntoSelectedTextNodes.pop();
            }
        }
    }
    else if (msg.type === "cancel") {
        figma.closePlugin();
    }
    else {
        figma.notify('An unexpected error occurred.');
    }
});
