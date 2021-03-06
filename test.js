var async = require('async');

var DeviceFactory1 = require('./index');

DeviceFactory1.discover(function(df1) {
  console.log('found ' + df1.uuid);

  df1.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  df1.on('accelerometerChange', function(x, y, z) {
    console.log('accelerometerChange: x = %s, y = %s, z = %s', x.toFixed(1), y.toFixed(1), z.toFixed(1));
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
        console.log('readModelNumber');
        df1.readModelNumber(function(modelNumber) {
          console.log('\tmodel name = ' + modelNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readSerialNumber');
        df1.readSerialNumber(function(serialNumber) {
          console.log('\tserial name = ' + serialNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readFirmwareRevision');
        df1.readFirmwareRevision(function(firmwareRevision) {
          console.log('\tfirmware revision = ' + firmwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readHardwareRevision');
        df1.readHardwareRevision(function(hardwareRevision) {
          console.log('\thardware revision = ' + hardwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readSoftwareRevision');
        df1.readSoftwareRevision(function(softwareRevision) {
          console.log('\tsoftware revision = ' + softwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readManufacturerName');
        df1.readManufacturerName(function(manufacturerName) {
          console.log('\tmanufacturer name = ' + manufacturerName);
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
        console.log('setLed - red');
        df1.setLed(true, false, false, function() {
          setTimeout(callback, 1000);
        });
      },
      function(callback) {
        console.log('setLed - green');
        df1.setLed(false, true, false, function() {
          setTimeout(callback, 1000);
        });
      },
      function(callback) {
        console.log('setLed - blue');
        df1.setLed(false, false, true, function() {
          setTimeout(callback, 1000);
        });
      },
      function(callback) {
        console.log('setLed - off');
        df1.setLed(false, false, false, callback);
      },
      function(callback) {
        console.log('enableAccelerometer');
        df1.enableAccelerometer(callback);
      },
      function(callback) {
        console.log('notifyAccelerometer');
        df1.notifyAccelerometer(callback);
      },
      function(callback) {
        setTimeout(callback, 60000);
      },
      function(callback) {
        console.log('unnotifyAccelerometer');
        df1.unnotifyAccelerometer(callback);
      },
      function(callback) {
        console.log('disableAccelerometer');
        df1.disableAccelerometer(callback);
      },
      function(callback) {
        console.log('disconnect');
        df1.disconnect(callback);
      }
    ]
  );
});