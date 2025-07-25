// functions for converting to ascii
// write modular code!

const { intToRGBA } = require("jimp");

var ASCII_CHARS = [" ", ".", "-", "'", ":", "_", ",", "^", "=", ";", ">", "<", "+", 
    "!", "r", "c", "*", "/", "z", "?", "s", "L", "T", "v", ")", "J", "7", "(", "|", "F", 
    "i", "{", "C", "}", "f", "I", "3", "1", "t", "l", "u", "[", "n", "e", "o", "Z", "5", 
    "Y", "x", "j", "y", "a", "]", "2", "E", "S", "w", "q", "k", "P", "6", "h", "9", "d", 
    "4", "V", "p", "O", "G", "b", "U", "A", "K", "X", "H", "m", "8", "R", "D", "#", "$", 
    "B", "g", "0", "M", "N", "W", "Q", "%", "&", "@"];
ASCII_CHARS = ASCII_CHARS.reverse();

/*
const DARKNESSES = [0, 0.0751, 0.0829, 0.0848, 0.1227, 0.1403, 0.1559, 0.185, 0.2183, 0.2417, 
    0.2571, 0.2852, 0.2902, 0.2919, 0.3099, 0.3192, 0.3232, 0.3294, 0.3384, 0.3609, 0.3619, 
    0.3667, 0.3737, 0.3747, 0.3838, 0.3921, 0.396, 0.3984, 0.3993, 0.4075, 0.4091, 0.4101, 0.42, 
    0.423, 0.4247, 0.4274, 0.4293, 0.4328, 0.4382, 0.4385, 0.442, 0.4473, 0.4477, 0.4503, 0.4562, 
    0.458, 0.461, 0.4638, 0.4667, 0.4686, 0.4693, 0.4703, 0.4833, 0.4881, 0.4944, 0.4953, 0.4992, 
    0.5509, 0.5567, 0.5569, 0.5591, 0.5602, 0.5602, 0.565, 0.5776, 0.5777, 0.5818, 0.587, 0.5972, 
    0.5999, 0.6043, 0.6049, 0.6093, 0.6099, 0.6465, 0.6561, 0.6595, 0.6631, 0.6714, 0.6759, 0.6809, 
    0.6816, 0.6925, 0.7039, 0.7086, 0.7235, 0.7302, 0.7332, 0.7602, 0.7834, 0.8037, 0.9999];
*/
const NUM_CHARS = 5;
const outputWidth = 50;

function getCharSubset() {
    // TODO: implement darkness based subset creation
    const jump = Math.trunc((ASCII_CHARS.length-1) / NUM_CHARS);
    let charset = [];
    for (let i = 0; i/jump < NUM_CHARS; i += jump) {
        charset.push(ASCII_CHARS[i]);   // from lightest to darkest
    }
    return charset;
}

function RGBAToChar(rgba, charset) {
    let luminance = 0.2126 * rgba.r + 0.7152 * rgba.g + 0.0722 * rgba.b;
    return charset[Math.trunc(luminance / (255/(NUM_CHARS-1)))]
}   

async function generateAscii(image) {
    image.contrast(0.5);
    const aspectRatio = image.bitmap.height / image.bitmap.width;
    const height = Math.floor(outputWidth * aspectRatio * 0.55);
    image.resize({w: outputWidth, h: height});
    const charset = getCharSubset();
    let txt = "";
    image.scan((x, y, idx) => {
        let char = RGBAToChar(intToRGBA(image.getPixelColor(x, y)), charset)
        txt += char;
        if (x == outputWidth - 1) { txt += "\n"; }
    });
    return txt;
}

module.exports = {generateAscii}
