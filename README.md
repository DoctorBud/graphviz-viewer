# graphviz-viewer

This lightweight web application is intended to be deployed as a static single-page website, where the site can then be used to view and render Graphviz files easily.

## Usage

### Examples

The app has a few preloaded Graphviz examples.

### Load File or Drag-and-Drop

A local Graphviz file can be viewed through the app by using the 'Load File' button or by dragging and dropping a file onto the dropzone

### Load URL

A remote Graphviz file can be loaded via URL.

*Note that if the remote file is hosted on a website that does not support CORS, then the request will be rejected. Such files can be copied locally and then viewed that way, however.*

### The `url` parameter

The `graphview-viewer` app is designed so that the URL pointing to the app can be amended with an optional `url` parameter that points to a Graphviz file, subject to the same restrictions as Load URL above. For example, suppose this app is hosted on [http://doctorbud.com/graphviz-viewer](http://doctorbud.com/graphviz-viewer) and a desired Graphviz file is hosted on [http://www.example.com/MyGraphvizFile.gv](http://www.example.com/MyGraphvizFile.gv). Then the following URL will launch the graphviz-viewer app and cause it to load and render the specified file:

> [http://doctorbud.com/graphviz-viewer?url=http://www.example.com/MyGraphvizFile.gv](http://doctorbud.com/graphviz-viewer?url=http://www.example.com/MyGraphvizFile.gv)

## Requirements to build

This is what I use, you may get lucky with slightly older/newer versions.

- NodeJS 4.5.0
- NPM 3.10.8


## Requirements to run

Tested on MacOSX Safari, Chrome and FireFox. Requires some form of http-server. `npm run dev` will invoke the WebPack server for auto-bundling during development, and this is sufficient for demo purposes.


## Building

```
cd graphviz-viewer/ # If you aren't alread there
npm install
npm run build    # 'npm run fastbuild' to avoid minification
```

## Running

```
npm run dev
open http://localhost:8080/webpack-dev-server/graphviz-viewer # On MacOSX
# Alternatively, point your browser to:
#   http://localhost:8080/webpack-dev-server/graphviz-viewer
#
```


### Versions

**1.0.0** - Initial version
**1.0.1** - Update various dependencies
