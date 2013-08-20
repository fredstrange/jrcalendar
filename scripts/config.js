define({
	app_name: "EmberCalendar", 
	shim : {
		'ember' : {
			deps: ['handlebars', 'jquery'],
			exports: 'Ember'
		},
		'jqueryui:': {
            deps: ['jquery']
        }
	},
	paths : {
		'App': 'app/main',		
		'models': 'app/models',
		'views': 'app/views',
		'controllers': 'app/controllers',
    	'templates': 'app/templates',
    	'routes': 'app/routes',
    	'helpers': 'app/helpers',
		/*libs*/
		'jquery': 'libs/jquery/1.9.1/jquery',
		'jquery-ui': 'libs/jquery-ui/1.10.3/jquery-ui',
		'handlebars': 'libs/handlebars/1.0.rc.3/handlebars',
		'ember': 'libs/ember/1.0.0-rc.3/ember',
		/*requirejs-plugins*/
		'text': 'libs/requirejs-plugins/text',
		'hbs': 'libs/requirejs-plugins/hbs',
		'domReady': 'libs/requirejs-plugins/domReady',

		/*James' libraries*/
		'jrcalendar': 'libs/jrcalendar/jrcalendar'
	},
	/*hbs plugin options*/
	hbs: {
		disableI18n: true,
		templateExtension: "html"
	}

}); 

