const fs = require('fs');
const {program} = require('commander');
program 
    .option('-i, --input <path>', 'Path to input file')
    .option('-o, --output <path>', 'Path to output file') 
    .option('-d, --display', 'Display result in console'); 

program.parse(process.argv); 

const options = program.opts();

if (!options.input) { 
    console.error('Please, specify input file'); 
    process.exit(1); } 
    
if (!fs.existsSync(options.input)) { 
    console.error('Cannot find input file'); 
    process.exit(1); }  

let inputData; 

try { 
    const data = fs.readFileSync(options.input); 
    inputData = JSON.parse(data); } 
catch (error) {
    console.error('Error reading file:', error);
    process.exit(1); }

function findMinReserve(data) {
    let minReserve = data[0];
    for (const item of data) {
        if (item.value < minReserve.value) {
             minReserve = item; } 
            } 
    return minReserve; } 
const minReserve = findMinReserve(inputData);  
const result = `${minReserve.txt}:${minReserve.value}`; 

if (options.output) {
    try { 
        fs.writeFileSync(options.output, result);
        console.log(`Result written to ${options.output}`); } 
    catch (error) { 
        console.error('Error writing to file:', error); } 
    } 

if (options.display) {
    console.log('Result:', result); }