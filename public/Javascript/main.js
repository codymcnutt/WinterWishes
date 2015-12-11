

angular.module('winterApp', [])

angular.module('winterApp')
	.controller('winterController', ['$scope', '$http', function($scope, $http){




    // $http.get('/api/me')
    //     .then(function(returnData){
    //       if(!returnData.data){

    //         // if not logged in, force back to home page
    //         // window.location.href="/"
            
    //       }

        // $scope.wishList =[]
           $scope.quantity = 1;
          var getWishes = function(){
              $http.get('/api/getWishes')
              .then(function(returnData){
                $scope.wishList=returnData.data
                  // getWishes( 200000);
                 console.log($scope.wishList)
          
              })
          }

      
   
      getWishes()
      // This is to add realtime feedback from the server to the client
      // target.addEventListener(string, function()[, useCapture]);
         
        $scope.createWish = function(){
          console.log('createWish', $scope.newWish)
          $http.post('/api/savedWishes', $scope.newWish)
           .then(function(returnData){
            getWishes()
            console.log('Wish sucessfully submitted to database', returnData)
          $scope.savedWishes = returnData.data 
          

        })
        }

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