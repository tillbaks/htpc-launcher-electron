const { app, BrowserWindow, ipcMain, session, shell } = require("electron");
const path = require("path");
const url = require("url");

const fetch = require("cross-fetch");

const isDev = require("electron-is-dev");

// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

let isExiting = false;

let win;
function createWindow() {
  // Create the browser window with node integration
  win = new BrowserWindow({
    title: "HTPC Startpage",
    frame: false,
    fullscreen: false,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open the DevTools only if app is in development
  // If in production, don't show.
  //if (isDev) win.webContents.openDevTools();

  win.on("closed", () => {
    if (!isExiting) createWindow();
  });

  ipcMain.on("run-cmd", (e, service) => {
    console.log("Running command " + service.name);

    const { spawn } = require("child_process");
    const bat = spawn(service.cmd, service.args, { cwd: service.cwd });

    bat.stdout.on("data", (data) => {
      console.log(data.toString());
      // Handle data...
    });

    bat.stderr.on("data", (err) => {
      console.log(err.toString());
      // Handle error...
    });

    bat.on("exit", (code) => {
      console.log(code);
      // Handle exit
    });
  });

  ipcMain.on("exit", (e, service) => {
    isExiting = true;
    app.quit();
  });
}

app.whenReady().then(async () => {
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  createWindow();
});

/*
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
*/
