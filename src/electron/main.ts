    import {app, BrowserWindow, Menu, Tray} from 'electron';
    import path from 'path';
    import { ipcMainHandle, isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import {  getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';

Menu.setApplicationMenu(null);

app.on("ready",() =>{
    const mainWindow = new BrowserWindow({
        webPreferences:{
            preload:getPreloadPath(),
        }
    });
        
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }else{
            mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
        }
        
        pollResources(mainWindow);
        
        ipcMainHandle('getStaticData', () => {
            return getStaticData();
        });
        createTray(mainWindow);
        handleCloseEvents(mainWindow);
        createMenu(mainWindow);
    });


    function handleCloseEvents(mainWindow:BrowserWindow){
        let willClose = false;

        mainWindow.on('close',(e) => {
            if(willClose){
                return;
            }
            e.preventDefault();
            mainWindow.hide();
            if(app.dock){
                app.dock.hide();
            }
        });

        app.on("before-quit",() => {
            willClose = true;
        });

        mainWindow.on('show',()=>{
            willClose = false;
        });

    }