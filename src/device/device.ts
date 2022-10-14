import { DeviceProperties, DeviceType } from 'types/device';

export default class RazerDevice {
	public name: string;
	public productId: number;
	public type: DeviceType;
	public internalId: number;

	constructor(properties: DeviceProperties, internalId: number) {
		this.name = properties.name;
		this.productId = properties.productId;
		this.type = properties.type;
		this.internalId = internalId;
	}
}
