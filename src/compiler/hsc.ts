enum TokenType {
    Identifier,
    OpPlus,
    OpMinus,
    OpMultiply,
    OpDivide,
    Number,
    Semicolon
};


type Token = {
    type: TokenType,
    value: string
};

const tokenize = (remaining: string): Array<Token> => {
    if (remaining.length === 0)
        return []

    const char = remaining[0];
    switch (char) {
        case " ":
            return tokenize(remaining.slice(1));
        case ";":
            return [{ type: TokenType.Semicolon, value: char }, ...tokenize(remaining.slice(1))];
        case "+":
            return [{ type: TokenType.OpPlus, value: char }, ...tokenize(remaining.slice(1))];
        case "-":
            return [{ type: TokenType.OpMinus, value: char }, ...tokenize(remaining.slice(1))];
        case "/":
            return [{ type: TokenType.OpDivide, value: char }, ...tokenize(remaining.slice(1))];
        case "*":
            return [{ type: TokenType.OpMultiply, value: char }, ...tokenize(remaining.slice(1))];
    }

    if (/\d/.test(char)) {
        let value = char
        let i = 1;
        while (/\d/.test(remaining[i])) {
            value += remaining[i];
            i++;
        }

        return [{ type: TokenType.Number, value }, ...tokenize(remaining.slice(i))]
    } else if (/[a-zA-Z_]/.test(char)) {
        let value = char
        let i = 1;
        while (/[a-zA-Z0-9_]/.test(remaining[i])) {
            value += remaining[i];
            i++;
        }

        return [{ type: TokenType.Identifier, value }, ...tokenize(remaining.slice(i))]
    }

    return tokenize(remaining.slice(1));
};

const tokens = tokenize("x = 5; y = 5; z = x + y * 3;");
console.log(tokens)
