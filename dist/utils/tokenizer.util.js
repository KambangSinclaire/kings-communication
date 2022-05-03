"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
const jwt = require("jsonwebtoken");
class Tokenizer {
    static verifyToken({ token, secret }) {
        let decodedData = {};
        try {
            decodedData = jwt.verify(token, secret);
            return { status: true, data: Object.assign({}, decodedData) };
        }
        catch (error) {
            return {
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            };
        }
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.util.js.map