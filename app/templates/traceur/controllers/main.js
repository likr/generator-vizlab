angular.module('<%= appName %>')
  .config($stateProvider => {
    $stateProvider.state('main', {
      controller: 'MainController as main',
      templateUrl: 'partials/main.html',
      url: '/'
    });
  })
  .controller('MainController', class {
    constructor() {
    }
  });
