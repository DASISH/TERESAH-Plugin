var API_URL = "http://teresah.dev.dasish.eu/API";

var portal = angular.module('toolRegistry', ['ui.bootstrap', 'restangular', 'ngCookies', 'ngSanitize', 'pascalprecht.translate']);
portal.
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/tool/:toolId', {templateUrl: './view/tool.html', controller:"ToolCtrl", reloadOnSearch: false, resolve: Tool.resolveTool}).
		when('/search/faceted', {templateUrl: './view/faceted.html', controller:"FacetedCtrl", reloadOnSearch: false, resolve: Faceted.resolveFaceted}).
		when('/search/general', {templateUrl: './view/search.html', controller:"SearchCtrl", reloadOnSearch: false, resolve: Search.resolveSearch}).
		when('/facet/:facet/:facetID', {templateUrl: './view/browse.html', controller:"BrowseCtrl", reloadOnSearch: false, resolve: BrowseCtrl.resolveBrowseCtrl}).
		when('/facet/:facet', {templateUrl: './view/facet.html', controller:"FacetCtrl", reloadOnSearch: false, resolve: FacetCtrl.resolveFacetCtrl}).
		when('/facet', {templateUrl: './view/facetList.html', controller:"facetListCtrl", reloadOnSearch: false, resolve: facetListCtrl.resolvefacetListCtrl}).
		when('/', {templateUrl: './view/home.html' , controller:"HomeCtrl", reloadOnSearch: false, resolve: Home.resolveHome}).
		otherwise({redirectTo: '/'});
}]);
portal.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setResponseExtractor(function(response) {
		var newResponse = response;
		
		if (angular.isArray(response)) {
			newResponse.original = [];
			angular.forEach(newResponse, function(value, key) {
				newResponse.original[key] = angular.copy(value);
			});
		} else {
			newResponse.original = angular.copy(response);
		}

		return newResponse;
	});
});

portal.config(['$translateProvider', function ($translateProvider) {
    $translateProvider
            .translations('en', i18n_en)
            .translations('sv', i18n_sv)   
            .registerAvailableLanguageKeys(['en', 'sv'], {
                'en_US': 'en',
                'en_UK': 'en', 
                'se_SE': 'sv',
                })
    $translateProvider.preferredLanguage('en');
    $translateProvider.determinePreferredLanguage();
 }]);