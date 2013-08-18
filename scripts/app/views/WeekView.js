define([
	"ember",
	"text!templates/weekTemplate.html"
], function(Ember, weekTemplate) {

	var WeekView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(weekTemplate)
	});
	return WeekView;
});