define([
	'jquery',
	"ember",
	"text!templates/dayTemplate.html"
], function($, Ember, dayTemplate) {

	var DayView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(dayTemplate),

		mouseLeave: function(evt) {
			$('#' + this.get('elementId')).find('.jrcal-btns').addClass('hidden');

	    },
	    mouseEnter: function(event) {
			$('#' + this.get('elementId')).find('.jrcal-btns').removeClass('hidden');
		},
	});
	return DayView;
});