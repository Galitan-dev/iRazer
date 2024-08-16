import { register } from 'tsconfig-paths';
register({ baseUrl: __dirname, paths: {} });

import KeyboardAnimation from 'animation/keyboard';
import discoverRazerDevices from 'device/discover';
import SIListener from 'system-input';
import { DeviceType } from 'types/device';
import { KeyboardFrame } from 'types/animation';
import tinyColor from 'tinycolor2';

const keyboards = discoverRazerDevices(DeviceType.Keyboard);
const myKeyboard = keyboards[0];

if (!myKeyboard) throw new Error("Didn't found any keyboard device!");

class Impact {
	static currentHue = 95;

	public frameCount = 0;
	public hue = (Impact.currentHue = (Impact.currentHue + 10) % 100);

	constructor(public startX: number, public startY: number) {}

	get isEnded() {
		return this.frameCount > 20;
	}

	render(frame: KeyboardFrame): KeyboardFrame {
		const extent = Math.floor(this.frameCount);
		const row = frame[this.startY] ?? [];
		for (let dx = extent - 2; dx <= extent; dx++) {
			if (dx < 0) continue;
			row[this.startX + dx] = tinyColor(
				`hsv(${this.hue + extent * 3}%, 100%, 100%)`
			);
			row[this.startX - dx] = tinyColor(
				`hsv(${this.hue + extent * 3}%, 100%, 100%)`
			);
		}

		this.frameCount++;
		return frame;
	}
}

const sil = new SIListener();

let impacts: Impact[] = [];

sil.on('keydown', (event: KeyboardEvent) => {
	for (let y = 0; y < myKeyboard.rows; y++) {
		for (let x = 0; x < myKeyboard.cols; x++) {
			if (myKeyboard.keys[y]?.[x] == event.keyCode) {
				impacts.push(new Impact(x, y));
			}
		}
	}
});
myKeyboard.startAnimation(
	class extends KeyboardAnimation {
		render(frame: KeyboardFrame): KeyboardFrame {
			for (const row of frame) {
				for (let x = 0; x < row.length; x++) {
					row[x] = tinyColor('hsv(20%, 100%, 20%)');
				}
			}

			for (const impact of impacts) {
				frame = impact.render(frame);
			}

			impacts = impacts.filter((impact) => !impact.isEnded);

			return frame;
		}
	},
	50
);

sil.start();
