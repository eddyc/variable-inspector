const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";

let mainWindow;

const installExtensions = async () => {
    const installer = require("electron-devtools-installer");
    const forceDownload = typeof process.env.UPGRADE_EXTENSIONS !== "undefined";
    const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

    return Promise.all(
        extensions.map(name =>
            installer.default(installer[name], forceDownload)
        )
    ).catch(console.log);
};

const createWindow = async () => {
    if (process.argv.indexOf("--noDevServer") === -1) {
        await installExtensions();
    }
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        },
        title: "variable-inspector"
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    if (isDev) {
        // Open the DevTools.
        // BrowserWindow.addDevToolsExtension('<location to your react chrome
        // extension>');
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
