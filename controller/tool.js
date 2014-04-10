var Tool = portal.controller('ToolCtrl', ['$scope', 'ui',  'Item', function($scope, $ui, $item) {

	$scope.item = $item.data;
	
	//Will change
	if($scope.item.descriptions.description[0]) {
		$scope.item.desc = $scope.item.descriptions.description[0];
	}
	$scope.ui = {
		share : "http://"+document.domain+"/API/share/" + $scope.item.identifier.shortname,
		description : {
			edit : {
				show : false,
				data : {
					name : $scope.item.descriptions.title,
					version : $scope.item.descriptions.version,
					homepage : $scope.item.descriptions.homepage,
					available_from : $scope.item.descriptions.available_from,
				},
				submit : function() {
					input = this.data;
					$item.resolver.tools.edit.description($scope.item.identifier.id, input, function(data) {
						$scope.ui.description.edit.response = data;
					});
				},
				response : {
					Success : false,
					Error : false
				}
			}
		},
		sections : {
			list : {},
			active : 0,
			toggle : function(name) {
				if(this.list[name]) {
					this.list[name] = false;
				} else {
					this.list[name] = name;
				}
				console.log(this.list);
				$scope.ui.sections.active = 0;
				angular.forEach($scope.ui.sections.list, function(val) {
					if(val) { 
						$scope.ui.sections.active = $scope.ui.sections.active + 1;
					}
				});
			}
		},
		//UI TOOLS
		changeDesc : function(provider) {
			if(typeof provider == "string") {
			} else {
				$scope.item.desc = provider;
			}
		},
		features : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
		standards : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
                similar : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
		projects : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
		videos : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
		publications : {
			show : true,
			filter : {
				input : null,
				show : false
			}
		},
		keywords : {
			provider : {
				selected : null,
				selected : null
			},
			taxonomy : {
				show : false,
				selected : null
			},
			show : true
		}
	};
	//
	$ui.title("Tool | " + $scope.item.descriptions.title);
	
	//exec
}]);
Tool.resolveTool = {
	itemData: function($route, Item) {
		this.data = Item.resolver.tools.one($route.current.params.toolId);
		return Item.data;
	},
	delay: function($q, $timeout) {
		var delay = $q.defer();
		$timeout(delay.resolve, 1000);
		return delay.promise;
	}
}