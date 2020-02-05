angular.module('myApp',[])
       .controller('appController',function($scope,$http){
            $scope.apiCall = function(){
                $http({
                    url: 'http://www.omdbapi.com/?apikey=f765e195&s='+ $scope.searchText,
                    method: "GET"
                }).then(
                    function(response) {
                        $scope.movieData = response.data.Search;
                    })
                }
            })
