const { default: SIL } = require("system-input");
const addon = require("../driver");
const { RazerKeyboardDevice } = require("./device");
const sil = new SIL(SIL.DebugMode.None);

sil.start();

const keyboards = RazerKeyboardDevice.discover();

const myKeyboard = keyboards[0];
myKeyboard.setMode('spectrum')