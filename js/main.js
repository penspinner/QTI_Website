angular.element(document).ready(function()
{
	var app = angular
		.module("app", ['ui.router', 'QTIControllers'])
        .run(['$state', '$stateParams', function($state, $stateParams) {}])
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider)
			{
				$urlRouterProvider.otherwise('/');
				$locationProvider.html5Mode(true);
				$stateProvider
                    .state('home',
                    {
                        url: '/',
                        templateUrl: 'partials/home.html',
                        controller: 'HomeController'
                    })
                    .state('about',
                    {
//                        abstract: true,
                        url: '/about',
                        templateUrl: 'partials/about.html',
                        controller: 
                        [
                            '$scope', function($scope)
                            {
                                $scope.aboutTabs = 
                                [
                                    {
                                        name: 'Cloud Services',
                                        url: '.cloudservices'
                                    },
                                    {
                                        name: 'Managed Services',
                                        url: '.managedservices'
                                    },
                                    {
                                        name: 'Recruitment',
                                        url: '.recruitment'
                                    },
                                    {
                                        name: 'Our Company',
                                        url: '.ourcompany'
                                    },
                                    {
                                        name: 'Procurement',
                                        url: '.procurement'
                                    }
                                ];
                            }
                        ]
                    })
                    .state('about.cloudservices',
                    {
                        url: '/cloudservices',
                        templateUrl: 'partials/about.cloudservices.html'
                    })
                    .state('about.managedservices',
                    {
                        url: '/managedservices',
                        templateUrl: 'partials/about.managedservices.html'
                    })
                    .state('about.recruitment',
                    {
                        url: '/recruitment',
                        templateUrl: 'partials/about.recruitment.html'
                    })
                    .state('about.ourcompany',
                    {
                        url: '/ourcompany',
                        templateUrl: 'partials/about.ourcompany.html'
                    })
                    .state('about.procurement',
                    {
                        url: '/procurement',
                        templateUrl: 'partials/about.procurement.html'
                    })
                    .state('services',
                    {
                        url: '/services',
                        templateUrl: 'partials/services.html'
                    })
                    .state('clients',
                    {
                        url: '/clients',
                        templateUrl: 'partials/clients.html'
                    })
                    .state('resources',
                    {
                        url: '/resources',
                        templateUrl: 'partials/resources.html',
                        controller: 
                        [
                            '$scope', function($scope)
                            {
                                $scope.resourcesTabs = 
                                [
                                    {
                                        name: 'Partners',
                                        url: '.partners'
                                    },
                                    {
                                        name: 'Documents',
                                        url: '.documents'
                                    },
                                    {
                                        name: 'Testimonials',
                                        url: '.testimonials'
                                    }
                                ];
                            }
                        ]
                    })
                    .state('resources.partners',
                    {
                        url: '/partners',
                        templateUrl: 'partials/resources.partners.html'
                    })
                    .state('resources.documents',
                    {
                        url: '/documents',
                        templateUrl: 'partials/resources.documents.html'
                    })
                    .state('resources.testimonials',
                    {
                        url: '/testimonials',
                        templateUrl: 'partials/resources.testimonials.html',
                    })
                    .state('testimonials',
                    {
                        url: '/testimonials',
                        templateUrl: 'partials/testimonials.html'
                    });
			}]);

	var body = document.getElementsByTagName("body")[0];
	angular.bootstrap(body, [app.name]);
	
});
