var Top = portal.controller('TopCtrl', ['$scope', "$q", "$location", "$route", "Item", "$rootScope", "ui", function($scope, $q, $location, $route, $item, $root, $ui) {
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
		},
		user : {
			data : false,
			signedin : function () { $ui.user.signedin(function(data) {
					o = {name : data.name, mail: data.mail, signedin : true, level: data.level };
					$root.user = o;
					$scope.ui.user.data = o;
				}); 
			},
			signout : function () { $ui.user.signout(function(data) {
					if(data.signedout == false) {
						$root.user.signedin = false;
						$scope.ui.user.data.signedin = false;
					} else {
						$root.user.signedin = true;
						$scope.ui.user.data.signedin = true;
					}
				}); 
			}
		}
	}
	
	$scope.ui.user.signedin();
	
	$scope.$on('$routeChangeStart', function(next, current) { 
		$scope.ui.routes.active = current.controller;
	});

	$root.$on("USER_UPDATE", function(event, data){
		console.log(data);
		$scope.ui.user.data = data;
		$root.user = data;
	});
	
	//Watch for rootscope.user.signedin
	$scope.$watch('user.signedin', function(status) {
		if(status == true) {
			$scope.ui.user.data = $root.user;
		}
	});
}]);