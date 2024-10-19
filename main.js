const fs = require('fs');
const { program } = require('commander');

program
    .requiredOption('-i, --input <path>', 'Path to input file')
    .option('-o, --output <path>', 'Path to output file')
    .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

let inputData;
try {
    const data = fs.readFileSync(options.input);
    inputData = JSON.parse(data);
} 
catch (error) {
    console.error('Error reading file:', error);
    process.exit(1);
}

if (options.output) {
    try {
        fs.writeFileSync(options.output, JSON.stringify(inputData, null, 1));
        console.log(`Result written to ${options.output}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

if (options.display) {
    console.log('Result:', inputData);
}