define([
	"ember",
	"text!templates/calendarTemplate.html"
], function(Ember, calendarTemplate) {

	var CalendarView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(calendarTemplate)
	});
	return CalendarView;
});