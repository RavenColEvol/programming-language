const fs = require('fs/promises');

const compiler = require('./compiler/5-compiler');

async function main() {
    let args = process.argv.slice(2);
    
    const filename = args[0];
    let input = '';
    try {
        input = await fs.readFile(filename, 'utf-8');
    } catch(e) {
        console.error(`Unable to access file: ${filename}`);
        throw e;
    }

    compiler(input);
}

main();