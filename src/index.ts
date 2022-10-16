import { register } from 'tsconfig-paths';
register({ baseUrl: __dirname, paths: {} });

import { KeyboardAnimationPerKey } from 'animation/keyboard';
import discoverRazerDevices from 'device/discover';
import SIListener, { KeyboardEvent } from 'system-input';
import tinycolor, { Instance as Color } from 'tinycolor2';
import { DeviceType } from 'types/device';

const keyboards = discoverRazerDevices(DeviceType.Keyboard);
const myKeyboard = keyboards[0];

if (!myKeyboard) throw new Error("Didn't found any keyboard device!");

const sil = new SIListener();
let pressedKeys: number[] = [];

sil.on('keydown', (event: KeyboardEvent) => {
	pressedKeys.push(event.keyCode);
});

sil.on('keyup', (event: KeyboardEvent) => {
	pressedKeys = pressedKeys.filter((key) => key !== event.keyCode);
});

myKeyboard.startAnimation(
	class extends KeyboardAnimationPerKey {
		renderKey(x: number, y: number): Color {
			const pressed = pressedKeys.includes(myKeyboard.keys[y]?.[x] ?? -1);
			if (pressed) return tinycolor('hsv(50%, 100%, 100%)');
			else return tinycolor('hsv(20%, 100%, 100%)');
		}
	}
);

sil.start();
