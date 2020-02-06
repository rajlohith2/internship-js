angular.module('myApp',[])
       .controller('appController',function($scope,$http,$timeout){
            $scope.apiCall = function() {
                if($scope.searchText.length >= 3)
                {
                    $timeout(function(){
                        $http({
                            url: 'http://www.omdbapi.com/?apikey=f765e195&s='+ $scope.searchText,
                            method: "GET"
                        }).then(
                            function(response) {
                                $scope.movieData = response.data.Search;
                            })
                        },1000)
                }

       }
            $scope.showFilterOptions = function(){
                $scope.showFilter = ! $scope.showFilter
            }
            $scope.showFilter = false
            $scope.sort = "Title"
            })