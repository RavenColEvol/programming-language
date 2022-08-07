const tokenizer = require("./1-tokenizer");
const parser = require('./2-parser');
const emitter = require("./3-emitter");
const interpreter = require("./4-interpreter");

module.exports = function(input) {
    const tokens = tokenizer(input);
    const ast    = parser(tokens);
    const js     = emitter(ast);
    interpreter(js);
}