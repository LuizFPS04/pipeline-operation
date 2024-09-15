import * as path from 'path';

import { applyBubble } from "./techiniques/bubbleTechinique";
import { applyForwading } from './techiniques/forwardingTechnique';
import { readFile, writeFile, getTestFiles } from "./utils/loadFile";


const directory = path.resolve(__dirname, './docs');
const directoryDestiny = path.resolve(__dirname, './doc-parsed');
const files = getTestFiles(directory);

files.forEach(file => {
    console.log(`\nReading file: ${file}`);
    const instructions = readFile(path.join(directory, file));
    if (file.includes('01') || file.includes('02')) {
        const bubble = applyBubble(instructions);
        const outputFileName = file.replace('.txt', '-RESULTADO.txt');
        writeFile(path.join(directoryDestiny, outputFileName), bubble);
    } else if (file.includes('03') || file.includes('04')) {
        const foewading = applyForwading(instructions);
        const outputFileName = file.replace('.txt', '-RESULTADO.txt');
        writeFile(path.join(directoryDestiny, outputFileName), foewading);
    /* } else if (file.includes('05') || file.includes('06') || file.includes('07')) {
        const reordering = applyReordering(instructions);
        const outputFileName = file.replace('.txt', '-RESULTADO.txt');
        writeFile(path.join(directoryDestiny, outputFileName), reordering);
    } else if (file.includes('09') || file.includes('10')) {
        const allMethods = applyAll(instructions);
        const outputFileName = file.replace('.txt', '-RESULTADO.txt');
        writeFile(path.join(directoryDestiny, outputFileName), allMethods); */
    } else {
        console.log(`File ${file} is empty or not exists`);
    }
})