import { getAllDevices } from 'driver';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { DeviceType } from 'types/device';
import RazerKeyboardDevice from './keyboard';

export default function discoverRazerDevices<T extends DeviceType>(type: T) {
	const constructor = {
		[DeviceType.Keyboard]: RazerKeyboardDevice
	}[type];

	const devicesProperties = discoverDevicesProperties();

	return getAllDevices().map((device) => {
		const properties = devicesProperties
			.filter((p) => p.type === type)
			.find(({ productId }) => productId === device.productId);

		return new constructor(properties, device.internalDeviceId);
	});
}

export function discoverDevicesProperties() {
	const directory = resolve(__dirname, '../../res/devices');
	const files = readdirSync(directory);
	const devicesProperties = files.map(function (filename) {
		const file = resolve(directory, filename);
		const properties = JSON.parse(readFileSync(file, 'utf8'));
		properties.productId = Number(properties.productId);
		return properties;
	});
	return devicesProperties;
}
