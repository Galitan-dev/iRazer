const { default: SIL } = require("system-input");
const { RazerKeyboardDevice } = require("./device");
const tinyColor = require("tinycolor2");

const sil = new SIL(SIL.DebugMode.All);
sil.start();

const keyboards = RazerKeyboardDevice.discover();

const myKeyboard = keyboards[0];

myKeyboard.startAnimation(function () {
    return Array(myKeyboard.rows).fill()
        .map((_, y) =>
            Array(myKeyboard.cols).fill()
                .map((_, x) => Object.values(tinyColor(`hsv(${(Date.now() / 1000 - x / myKeyboard.cols - y / myKeyboard.rows) % 2 * 50}%, 100%, 100%)`).toRgb()).slice(0, 3))
        );
})