define([
	"views/ApplicationView",
	"views/CalendarView",
	"views/WeekView",
	"views/DayView",
	"views/EventView",
	"controllers/ApplicationController",
	"controllers/CalendarController",
	"controllers/EventController",
	"app/router",
	"routes/IndexRoute"
	
], function(ApplicationView, CalendarView, WeekView, DayView, EventView, 
			ApplicationController, CalendarController, EventController,
			Router, IndexRoute){
	/*Module Pattern*/
	var App = {
		ApplicationView: ApplicationView,
		CalendarView: CalendarView,
		WeekView: WeekView,
		DayView: DayView,
		EventView: EventView,
		ApplicationController: ApplicationController,
		EventController: EventController,
		CalendarController: CalendarController,
		Router: Router,
		IndexRoute: IndexRoute
	};

	return App;


});
