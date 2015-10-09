angular.module("gameApp")
.controller("DashboardController",
["$scope", "$http", "$stateParams", "mongoFactory", "steamFactory",
function($scope, $http, $stateParams, mongoFactory, steamFactory) {
  var steamid = $stateParams.id;
  $scope.isCollapsed = false;

  // $scope.newPage = function() {
  //   stae.go
  // }

  mongoFactory.getUser(steamid)
  .then(function(data) {
    $scope.user = data.data;
  });

  steamFactory.getGames(steamid)
  .then(function(data) {
    $scope.games = data.data;
    var steam = FuzzySet();
    var steamGameNames = $scope.games.steam.map(function(game) {return game.name;});
    steamGameNames.forEach(function(name) {steam.add(name);});

    $scope.gbArray = [];
    for (var i = 0; i < $scope.games.gb.length; i++) {
      var query = steam.get($scope.games.gb[i].name);
      var steamIndex = steamGameNames.indexOf(query[0][1]);
      $scope.gbArray[steamIndex] = $scope.games.gb[i];
    }
    console.log($scope.games);
  });
}]);