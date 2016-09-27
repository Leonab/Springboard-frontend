angular.module('MyApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate'])

.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');


})



.controller('main', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {
    $scope.$watch('search', function() {
        fetch();
    });

    $scope.toggleSidenav = function(menuId) {
      
        $mdSidenav(menuId).toggle();
    };
	


    function fetch() {

        $http.get(" https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths")
            .then(function(response) {
             
			    console.log(response);
                $scope.details = response.data;
				var size = $scope.details.paths.length;
                   
				if(localStorage.num)
					console.log("yum");
				else
				{
				for (var i = 0; i < size; ++i) 
				{
					$scope.details.paths[i].upvotes = 0;
				}
				}
				console.log($scope.details);

            });


    }
	
	var num = [];
	
	$scope.upVote = function(deal) {
		
		//individual upvotes
		
		if(num[deal])
         console.log(num[deal]);
        else
		num = $scope.details.paths[deal].upvotes;
	    if(typeof(Storage) !== "undefined") {
        if (localStorage.num) {
            localStorage.num = Number(localStorage.num)+1;
        } else {
            localStorage.num = 1;
        }
		console.log(localStorage.num);

    document.getElementById("result"+deal).innerHTML = "Upvotes:" + localStorage.num;
	}
	}
	
	
	
	$scope.clickCounter = function() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "Total Upvotes:" + localStorage.clickcount;
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}


}]);
