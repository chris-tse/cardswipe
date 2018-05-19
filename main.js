const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let secondWindow;

function createWindow() {
  // Create the browser window.
  if (process.platform === 'darwin') 
    mainWindow = new BrowserWindow({
      titleBarStyle: 'hiddenInset',
      width: 1281,
      height: 800,
      minWidth: 1281,
      minHeight: 800,
      backgroundColor: '#312450',
      show: false,
      icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    });
  else 
    mainWindow = new BrowserWindow({
      frame: false,
      width: 1281,
      height: 800,
      minWidth: 1281,
      minHeight: 800,
      backgroundColor: '#312450',
      icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    });
  
  secondWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    parent: mainWindow
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  secondWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'windows', 'ipcwindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  mainWindow.show();

  require('./menu/mainmenu');
}



ipcMain.on('open-second-window', (event, arg) => {
  secondWindow.show()
})

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

console.log(process.type)