const { app, BrowserWindow } = require('electron');
const path = require('path')
const { autoUpdater } = require('electron-updater')

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
autoUpdater.autoRunAppAfterInstall = true


let mainWin;

autoUpdater.setFeedURL({
    provider: "generic"
})
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
autoUpdater.autoRunAppAfterInstall = true

autoUpdater.on('checking-for-update', () => {
    // Güncellemeler kontrol ediliyor

    dialog.showMessageBox({
        type: 'info',
        title: 'Güncelleme mevcut',
        message: 'Yeni bir güncelleme mevcut. Güncellemeyi indirmek ve uygulamayı yeniden başlatmak ister misiniz?',
        buttons: ['Evet', 'Hayır']
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
            // Kullanıcı evet butonuna bastı, güncellemeyi indir ve uygulamayı yeniden başlat
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-available', (info) => {
    // Yeni bir güncelleme mevcut

    dialog.showMessageBox({
        type: 'info',
        title: 'Güncelleme mevcut',
        message: 'Yeni bir güncelleme mevcut. Güncellemeyi indirmek ve uygulamayı yeniden başlatmak ister misiniz?',
        buttons: ['Evet', 'Hayır']
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
            // Kullanıcı evet butonuna bastı, güncellemeyi indir ve uygulamayı yeniden başlat
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-not-available', (info) => {
    // Güncelleme mevcut değil
    dialog.showMessageBox({
        type: 'info',
        title: 'Güncelleme mevcut değil',
        message: 'Güncelleme mevcut değil. En son sürümü kullanıyorsunuz.',
        buttons: ['Tamam']
    });
});

autoUpdater.on('download-progress', (progressObj) => {
    // İndirme ilerlemesi
    log.info('Updates downloading...')
});

autoUpdater.on('update-downloaded', (info) => {
    // Güncelleme indirildi, uygulamayı yeniden başlatmak için kullanıcıya bildirim gösterilebilir

    dialog.showMessageBox({
        type: 'info',
        title: 'Güncelleme indirildi',
        message: 'Güncelleme indirildi. Uygulamayı yeniden başlatmak ister misiniz?',
        buttons: ['Evet', 'Hayır']
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
            // Kullanıcı evet butonuna bastı, uygulamayı yeniden başlat
            autoUpdater.quitAndInstall();
        }
    });

});

autoUpdater.on('error', (err) => {
    // Güncelleme sırasında bir hata oluştu

    dialog.showErrorBox('Hata', 'Güncelleme sırasında bir hata oluştu: ' + err);
});



function createMainWindow(){
    mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        modal: true
    })

    mainWin.loadFile(
        path.join(__dirname, 'main.html')
    )

    mainWin.setTitle(`Auto updater ${app.getVersion()}`)
    mainWin.on('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify()
    })
}



app.whenReady().then(() => {
    
    autoUpdater.checkForUpdatesAndNotify()
    console.log('Checking for updates...')
    createMainWindow()
}).catch((err) => {
    console.log(err)
})