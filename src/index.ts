import { register } from 'tsconfig-paths';
register({ baseUrl: __dirname, paths: {} });

import discoverRazerDevices from 'device/discover';
import { DeviceType, KeyboardMode } from 'types/device';

const keyboards = discoverRazerDevices(DeviceType.Keyboard);
const myKeyboard = keyboards[0];

if (!myKeyboard) throw new Error("Didn't found any keyboard device!");

myKeyboard.setMode(KeyboardMode.Spectrum);
