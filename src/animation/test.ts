import tinyColor, { Instance as Color } from 'tinycolor2';
import { KeyboardAnimationPerKey } from './keyboard';

export default class KeyboardTestAnimation extends KeyboardAnimationPerKey {
	renderKey(x: number): Color {
		return tinyColor(
			`hsv(${
				(Date.now() / 20 - (x / this.cols) * 100) % 100
			}%, 100%, 100%)`
		);
	}
}
