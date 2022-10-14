import { kbdSetModeCustom, kbdSetModeNone, kbdSetModeSpectrum } from 'driver';
import { KeyboardDeviceProperties, KeyboardMode } from 'types/device';
import RazerDevice from './device';

export default class RazerKeyboardDevice extends RazerDevice {
	public rows: number;
	public cols: number;

	constructor(properties: KeyboardDeviceProperties, internalId: number) {
		super(properties, internalId);
		this.rows = properties.rows;
		this.cols = properties.cols;
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

	/* 	startAnimation(callback: () => [][]) {
		setInterval(() => {
			const rows = callback();
			for (const [y, row] of rows.entries()) {
				const frame = new Uint8Array(
					[y, 0, this.cols - 1, row].flat(2)
				);
				kbdSetCustomFrame(this.internalId, frame);
			}
			this.setMode(KeyboardMode.Custom);
		}, 100);
	} */
}
