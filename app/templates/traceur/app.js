angular.module('<%= appName %>', ['ui.router']);

angular.module('<%= appName %>')
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  });
