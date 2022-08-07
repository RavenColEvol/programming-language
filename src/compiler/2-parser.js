module.exports = function(tokens) {
    const program = { body: [] };
    
    let curr = 0;
    while (curr < tokens.length) {
        program.body.push(parse());
    }

    function parse() {
        const token = tokens[curr];

        if(token.type == 'Number') {
            const next = tokens[curr + 1];
            if(next.type != 'Operator') {
                return parseNumericLiteral(token);
            } else {
                return parseBinaryExpression(token, next);
            }
        }

        if(token.type == 'Identifier') {
            return parseCallExpression(token);
        }
    }

    function parseNumericLiteral(token) {
        curr++;
        return { type: 'Number', val: token.val};
    }

    function parseBinaryExpression(token, operator) {
        const left = parseNumericLiteral(token);
        curr++;
        const right = parse();
        return { type: 'BinaryExpression', left, operator, right };
    }

    function parseCallExpression(token) {
        const identifier = token;
        curr++;
        if(tokens[curr]?.type != 'OpenParenToken') {
            throw new SyntaxError('Identifier must followed by (');
        }
        curr++;
        const args = parse();

        if(tokens[curr]?.type != 'CloseParenToken') {
            throw new SyntaxError('Call expressions terminate with )');
        }
        curr++;
        return { type: 'CallExpression', identifier, args };
    }

    return program;
}