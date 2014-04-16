var async = require('async');

var DeviceFactory1 = require('./index');

DeviceFactory1.discover(function(df1) {
  console.log('found ' + df1.uuid);

  df1.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connect');
        df1.connect(callback);
      },
      function(callback) {
        console.log('discoverServicesAndCharacteristics');
        df1.discoverServicesAndCharacteristics(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        df1.readDeviceName(function(deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('readBatteryLevel');
        df1.readBatteryLevel(function(batteryLevel) {
          console.log('\tbattery level = ' + batteryLevel);
          callback();
        });
      },
      function(callback) {
        console.log('disconnect');
        df1.disconnect(callback);
      }
    ]
  );
});