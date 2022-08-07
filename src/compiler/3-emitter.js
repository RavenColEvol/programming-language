module.exports = function(program) {
    const output = [];
    for(const node of program.body) {
        output.push(emit(node));
    }
    return output.join('\n');

    function emit(node) {
        switch(node.type) {
            case 'Number':
                return emitNumericLiteral(node);
            case 'BinaryExpression':
                return emitBinaryExpression(node);
            case 'CallExpression':
                return emitCallExpression(node);
        }
    }

    function emitNumericLiteral(node) {
        return node.val;
    }

    function emitBinaryExpression(node) {
        return `${emit(node.left)} ${node.operator.val} ${emit(node.right)}`;
    }

    function emitCallExpression(node) {
        if(node.identifier.val == 'log') {
            return `console.log(${emit(node.args)})`
        } else {
            throw new SyntaxError(`Unkown Identifier: ${node.identifier}`);
        }
    }
}