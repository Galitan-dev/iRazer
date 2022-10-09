const { default: SIL } = require("system-input");

const sil = new SIL(SIL.DebugMode.Keyboard);

sil.start();