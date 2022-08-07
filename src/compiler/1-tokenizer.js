const WHITESPACE    = /\s/;
const NUMBER        = /[0-9]/;
const LETTERS       = /[a-z]/i;
const OPERATOR      = /[+-]/;


module.exports = function (input) {
    const tokens = [];

    let curr = 0;
    while(curr < input.length) {
        let char = input[curr];

        if(WHITESPACE.test(char)) {
            curr++; 
            continue;
        }

        if(OPERATOR.test(char)) {
            tokens.push({ type: 'Operator', val: char });
            curr++;
            continue;
        }

        if(NUMBER.test(char)) {
            let num = '';
            while(NUMBER.test(char)) {
                num += char;
                char = input[++curr];
            }
            tokens.push({ type: 'Number', val: num });
            continue;
        }

        if(LETTERS.test(char)) {
            let val = '';
            while(LETTERS.test(char)) {
                val += char;
                char = input[++curr];
            }
            tokens.push({ type: 'Identifier', val });
            continue;
        }

        if(char === '(' || char === ')') {
            if(char === '(') {
                tokens.push({ type: 'OpenParenToken' });
            }
            else tokens.push({ type: 'CloseParenToken' });
            curr++;
            continue;
        }

        throw new SyntaxError(`Unexpected token: ${char}`);
    }

    return tokens;
}