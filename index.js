var async = require('async');

var NobleDevice = require('noble-device');

var TEST_SERVICE_UUID = 'aa60';
var LED_UUID          = 'aa62';

var DeviceFactory1 = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

DeviceFactory1.is = function(peripheral) {
  return (peripheral.advertisement.localName === 'df1');
};

NobleDevice.Util.inherits(DeviceFactory1, NobleDevice);
NobleDevice.Util.mixin(DeviceFactory1, NobleDevice.BatteryService);
NobleDevice.Util.mixin(DeviceFactory1, NobleDevice.DeviceInformationService);

DeviceFactory1.prototype.setLed = function(red, green, blue, callback) {
  var value = 0x00;

  if (red) {
    value |= 0x01;
  }

  if (green) {
    value |= 0x02;
  }

  if (blue) {
    value |= 0x04;
  }

  this.writeDataCharacteristic(TEST_SERVICE_UUID, LED_UUID, new Buffer([value]), callback);
};

module.exports = DeviceFactory1;
