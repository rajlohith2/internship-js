angular.module('apiService',[])
       .service('getMovies', function($http,$q){
           var response;
            return {
                getMoviesBySearch: function(url){
                    var deferred = $q.defer()
                    $http({url: url,  method: 'GET'})
                                .then(deferred.resolve)
                    return deferred.promise
                }
            }
       })