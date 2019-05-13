import Viz from 'viz.js';
const { Module, render } = require('viz.js/full.render.js');

import _ from 'lodash';

/* eslint new-cap: 0 */

export default class MainController {
  // constructor arglist must match invocation in app.js
  constructor($scope, $resource, $http, $timeout, $location) {
    this.$scope = $scope;
    this.$resource = $resource;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$location = $location;
    this.showDOTSource = false;
    this.showDOTRender = true;
    this.DOTSource = '';
    this.DOTTitle = '';
    this.zoomed = false;
    this.errorMessage = null;
    this.defaultSource = 'digraph { rankdir=LR; a -> b -> c -> d -> e -> f -> g -> a; }';
    this.defaultTitle = 'Very Simple Graphviz Example';
    this.importURL = 'https://raw.githubusercontent.com/ellson/graphviz/master/graphs/directed/train11.gv';
    this.examples = [
      {
        file: require('raw-loader!./examples/biological.gv'),
        title: 'Biological Graphviz'
      },
      {
        file: require('raw-loader!./examples/crazy.gv'),
        title: 'Crazy Graphviz'
      },
      {
        file: require('raw-loader!./examples/sdh.gv'),
        title: 'SDH Graphviz'
      },
      {
        file: require('raw-loader!./examples/shells.gv'),
        title: 'Shells Graphviz'
      },
      {
        file: require('raw-loader!./examples/tree.gv'),
        title: 'Tree Graphviz'
      }
    ];
    var that = this;

    $timeout(
      function () {
        that.continueInitialization();
      },
      10);
  }

  setError(error) {
    this.errorMessage = error;
    this.DOTTitle = '';
    this.DOTSource = '';
  }

  renderDOT() {
    var renderElement = document.getElementById('DOTRender');
    // renderElement.innerHTML = Viz(this.DOTSource);

    let viz = new Viz({ Module: Module, render: render });

    viz.renderString(this.DOTSource)
    .then(result => {
      renderElement.innerHTML = result;
    });
  }

  loadSource(source, title, url) {
    console.log('loadSource', source.slice(0, 20), title, url);
    this.DOTSource = source;
    this.DOTTitle = title;
    this.errorMessage = null;
    if (url) {
      this.$location.search({url: url});
    }
    else {
      this.$location.search({url: null});
    }
    this.renderDOT();
  }

  loadURL(importURL) {
    var that = this;
    this.importURL = importURL;
    this.$http.get(importURL, {withCredentials: false}).then(
      function(result) {
        // console.log('loadURL success', result.data);
        that.loadSource(result.data, importURL, importURL);
      },
      function(error) {
        console.log('loadURL error', error);
        that.setError('Error loading URL ' + importURL + '\n\n' + JSON.stringify(error));
      }
    );
  }

  continueInitialization() {
    var that = this;

    var url = this.$location.search().url;
    if (url) {
      that.loadURL(url);
    }
    else {
      this.loadSource(this.defaultSource, this.defaultTitle);

      this.$scope.$watch('c.file', function () {
        that.loadFile(that.file);
      });
    }
  }

  loadFile(file) {
    var that = this;

    if (file) {
      if (!file.$error) {
        var reader = new FileReader();
        var blobText = '';
        /* eslint no-loop-func: 0 */
        reader.addEventListener("loadend", function() {
          blobText = reader.result;
          that.loadSource(blobText, file.name);
        });
        reader.readAsText(file);
      }
    }
  }
}
