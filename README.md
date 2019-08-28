# DPPM Web UI
### Svelte version
#### (*under construction*)

A Web UI for the Dedicated Platform Package Manager, built on the Svelte platform

### Building for development
```bash
# PREREQUISITE: Install and configure the DPPM REST Server
# see https://github.com/DFabric/dppm-rest-api/blob/master/scripts/setup-for-manual-testing.sh
# for an example of how to get set up.
git clone git@github.com:DFabric/web-ui-svelte.git
cd web-ui-svelte
yarn install
dppm server run webui_folder=$PWD/public & # <run in the background
yarn autobuild &
firefox --new-tab localhost:8994/index.html
# Edit the interface as you please.
```
In this scenario, the autobuild script will watch your files for changes, while the
DPPM application serves up the auto-built files.

### Building For Deployment
Should be the same as for development, but with `build` instead of autobuild.
