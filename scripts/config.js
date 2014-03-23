define({
	app_name: "EmberCalendar", 
	shim : {
		'ember' : {
			deps: ['handlebars', 'jquery'],
			exports: 'Ember'
		},
        'bootstrap': {
            deps: ['jquery']
        }
	},
	paths : {
		'App'					: 'app/main',		
		'models'				: 'app/models',
		'views'					: 'app/views',
		'controllers'			: 'app/controllers',
    	'templates'				: 'app/templates',
    	'routes'				: 'app/routes',
    	'helpers'				: 'app/helpers',
		/*libs*/
		'jquery'				: '../bower_components/jquery/dist/jquery',
		'bootstrap'				: '../bower_components/bootstrap/dist/js/bootstrap',
		'handlebars'			: '../bower_components/handlebars/handlebars',
		'ember'					: '../bower_components/ember/ember',
		/*requirejs-plugins*/
		'text'					: '../bower_components/text/text',
		'domReady'				: '../bower_components/domReady/ready',
	}

}); 

