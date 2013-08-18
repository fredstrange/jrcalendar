define([
		'ember',
		'controllers/CalendarController',
	], function(Ember, calendarController) {
	"use strict";
	
	
	var con = calendarController.create();

	var IndexRoute = Ember.Route.extend({
		setupController: function (controller, model) {

		},
		renderTemplate: function() {		
			this.render('calendar', {
				into: "application",
				controller: con
			});
		}
	});

	return IndexRoute;
});