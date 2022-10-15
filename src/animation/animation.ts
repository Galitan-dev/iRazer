import EventEmitter from 'events';

export default abstract class Animation<F, F2 = F> extends EventEmitter {
	public frameRate: number;
	public frameCount = 0;
	public loop: NodeJS.Timer | undefined;

	constructor(frameRate: number) {
		super();
		this.frameRate = frameRate;
	}

	start() {
		if (this.loop) return;

		this.loop = setInterval(() => {
			this.frameCount += 1;
			const frame = this.makeRender();

			this.emit('frame', frame);
		}, this.frameRate);
	}

	stop() {
		if (!this.loop) return;

		clearInterval(this.loop);
		this.loop = undefined;
	}

	onFrame(callback: (frame: F) => void) {
		this.addListener('frame', callback);
	}

	makeRender(): F {
		return this.render() as unknown as F;
	}

	abstract render(...args: unknown[]): F2;
}
