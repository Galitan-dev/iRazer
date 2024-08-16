import tinyColor, { Instance as Color } from 'tinycolor2';
import { FlatKeyboardFrame, KeyboardFrame } from 'types/animation';
import Animation from './animation';

export default abstract class KeyboardAnimation extends Animation<
	FlatKeyboardFrame,
	KeyboardFrame
> {
	public cols: number;
	public rows: number;

	constructor(frameRate: number, cols: number, rows: number) {
		super(frameRate);
		this.cols = cols;
		this.rows = rows;
	}

	override makeRender(): FlatKeyboardFrame {
		const base = Array(this.rows)
			.fill(null)
			.map(() =>
				Array(this.cols)
					.fill(null)
					.map(() => tinyColor('#000'))
			);

		const frame = this.render(base);

		for (let y = 0; y < this.rows; y++) {
			frame[y] =
				frame[y]?.filter((_, x) => x >= 0 && x < this.cols) ?? [];
		}

		const flatFrame: FlatKeyboardFrame = frame.map(
			(row, y) =>
				new Uint8Array(
					[
						y,
						0,
						this.cols - 1,
						row.map((c) => Object.values(c.toRgb()).slice(0, 3))
					].flat(2)
				)
		);

		return flatFrame;
	}

	abstract override render(frame: KeyboardFrame): KeyboardFrame;
}

export abstract class KeyboardAnimationPerKey extends KeyboardAnimation {
	render(frame: KeyboardFrame): KeyboardFrame {
		return frame.map((row, y) => row.map((_, x) => this.renderKey(x, y)));
	}

	abstract renderKey(x: number, y: number): Color;
}
