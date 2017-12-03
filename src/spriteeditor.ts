import * as electron from "electron";
import * as Graphic from './graphic';
//import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

class SpriteDocument{
  private spr: Graphic.Sprite|null;
  private filename: string;
  private isDirty: boolean;

  constructor(opt:any) {
    this.spr = null;
    this.filename = '';
    this.isDirty = false;
    if (opt) {
      if (opt.sprite) {
        this.spr = opt.sprite;
      }else if (opt.filename) {
      }
    }
  }
}

let win:electron.BrowserWindow|undefined;

const menuTemplate:object[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          if(win) electron.dialog.showOpenDialog(win, {}, () => { });
        }
      }
      , {
        label: 'Quit',
        click: () => {
          electron.app.quit();
        }
      }
    ]
  }
];

function createWindow() {
  const menu = electron.Menu.buildFromTemplate(menuTemplate);
  electron.Menu.setApplicationMenu(menu);
  win = new electron.BrowserWindow({ width: 800, height: 600 });
  win.loadURL(url.format({
    pathname: ('../static/spriteEditor.html'),
    protocol: 'file',
    slashes:true
  }));
  win.on('closed', () => {
    win = undefined;
  });
}

electron.app.on('ready', createWindow);
electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});