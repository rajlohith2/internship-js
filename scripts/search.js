angular.module('myApp',['ngRoute','apiService'])
       .controller('appController',function($scope,$http){
            $scope.pageNo = 1
            $scope.showFilter = false
            $scope.reverse = false
            $scope.sortValue = "Title"
            $scope.totalPages = 1
            $scope.filterButtonClicked = false
            $scope.filters = {}
            $scope.types = ["movie","series","episode"]
            $scope.years = []
            for(let i=1990;i<=2020;i++){
                $scope.years.push(i)
            }
            $scope.apiCall = function() {

                if($scope.searchText.length >= 3)
                {
                        var url = 'http://www.omdbapi.com/?apikey=f765e195&s='+ $scope.searchText + '&page=' + $scope.pageNo
                        if($scope.filters.type){
                            url = url+'&type='+ $scope.filters.type
                        }
                        if($scope.filters.year){
                            url = url+"&y="+ $scope.filters.year
                        }                         
                        $http({
                            url: url,
                            method: "GET"
                        }).then(
                            function(response) {
                                $scope.movieData = response.data.Search;
                                $scope.totalPages = parseInt((response.data.totalResults/10))+1;
                            })
                        
                }
                else{
                    $scope.movieData = null
                }

        }
        $scope.sortBy = function(sortValue){
            if(sortValue === $scope.sortValue){
                $scope.reverse = ! $scope.reverse
            }
            else{
                $scope.reverse = false
                $scope.sortValue = sortValue
            }
        }
        $scope.prevHandler = function(){
            $scope.pageNo--;;
            $scope.apiCall();
        }
        $scope.nextHandler = function(){
            $scope.pageNo++;
            $scope.apiCall();
        }
        $scope.showMovieDetails = function(){

        }
        $scope.showMessage = function(){
            if(!$scope.searchText || $scope.searchText.length < 3){
                return true;
            }
            return false;
        }

    })
    .config(function($routeProvider,$locationProvider) {
        $routeProvider
        .when("/home", {
          templateUrl : "../templates/home.html",
          controller : "appController"
        })
        .when("/about", {
          templateUrl : "../templates/about.html",
          controller : "appController"
        })
        .when("/contact", {
          templateUrl : "../templates/contact.html",
          controller : "appController"
        })
        $locationProvider.html5Mode(true);
    })