import KeyboardAnimation from 'animation/keyboard';
import {
	kbdSetCustomFrame,
	kbdSetModeCustom,
	kbdSetModeNone,
	kbdSetModeSpectrum
} from 'driver';
import { KeyboardDeviceProperties, KeyboardMode } from 'types/device';
import RazerDevice from './device';

export default class RazerKeyboardDevice extends RazerDevice {
	public rows: number;
	public cols: number;
	public keys: number[][];

	constructor(properties: KeyboardDeviceProperties, internalId: number) {
		super(properties, internalId);
		this.rows = properties.rows;
		this.cols = properties.cols;
		this.keys = this.parseKeys(properties.keys);
	}

	parseKeys(chain: number[]): number[][] {
		const keys: number[][] = [];

		let y = -1;
		for (const key of chain) {
			if (y < 0 || (keys[y] as number[]).length >= this.cols) {
				keys.push([]);
				y++;
			}

			(keys[y] as number[]).push(key);
		}

		return keys;
	}

	setMode(mode: KeyboardMode) {
		switch (mode) {
			case KeyboardMode.Custom:
				return kbdSetModeCustom(this.internalId);
			case KeyboardMode.Spectrum:
				return kbdSetModeSpectrum(this.internalId);
			default:
				return kbdSetModeNone(this.internalId);
		}
	}

	startAnimation<A extends typeof KeyboardAnimation>(
		Animation: A,
		frameRate = 100
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const animation = new (Animation as any)(
			frameRate,
			this.cols,
			this.rows
		) as unknown as KeyboardAnimation;

		animation.start();

		animation.onFrame((frame) => {
			for (const row of frame) {
				kbdSetCustomFrame(this.internalId, row);
			}
			this.setMode(KeyboardMode.Custom);
		});
	}
}
