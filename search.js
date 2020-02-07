angular.module('myApp',[])
       .controller('appController',function($scope,$http,$timeout){
            $scope.pageNo = 1
            $scope.showFilter = false
            $scope.reverse = false
            $scope.sortValue = "Title"
            $scope.totalPages = 1
            $scope.apiCall = function() {

                if($scope.searchText.length >= 3)
                {
                        console.log('Api call with ', $scope.pageNo);
                        
                        $http({
                            url: 'http://www.omdbapi.com/?apikey=f765e195&s='+ $scope.searchText + '&page=' + $scope.pageNo,
                            method: "GET"
                        }).then(
                            function(response) {
                                $scope.movieData = response.data.Search;
                                $scope.totalPages = parseInt((response.data.totalResults/10))+1;
                                console.log($scope.totalPages,$scope.pageNo)

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
    })