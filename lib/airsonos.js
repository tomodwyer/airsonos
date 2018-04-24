const Promise = require("bluebird");
const sonos = require("sonos");
const DeviceTunnel = require("./tunnel");

class AirSonos {
  constructor(options) {
    this.tunnels = {};
    this.options = options || {};
  }

  get searchForDevices() {
    this.sonos = sonos.LogicalDevice.search;
    return Promise.promisify(this.sonos);
  }

  start() {
    return this.searchForDevices().then(devices => {
      const promises = devices.map(device =>
        DeviceTunnel.createFor(device, this.options).then(tunnel => {
          tunnel.on("error", err => {
            if (err.code === 415) {
              console.error("Warning!", err.message);
              console.error(
                "AirSonos currently does not support codecs used by applications such as iTunes or AirFoil."
              );
              console.error(
                "Progress on this issue: https://github.com/stephen/nodetunes/issues/1"
              );
            } else {
              console.error("Unknown error:");
              console.error(err);
            }
          });

          tunnel.start();
          this.tunnels[tunnel.device.groupId] = tunnel;

          return tunnel;
        })
      );

      return Promise.all(promises);
    });
  }

  refresh() {
    return this.searchForDevices().then(() => {
      // remove old groups
      // add new groups
      // update existing groups with new configurations
    });
  }
}

module.exports = AirSonos;
