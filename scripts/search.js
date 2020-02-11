angular.module('myApp',['ngRoute','apiService'])
       .controller('appController',function($scope,$http,getMovies,$location){
            $scope.pageNo = 1
            $scope.showFilter = false
            $scope.reverse = false
            $scope.sortValue = "Title"
            $scope.filterButtonClicked = false
            $scope.filters = {}
            $scope.types = ["movie","series","episode"]
            $scope.years = []
            $scope.noResults = false
            $scope.hideClearFilterButton = true
            for(let i=1990;i<=2020;i++){
                $scope.years.push(i)
            }
            $scope.performSearch = function(){
                $location.path('home')
                if(!$scope.searchText || $scope.searchText.length <3){
                    searchText = 'abc'
                }
                else{
                    searchText = $scope.searchText
                }
                $scope.url = 'http://www.omdbapi.com/?apikey=f765e195&s='+ searchText + '&page=' + $scope.pageNo
                if($scope.filters.type){
                    $scope.url +='&type='+ $scope.filters.type
                }
                if($scope.filters.year){
                    $scope.url += "&y="+ $scope.filters.year
                }
                getMovies.getMoviesBySearch($scope.url).then(
                    function(response){
                        if(response.data.Response === "False"){
                            $scope.noResults = true
                            $scope.movieData = null
                        
                        }
                        else{
                            $scope.noResults = false
                            $scope.movieData = response.data.Search;
                            $scope.totalResults = response.data.totalResults
                            $scope.noOfMovies = $scope.movieData.length
                            $scope.totalPages = parseInt(response.data.totalResults)/10+1
                        }
                    }
                )
                
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
                $scope.performSearch();
            }
            $scope.nextHandler = function(){
                $scope.pageNo++;
                $scope.performSearch();
            }
            $scope.showMessage = function(){
                if(!$scope.searchText || $scope.searchText.length < 3){
                    return true;
                }
                return false;
            }
            $scope.applyButtonClicked = function(){
                $scope.filterButtonClicked = false
                $scope.performSearch()
                $scope.hideClearFilterButton = false
            }
            $scope.clearFilters = function(){
                $scope.filters = {}
                $scope.hideClearFilterButton = true
                $scope.performSearch()
            }
            $scope.showClearFilter = function(){
                if($scope.filters == {}){
                    $scope.hideClearFilterButton = true 
                }
                else{
                    $scope.hideClearFilterButton = false
                }
            }
            })
        .controller('infoController',function($scope,$routeParams,getMovies){
            $scope.getMovieDetails = function(id){
                getMovies.getMoviesBySearch(('http://www.omdbapi.com/?apikey=f765e195&i='+$routeParams.id+'&plot=full')).then(
                    function(response){
                        $scope.response = response.data
                        let poster = $scope.response.Poster
                        let len = poster.length
                        if(len>3){
                            $scope.posterExists = true
                        }
                        else{
                            $scope.posterExists = false
                        }
                        
                            
                    })
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
            .when("/home/:id", {
                templateUrl : "../templates/info-page.html",
                controller : "infoController"
                })
            .otherwise({redirectTo: "/home"})
            $locationProvider.html5Mode(true);
        })