# DPPM Web UI

[![Build Status](https://cloud.drone.io/api/badges/DFabric/dppm-webui/status.svg)](https://cloud.drone.io/DFabric/dppm-webui)
[![Gitter](https://img.shields.io/badge/chat-on_gitter-red.svg?style=flat-square)](https://gitter.im/DFabric/Lobby)
[![ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://en.wikipedia.org/wiki/ISC_license)

A Web UI for the Dedicated Platform Package Manager, built on the [Svelte](https://svelte.dev/) platform.

This is only the web client of DPPM:
- For the server, look at https://github.com/DFabric/dppm-rest-api.
- To setup both the API server and the Web UI, look at https://github.com/DFabric/dppm-integration.

## Development

Install package dependencies:

`yarn install`

Watch and recompile the files at changes:

`yarn dev`

## Production build

`yarn build`

Warnings are thrown as errors when building in production.

## License

Copyright (c) 2018-2019 DFabric members - ISC License
