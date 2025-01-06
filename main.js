const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

process.on('uncaughtException', (error) => {
    console.error("Unexpected error: ", error);
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1315,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
        // Mantener el marco para conservar los botones de cerrar, minimizar y maximizar
        frame: true,
        icon: path.join(__dirname, 'public/ABOUT ME.png'),
    });


    win.loadURL('http://localhost:5173'); // Cambia esto si tu puerto es diferente

    Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});