const { readFileSync, readdirSync } = require('fs');
const { resolve } = require('path');
const addon = require('../driver')

class RazerDevice {
    
    constructor(properties, internalId) {
        // this._properties = properties;
        this.name = properties.name;
        this.productId = properties.productId;
        this.type = properties.type;
        this.internalId = internalId;
    }

    static devicesProperties = RazerDevice.discoverDevicesProperties();

    static discoverDevicesProperties() {
        const directory = resolve(__dirname, '../devices');
        const files = readdirSync(directory);
        const devicesProperties = files.map(function (filename) {
            const file = resolve(directory, filename);
            const properties = JSON.parse(readFileSync(file, 'utf8'));
            properties.productId = Number(properties.productId);
            return properties;
        });
        return devicesProperties;
    }

    static razerDevices;

    static discover() {
        if (!this.razerDevices)
        this.razerDevices = addon.getAllDevices().map(function (device) {
            const properties = RazerDevice.devicesProperties.find(({ productId }) => productId === device.productId);
            switch (properties.type) {
                case 'keyboard': return new RazerKeyboardDevice(properties, device.internalDeviceId);
                default: return new RazerDevice(properties, device.internalId);
            }
        });
        
        return this.razerDevices;
    }

}

class RazerKeyboardDevice extends RazerDevice {

    constructor(properties, internalId) {
        super(properties, internalId);
        this.rows = properties.rows;
        this.cols = properties.cols;
    }

    setMode(mode) {
        switch (mode) {
            case 'wave': return addon.kbdSetModeWave(this.internalId, 1); 
            case 'spectrum': return addon.kbdSetModeSpectrum(this.internalId);
            default: return addon.kbdSetModeNone(this.internalId); 
        }
    }

    /**
     * 
     * @returns {RazerKeyboardDevice[]}
     */
    static discover() {
        return super.discover().filter(function (device) { 
            return device.type === 'keyboard';
        });
    }
}

module.exports = RazerDevice;
module.exports.RazerKeyboardDevice = RazerKeyboardDevice;