import { register } from 'tsconfig-paths';
register({ baseUrl: __dirname, paths: {} });

import KeyboardExampleAnimation from 'animation/example';
import discoverRazerDevices from 'device/discover';
import SIListener, { KeyboardEvent } from 'system-input';
import { DeviceType } from 'types/device';

const keyboards = discoverRazerDevices(DeviceType.Keyboard);
const myKeyboard = keyboards[0];

if (!myKeyboard) throw new Error("Didn't found any keyboard device!");

myKeyboard.startAnimation(KeyboardExampleAnimation);

const sil = new SIListener();
const keys = [
	[
		53, -1, 122, 120, 99, 118, 96, 97, 98, 100, -1, 101, 109, 103, 111, 105,
		107, 113
	],
	[10, 18, 19, 20, 21, 23, 22, 26, 28, 25, 29, 27, 24, 51, 51, 114, 115, 116],
	[48, 48, 12, 13, 14, 15, 17, 16, 32, 34, 31, 35, 33, 30, 36, 117, 119, 121],
	[57, 57, 0, 1, 2, 3, 5, 4, 38, 40, 37, 41, 39, 42, 36, -1, -1, -1],
	[56, 50, 6, 7, 8, 9, 11, 45, 46, 43, 47, 44, 60, 60, 60, -1, 126, -1],
	[59, 61, 55, 49, 49, 49, 49, 49, 49, 49, 61, -1, 110, 62, -1, 123, 125, 124]
];
let pressedKeys: number[] = [];

sil.on('keydown', (event: KeyboardEvent) => {
	pressedKeys.push(event.keyCode);
	printKeys();
});

sil.on('keyup', (event: KeyboardEvent) => {
	pressedKeys = pressedKeys.filter((key) => key !== event.keyCode);
	printKeys();
});

const magenta = '\x1b[35m';
const reset = '\x1b[0m';

function printKeys() {
	console.log(
		'\n\n\n' +
			keys
				.map(
					(r) =>
						r
							.map(
								(k) =>
									(pressedKeys.includes(k)
										? magenta
										: reset) + (k < 0 ? '      ' : '##### ')
							)
							.join('') +
						'\n' +
						r
							.map(
								(k) =>
									(pressedKeys.includes(k)
										? magenta
										: reset) + (k < 0 ? '      ' : '##### ')
							)
							.join('')
				)
				.join('\n')
				.replace(/([#\s]{15})$/gm, '   $1')
				.replace(/^(.+)$/m, '')
				.replace(/^(.+)$/m, '$1\n$1\n')
	);
}

sil.start();

printKeys();
