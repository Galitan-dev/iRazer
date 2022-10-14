export enum DeviceType {
	Keyboard = 'keyboard'
}

export interface DeviceProperties {
	name: string;
	productId: number;
	type: DeviceType;
}

export interface KeyboardDeviceProperties extends DeviceProperties {
	rows: number;
	cols: number;
}

export enum KeyboardMode {
	Custom,
	Spectrum,
	None
}
