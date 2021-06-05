const { ipcRenderer } = require("electron");

export const runCommand = (launchable) =>
  ipcRenderer.send("run-cmd", launchable);
