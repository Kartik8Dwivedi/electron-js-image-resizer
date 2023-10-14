const { app, BrowserWindow } = require('electron')
const path = require('path') 

// for nodemon we have inbuilt electronmon package which helps us in automatic refresh of the app

const isDev = process.env.NODE_ENV !== 'production'

function createWindow () {
    const mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev? 1000 : 500,
        height: 600,
    })

    // ? Open devtools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}


// app.on('ready', () => {}) //* Callback function method
// app.whenReady().then(createWindow) //* Promise method

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

