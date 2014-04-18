var async = require('async');

var NobleDevice = require('noble-device');

var DeviceFactory1 = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

DeviceFactory1.is = function(peripheral) {
  return (peripheral.advertisement.localName === 'df1');
};

NobleDevice.Util.inherits(DeviceFactory1, NobleDevice);
NobleDevice.Util.mixin(DeviceFactory1, NobleDevice.BatteryService);

module.exports = DeviceFactory1;
