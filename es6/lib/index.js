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
            var remainParams = Array.prototype.slice.call(arguments, 1);
            var colorArray = [interpolation('%c[{0}]', channel), `color: ${options.color}`, message].concat(remainParams);
            if (options && options.color) {
                options.color = options.color;
            }
            else {
                options.color = getRandomBit(6, 16);
            }
            console.log.apply(this, colorArray);
        }
        function red(message) {
            var remainParams = Array.prototype.slice.call(arguments, 1).join(' ');
            var colorArray = [interpolation('%c[{0}]', channel), `color: #CA0C16`, message + ' ' + remainParams];
            console.log.apply(this, colorArray);
        }
        return {
            info,
            red
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
