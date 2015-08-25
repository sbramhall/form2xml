/**
 * Created by sbramhall on 7/21/15.
 */
// get the system platform using node.js

var
    os = require('os'),
    fs = require('fs'),
    gui = require('nw.gui');
gui.Window.get().show();
var logMsg = "No errors.";
var okToExit;
var mainWindow = gui.Window.get();
var where = 'output/stuff.txt';


var windowMenu = new gui.Menu({type : 'menubar'});
windowMenu.createMacBuiltin('Susan' + "'" + 's App'
    /*,{
     hideEdit: true,
     hideWindow: true
     }*/
);

var fileSubmenu = new gui.Menu();

var fileMenu = new gui.MenuItem({
    label: 'File',
    submenu : fileSubmenu
});

windowMenu.append(fileMenu);
fileMenu.submenu.append(new gui.MenuItem({ label:'Open'}));
fileMenu.submenu.append(new gui.MenuItem({ label:'New'}));
fileMenu.submenu.append(new gui.MenuItem({ label:'Save'}));

mainWindow.menu = windowMenu;

fs.writeFile(where, 'Goodbye cruel World! at ' + Date(), function (err) {

if (err) {
    document.getElementById("first").innerHTML = 'Error running app.js';
logMsg = err;
}
else {

    document.getElementById("first").innerHTML = 'This computer is running: ' + os.platform() + " and io.js version " + process.version;
    document.getElementById("second").innerHTML = 'App wrote ' + where;
}
console.log(logMsg);
console.log(JSON.stringify(fileSubmenu));

document.getElementById('menu').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    fileMenu.popup(ev.x, ev.y);
    return false;
});

    mainWindow.on('minimize', function() {
        okToExit = window.confirm("Exit application?");
        if (okToExit === true) {
            gui.App.closeAllWindows();
        }
    });
});



