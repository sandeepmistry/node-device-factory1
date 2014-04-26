var async = require('async');

var NobleDevice = require('noble-device');

var TEST_SERVICE_UUID          = 'aa60';
var LED_UUID                   = 'aa62';

var ACCELEROMETER_SERVICE_UUID = 'aa10';
var ACCELEROMETER_CONFIG_UUID  = 'aa11';
var ACCELEROMETER_ENABLE_UUID  = 'aa12';
var ACCELEROMETER_DATA8_UUID   = 'aa13';

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

DeviceFactory1.prototype.writeAccelerometerServiceDataCharacteristic = function(uuid, data, callback) {
  this.writeDataCharacteristic(ACCELEROMETER_SERVICE_UUID, uuid, data, callback);
};

DeviceFactory1.prototype.writeAccelerometerConfigData = function(data, callback) {
  this.writeAccelerometerServiceDataCharacteristic(ACCELEROMETER_CONFIG_UUID, data, callback);
};

DeviceFactory1.prototype.writeAccelerometerEnableData = function(data, callback) {
  this.writeAccelerometerServiceDataCharacteristic(ACCELEROMETER_ENABLE_UUID, data, callback);
};

DeviceFactory1.prototype.enableAccelerometer = function(callback) {
  this.writeAccelerometerConfigData(new Buffer('00', 'hex'), function() {
    this.writeAccelerometerEnableData(new Buffer('01', 'hex'), callback);
  }.bind(this));
};

DeviceFactory1.prototype.disableAccelerometer = function(callback) {
  this.writeAccelerometerEnableData(new Buffer('00', 'hex'), callback);
};

DeviceFactory1.prototype.convertAccelerometerData = function(data, callback) {
  var x = data.readInt8(0) / 64.0;
  var y = data.readInt8(1) / 64.0;
  var z = data.readInt8(2) / 64.0;

  callback(x, y, z);
};

DeviceFactory1.prototype.onAccelerometerDataChange = function(data) {
  this.convertAccelerometerData(data, function(x, y, z) {
    this.emit('accelerometerChange', x, y, z);
  }.bind(this));
  // console.log('onAccelerometerDataChange: ' + data.toString('hex'));
};

DeviceFactory1.prototype.notifyAccelerometer = function(callback) {
  this.notifyCharacteristic(ACCELEROMETER_SERVICE_UUID, ACCELEROMETER_DATA8_UUID, true, this.onAccelerometerDataChange.bind(this), callback);
};

DeviceFactory1.prototype.unnotifyAccelerometer = function(callback) {
  this.notifyCharacteristic(ACCELEROMETER_SERVICE_UUID, ACCELEROMETER_DATA8_UUID, false, this.onAccelerometerDataChange.bind(this), callback);
};

module.exports = DeviceFactory1;
