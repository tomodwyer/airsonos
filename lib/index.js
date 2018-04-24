#!/usr/bin/env node

require("babel-polyfill");

const AirSonos = require("./airsonos");
const diag = require("../lib/diagnostics");
const flags = require("flags");
const pjson = require("../package.json");

flags.defineBoolean("diagnostics", false, "run diagnostics utility");
flags.defineBoolean("version", false, "return version number");
flags.defineInteger("timeout", 5, "disconnect timeout (in seconds)");
flags.defineBoolean("verbose", false, "show verbose output");
flags.parse();

if (flags.get("version")) {
  console.log(pjson.version);
} else if (flags.get("diagnostics")) {
  diag();
} else {
  console.log("Searching for Sonos devices on network...\n");

  const instance = new AirSonos({
    verbose: flags.get("verbose"),
    timeout: flags.get("timeout")
  });

  instance
    .start()
    .then(tunnels => {
      tunnels.forEach(tunnel => {
        console.log(
          `${tunnel.deviceName} (@ ${tunnel.device.host}:${
            tunnel.device.port
          }, ${tunnel.device.groupId})`
        );
      });

      console.log(
        `\nSearch complete. Set up ${tunnels.length} device tunnel${
          tunnels.length === 1 ? "" : "s"
        }.`
      );
    })
    .done();
}
