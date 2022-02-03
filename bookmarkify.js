let device;
let characteristic;
let service;

let buttonBeingPressed = false;

let holdFastForward = [];

let characteristicUUID = "488b392b-97eb-4d6a-9715-1fbc4b202cbe";
let serviceUUID = "c9b0d829-e826-4cba-8504-66f971bfda14";

let ledCharacteristic = "216978d7-d887-4ad4-bb02-1bc00e39f3d9";

let led;

navigator.bluetooth.requestDevice({filters: [{services: [serviceUUID]}]}).then(_device => {
    device = _device;
    console.log(1);
    return device.gatt.connect();
    
}).then(() => {
    console.log(2);
    return device.gatt.getPrimaryService(serviceUUID); 
}).then(_service => {
    service = _service;
    console.log(3);
    return service.getCharacteristic(ledCharacteristic);
}).then(_led => {
    console.log(4);
    led = _led;
    led.startNotifications();
}).then(() => {
    console.log(5);
    return service.getCharacteristic(characteristicUUID);
}).then(_characteristic => {
    console.log("yay");
    
    let decoder = new TextDecoder();
    let encoder = new TextEncoder();
    
    characteristic = _characteristic;
    
    if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0]) {
        if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === false) {
            led.writeValue(encoder.encode("notpaused"));
        } else if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === true) {
            led.writeValue(encoder.encode("paused"));
        }
    }
    
    characteristic.addEventListener("characteristicvaluechanged", function data(thing) {
        //let decoder = new TextDecoder();
        console.log("hmmmmmm");
        //let encoder = new TextEncoder();
        let result = decoder.decode(thing.target.value);
        console.log(result);
        
        if (result == 'A') {
            Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].currentTime = Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].currentTime + 5;
        } else if (result == 'B') {
            Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].currentTime = Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].currentTime - 5;
        } else if (result == 'C') {
            Array.from(document.getElementsByClassName("ytp-play-button ytp-button"))[0].click();
            
            if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0]) {
                if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === true) {
                    led.writeValue(encoder.encode("notpaused"));
                } else if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === false) {
                    led.writeValue(encoder.encode("paused"));
                }
            }
            
        } else if (result == 'D') {
            Array.from(document.getElementsByClassName("ytp-size-button ytp-button"))[0].click();
            
            led.writeValue(encoder.encode("enterfullscreen"));
            
            window.setTimeout(function() {
               if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0]) {
                    if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === false) {
                        led.writeValue(encoder.encode("notpaused"));
                    } else if (Array.from(document.getElementsByClassName("video-stream html5-main-video"))[0].paused === true) {
                        led.writeValue(encoder.encode("paused"));
                    }
                } 
            });
            
        }
        
    });
    return characteristic.startNotifications();
});
