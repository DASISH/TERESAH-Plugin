portal.factory("ui", function($window, $rootScope, $cookies, Restangular, $location) {
    var ui = {
        title: function(title) {
            $window.document.title = "DASISH Tool Registry | " + title;
        },
        url: {
            set: function(obj) {
                $location.search(obj);
            },
            get: function() {
                return $location.search();
                ;
            }
        }
    };
    return ui;
}).factory('Item', function(Restangular) {

    var Item = {
        //Serialize function
        serialize: function(opt) {
            str = [];
            angular.forEach(opt, function(value, key) {
                str.push(key + "=" + value);
            });
            return str.join("&");
        },
        //
        //Resource part
        //
        routes: {
            tools: {
                one: Restangular.one("tool/"),
                all: Restangular.all("tool")
            },
            facets: {
                list: Restangular.all("facet/"),
                search: Restangular.all("facet"),                
            },
            browse: {
                facet: Restangular.all("facet")
            },
            search: {
                normal: Restangular.one("search/general/"),
                faceted: Restangular.all("search/faceted/")
            },
            cloud: Restangular.all("cloud")
        },
        //Return Part
        resolver: {
            browse: {
                element: function(facet, facetID, opt, callback) {

                    if (typeof (callback) === 'undefined')
                        callback = false;
                    if (typeof (opt) === 'undefined')
                        opt = {};

                    if (opt.page) {
                        opt.start = opt.page * 20 - 20;
                    }

                    return Item.routes.browse.facet.all(facet).one(facetID).get(opt).then(function(data) {
                        if (callback) {
                            callback(data.original);
                        }
                        Item.data = data.original;
                        return data.original;
                    });
                },
                facet: function(facet, opt, callback) {

                    if (typeof (callback) === 'undefined')
                        callback = false;
                    if (typeof (opt) === 'undefined')
                        opt = {};

                    if (opt.page) {
                        opt.start = opt.page * 20 - 20;
                    }

                    return Item.routes.browse.facet.one(facet).get(opt).then(function(data) {
                        if (callback) {
                            callback(data.original);
                        }
                        Item.data = data.original;
                        return data.original;
                    });
                }
            },
            tools: {
                all: function(opt, callback) {

                    if (typeof (opt) === 'undefined')
                        opt = {};
                    if (typeof (callback) === 'undefined')
                        callback = false;

                    if (opt.page) {
                        opt.start = opt.page * 20 - 20;
                    }
                    return Item.routes.tools.one.get(opt).then(function(data) {
                        if (callback) {
                            callback(data.original);
                        }
                        Item.data = data.original;
                        return data.original;
                    });
                },
                one: function(item, options, callback) {

                    if (typeof (options) === 'undefined')
                        options = {keyword: true, platform: true, developer: true, type: true, applicationType: true, licence: true, publications: true, projects: true, suite: true, similar: true, standards: true, features: true, video: true};
                    if (typeof (callback) === 'undefined')
                        callback = false;

                    return Item.routes.tools.all.one(item).get(options).then(function(data) {
                        Item.data = data.original;
                        if (callback) {
                            callback(data.original);
                        }
                        return data.original;
                    });
                }
            },
            facets: {
                list: function(option, callback) {
                    if (typeof (option) === 'undefined')
                        option = {};
                    if (typeof (callback) === 'undefined')
                        callback = false;
                    if (option.all) {
                        fn = Item.routes.facets.list.options();
                    } else {
                        fn = Item.routes.facets.list.getList();
                    }
                    return fn.then(function(data) {
                        Item.data = data.original;
                        if (callback) {
                            callback(data.original);
                        }
                        return data.original;
                    });
                },                
                search: {
                },
                facet: {
                    list: function(key, callback) {
                        if (typeof (callback) === 'undefined')
                            callback = false;
                        return Item.routes.facets.search.one(key).getList().then(function(data) {
                            Item.data = data.original;
                            if (callback) {
                                callback(data.original);
                            }
                            return data.original;
                        });
                    },
                    search: function(key, option, callback) {
                        if (typeof (callback) === 'undefined')
                            callback = false;
                        return Item.routes.facets.search.one(key).get(option).then(function(data) {
                            Item.data = data.original;
                            if (callback) {
                                callback(data.original);
                            }
                            return data.original;
                        });
                    },
                    options: function(key, callback) {
                        if (typeof (callback) === 'undefined')
                            callback = false;
                        return Item.routes.facets.search.one(key).options().then(function(data) {
                            Item.data = data.original;
                            if (callback) {
                                callback(data.original);
                            }
                            return data.original;
                        });
                    }
                }
            },
            search: {
                normal: function(options, callback) {

                    if (typeof (callback) === 'undefined')
                        callback = false;

                    return Item.routes.search.normal.get(options).then(function(data) {
                        Item.data = data.original;
                        if (callback) {
                            callback(data);
                        }
                        return data.original;
                    });
                },
                faceted: function(options, callback) {

                    if (typeof (callback) === 'undefined')
                        callback = false;
                    options.description = true;

                    return Item.routes.search.faceted.post(options).then(function(data) {
                        Item.data = data.original;
                        if (callback) {
                            callback(data);
                        }
                        return data.original;
                    });
                },
                facetedGet: function(options, callback) {

                    if (typeof (callback) === 'undefined')
                        callback = false;
                    options.description = true;

                    return Restangular.one('search/faceted/?' + options).get().then(function(data) {
                        Item.data = data.original;
                        if (callback) {
                            callback(data);
                        }
                        return data.original;
                    });
                }
            },
            cloud: function(callback) {
                if (typeof (callback) === 'undefined'){
                    callback = false;
                }
                return Item.routes.cloud.getList().then(function(data) {
                    if (callback) {
                        callback(data.original);
                    }
                    return data.original;
                });
            }
        }
    };

    return Item;
});