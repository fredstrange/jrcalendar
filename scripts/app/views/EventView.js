define([
	'jquery',
	"ember",
	"text!templates/eventTemplate.html",
	"controllers/EventController"
], function($, Ember, eventTemplate, EventController) {

	var EventView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(eventTemplate),
		controller: EventController,
		day: null,

		close: function() {
		  this.remove();
		}


	});
	return EventView;
});