define(["ember"
	], function(Ember){
	var EventController = Ember.Controller.extend({

		newEventModal: function(day, parentController){
			console.log(day);

			var modal = EmberCalendar.EventView.create({
				controller: this,
				day: day
			}).appendTo('body');
		},

		closeModal: function(view) {
			console.log(event);
		  	view.remove();
		}
	});

	return EventController;
});
