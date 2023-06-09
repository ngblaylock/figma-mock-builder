const fs = require("fs");
const watch = require("node-watch");
const chalk = require("chalk");
const sass = require("sass");
const files = [
  "./node_modules/alpinejs/dist/cdn.min.js",
  "./build-ui/script.js",
  "./build-ui/style.scss",
  "./build-ui/body.html",
];
const watchFolder = "./build-ui/";

const getFiles = function (file) {
  let ext = file.split(".").pop();
  if (ext == "scss") {
    return new Promise((resolve, reject) => {
      try {
        const result = sass.compile(file, {style: "compressed"});
        resolve(`<style>\n${result.css}\n</style>`);
      } catch (err) {
        reject("Sass didn't compile correctly: " + err);
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        // compile
        if (ext == "js") {
          resolve(`<script>\n${data}\n</script>`);
        } else if (ext == "css") {
          resolve(`<style>\n${data}\n</style>`);
        } else {
          resolve(`${data}`);
        }
      });
    });
  }
};

const generateUi = function () {
  const promises = files.map((f) => getFiles(f));
  Promise.all(promises)
    .then((res) => {
      fs.writeFile(`./ui.html`, res.join("\n\n"), (err) => {
        if (err) {
          console.error("Can't generate file: ", err);
          return;
        }
        console.log(chalk.green("ui.html created!"));
      });
    })
    .catch((err) => {
      console.log(chalk.red("Error:", err));
    });
};

generateUi();

console.log(chalk.yellow(`👉  Watching files in ${watchFolder} ...`));
watch(
  watchFolder,
  {
    recursive: true,
    delay: 1000,
  },
  function (evt, name) {
    console.log("%s changed.", name);
    generateUi();
  }
);
