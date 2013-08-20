define([
	"ember",
	"text!templates/calendarTemplate.html",
	'helpers/helpers'
], function(Ember, calendarTemplate, helper) {

	var CalendarView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(calendarTemplate)
	});
	return CalendarView;
});