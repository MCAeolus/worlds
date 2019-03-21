const serial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
const desiredAddress = "D0:77:14:8F:89:02";

serial.on('found', function(address, name) {
		console.log("New device: " + name + " MAC: " + address);
		
		if(address !== desiredAddress) return;
		else console.log("Found desired device, attempting connection.");
		
		console.log("Searching for RFCOMM channel to connect to.");
		
		serial.findSerialPortChannel(address, function(channel) {
			console.log("Channel found... port " + channel);
			
			serial.connect(address, channel, function() {
				console.log("Successfully connected!");
				
				serial.on('data', function(buffer) {
					console.log(buffer.toString('utf-8'));
				});		
			});
		}, function(err) {
			console.log("Couldn't find RFCOMM channel to connect by.");
			console.log(err);
		});
	});

serial.on('close', function() {
	console.log("Bluetooth connection closed.");
});

serial.on('finished', function() {
	console.log("Bluetooth inquiry finished.");
	serial.close();
	serial.inquire();
});

serial.inquire()


/**

const btSerial = require('bluetooth-serial-port');
const rfComm = new btSerial.BluetoothSerialPort();
const desiredAddress = "D0:77:14:8F:89:02";


rfComm.on('data', function(buffer) {
	console.log(buffer.toString('utf-8'));
});

rfComm.on('found', function(address, name) {
	console.log(address + " && " + name);
	if(address == desiredAddress) {
		rfComm.findSerialPortChannel(address, function(channel) {
	
			rfComm.connect(address, channel, function() {
		
				console.log("Connected to phone.");
	
	
			}, function() {
				console.log("Failed to connect to phone.");
			});
		});
	}
	
	rfComm.close();
}, function(err) {
	console.log("Couldn't find channel to connect to: " + err);
});

**/