import { isIE } from './brower';
import { getRandomBit } from './number';
import { interpolation } from './object';
let INSTANCE = null;
class Utils2js {
    static get getInstance() {
        if (!INSTANCE) {
            INSTANCE = new Utils2js();
        }
        return INSTANCE;
    }
    Logger(channel, options = {}) {
        function info(message) {
            if (isIE) {
                console.log(interpolation('[{0}]', channel), message);
            }
            else {
                if (options && options.color) {
                    options.color = options.color;
                }
                else {
                    options.color = getRandomBit(6, 16);
                }
                console.log(interpolation('%c[{0}]', channel), interpolation('color: {0}', options.color), message);
            }
        }
        return {
            info
        };
    }
    Type(params) {
        const REGEXP = /^\[object\W([a-zA-Z]+)\]$/g;
        const waitingForReg = Object.prototype.toString.call(params);
        const handleResult = REGEXP.exec(waitingForReg);
        return handleResult[1].toLowerCase();
    }
}
const STANCE__UTILS2JS = Utils2js.getInstance;
export const Logger = STANCE__UTILS2JS.Logger;
export const Type = STANCE__UTILS2JS.Type;
