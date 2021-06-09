const { ipcRenderer } = require("electron");

let listener;

export const setListener = l => {
  listener = l;
};
export const removeListener = l => {
  if (listener === l) {
    listener = undefined
  }
};

export const runCommand = (launchable) =>
  ipcRenderer.send("run-cmd", launchable);

ipcRenderer.on("run-cmd-exit", (event, service) => {
  console.log(service.name + " stopped running")
});

ipcRenderer.on("window-focus", () => {
  if (listener) {
    listener("focus")
  }
})
ipcRenderer.on("window-blur", () => {
  if (listener) {
    listener("blur")
  }
})