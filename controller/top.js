var Top = portal.controller('TopCtrl', ['$scope', "$q", "$location", "$route", "Item", function($scope, $q, $location, $route, $item) {
	$scope.ui = {
		search : {
			typeahead : function(str) {
				var defer = $q.defer();
				$item.resolver.search.normal({request : str, limit : 10, case_insensitivity : true, limited: "title"}, function(data) {
                                    if(data.response != undefined){
                                        defer.resolve(data.response);
                                    }
				});
				return defer.promise;
			},
			results : [],
			input : undefined,
			select : function(item) {
				$location.path('/tool/'+item.identifiers.shortname)
			},
			go : function(item) {
                            if(item == undefined){
                                window.location.href = '#/search/general?case_insensitivity=1&limited=title&request='+$scope.ui.search.input;
                            }else{
                                $location.path('/search/general?case_insensitivity=1&limited=title&request='+item.identifiers.shortname);
                            }
			}
		},
		routes : {
			active : true,
			getRoute : function(controller) {
				if(controller == $scope.ui.routes.active) {
					return "active";
				}
			}
		}
	}
	$scope.$on('$routeChangeStart', function(next, current) { 
		$scope.ui.routes.active = current.controller;
	});
}]);