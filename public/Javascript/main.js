angular.module('winterApp', [])

angular.module('winterApp')
	.controller('winterController', ['$scope', '$http', function($scope, $http){

  $scope.sideBar = true;

  // Toggles the button
  $scope.sideBarToggle = function() {

    $scope.sideBar = !$scope.sideBar;

  };

    
    $scope.about = false;

  // Toggles the button
  $scope.aboutToggle = function() {

    $scope.about = !$scope.about;

  };

    $scope.makeWish = false;

  // Toggles the button
  $scope.makeWishToggle = function() {

    $scope.makeWish = !$scope.makeWish;

  };
    $scope.learnButton = true;

  // Toggles the button
  $scope.learnButtonToggle = function() {

    $scope.learnButton = !$scope.learnButton;

  };
      $scope.currentWish= false;

  // Toggles the button
  $scope.currentWishToggle = function() {

    $scope.currentWish = !$scope.currentWish;

  };


		}])