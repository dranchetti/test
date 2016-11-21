#!/usr/bin/env node
'use strict';
var spsave = require("spsave").spsave;
var fs = require("fs");

var args = process.argv.slice(2);

var BASEPATH_SP_PATH = '/Style Library/TJG/',
    BASEPATH_SP_JS = BASEPATH_SP_PATH + '_js',
    BASEPATH_SP_CSS = BASEPATH_SP_PATH + '_css';

switch (args[3]) {
    case 'js':        
        saveToSp(BASEPATH_SP_JS, args[4], args[5]);     
        break;
    case 'css':
        saveToSp(BASEPATH_SP_CSS, args[4], args[5]); 
        break;
    default:
        console.log('Sorry, that is not something I know how to do.');
 }

function saveToSp(BASEPATH_SP_FOLDER, BASEPATH_DEST_FILE, FILE) {
    console.log('File ' + FILE + ' is uploading...');

    spsave({
        siteUrl: args[0],
        username: args[1],
        password: args[2],
        folder: BASEPATH_SP_FOLDER,
        fileName: FILE,
        fileContent: fs.readFileSync(BASEPATH_DEST_FILE + "/" + FILE)    
    })
    .then(function(data){
        console.log('File ' + FILE + ' uploaded!');
    })
    .catch(function(err){
        console.log('Error occurred');
    });
}
