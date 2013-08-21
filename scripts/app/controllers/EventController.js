define(["ember",
		"bootstrap"
		//"jquery-ui"
	], function(Ember, boostrap){
	var EventController = Ember.Controller.extend({

		newEventModal: function(day, parentController){

			var modal = EmberCalendar.EventView.create({
				controller: this,
				day: day,

				didInsertElement: function(){
					var self = this;
					this.$('#eventModal').modal('show');
					$('#eventModal').on('hidden.bs.modal', function(){
						self.remove();
					});
				}
			}).appendTo('body');
		},

		saveEvent: function(view){
			//Save the event to the controller. 
			$('#eventModal').modal('hide');
		},

		closeModal: function(view) {
			$('#eventModal').modal('hide');
		}
	});

	return EventController;
});
