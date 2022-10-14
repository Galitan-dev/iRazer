// Keyboard
export function kbdSetModeNone(internalId: number): void;
export function kbdSetModeSpectrum(internalId: number): void;
export function kbdSetModeStatic(internalId: number): void;
export function kbdSetModeStaticNoStore(internalId: number): void;
export function kbdSetModeWave(internalId: number): void;
export function kbdSetModeReactive(internalId: number): void;
export function kbdSetModeBreathe(internalId: number): void;
export function KbdGetBrightness(internalId: number): number;
export function KbdSetBrightness(internalId: number): void;
export function kbdSetModeStarlight(internalId: number): void;
export function kbdSetModeCustom(internalId: number): void;
export function kbdSetCustomFrame(internalId: number, frame: Uint8Array): void;

// Mouse
export function getBatteryLevel(): void;
export function getChargingStatus(): void;
export function mouseSetLogoModeWave(): void;
export function mouseSetLogoModeStatic(): void;
export function mouseSetLogoModeStaticNoStore(): void;
export function mouseSetLogoModeSpectrum(): void;
export function mouseSetLogoModeReactive(): void;
export function mouseSetLogoModeBreathe(): void;
export function mouseSetLogoModeNone(): void;

export function mouseGetDpi(): void;
export function mouseSetDpi(): void;

export function mouseGetPollRate(): void;
export function mouseSetPollRate(): void;

export function mouseGetBrightness(): void;
export function mouseSetBrightness(): void;
export function mouseGetScrollBrightness(): void;
export function mouseSetScrollBrightness(): void;
export function mouseGetLogoBrightness(): void;
export function mouseSetLogoBrightness(): void;
export function mouseGetLeftBrightness(): void;
export function mouseSetLeftBrightness(): void;
export function mouseGetRightBrightness(): void;
export function mouseSetRightBrightness(): void;

export function mouseDockSetModeNone(): void;
export function mouseDockSetModeBreathe(): void;
export function mouseDockSetModeStatic(): void;
export function mouseDockSetModeStaticNoStore(): void;
export function mouseDockSetModeSpectrum(): void;

export function mouseMatSetModeNone(): void;
export function mouseMatSetModeWave(): void;
export function mouseMatSetModeBreathe(): void;
export function mouseMatSetModeStatic(): void;
export function mouseMatSetModeStaticNoStore(): void;
export function mouseMatSetModeSpectrum(): void;
export function mouseMatSetBrightness(): void;
export function mouseMatGetBrightness(): void;

// Older mouse functions
export function mouseSetLogoLEDEffect(): void;
export function mouseSetLogoLEDRGB(): void;

// Egpu
export function egpuSetModeNone(): void;
export function egpuSetModeBreathe(): void;
export function egpuSetModeStatic(): void;
export function egpuSetModeStaticNoStore(): void;
export function egpuSetModeWave(): void;
export function egpuSetModeSpectrum(): void;

// Headphones
export function headphoneSetModeNone(): void;
export function headphoneSetModeBreathe(): void;
export function headphoneSetModeStatic(): void;
export function headphoneSetModeStaticNoStore(): void;
export function headphoneSetModeSpectrum(): void;

// Accessory
export function accessorySetModeNone(): void;
export function accessorySetModeSpectrum(): void;
export function accessorySetModeStatic(): void;
export function accessorySetModeStaticNoStore(): void;
export function accessorySetModeWave(): void;
export function accessorySetModeBreathe(): void;
export function accessoryGetBrightness(): void;
export function accessorySetBrightness(): void;

// All devices
export function getAllDevices(): Device[];
export function closeAllDevices(): void;

interface Device {
	productId: number;
	internalDeviceId: number;
}
