# AirSonos

AirSonos is a server that adds Apple [AirPlay](https://www.apple.com/airplay/) (iOS, OS X) support to all Sonos devices on a network.

## Installation

AirSonos requires [node.js](http://nodejs.org) installed to run.

Currently tested against Node v8.2.1 and npm v5.3.0.

```
$ git clone https://github.com/tomodwyer/airsonos.git
$ npm install
$ npm run start
```

## Example usage

```bash
$ cd airsonos
$ npm run start
Searching for Sonos devices on network...

Swan (@ 192.168.0.1:1400, RINCON_B8E9375433D201400:1)

Search complete. Set up 1 device tunnel.
```

## Development

```bash
$ git clone https://github.com/stephen/airsonos.git
$ cd airsonos
$ npm install
$ node ./bin/index.js
```

Internally, AirSonos is a thin wrapper around the [nodetunes](https://github.com/tomodwyer/nodetunes) and [nicercast](https://github.com/tomodwyer/nicercast) packages.

## Changelog

See [`CHANGELOG.md`](https://github.com/tomodwyer/airsonos/blob/master/CHANGELOG.md)
