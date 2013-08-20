define([
	"views/ApplicationView",
	"views/CalendarView",
	"views/WeekView",
	"views/DayView",
	"views/EventView",
	"controllers/ApplicationController",
	"controllers/CalendarController",
	"app/router",
	"routes/IndexRoute"
	
], function(ApplicationView, CalendarView, WeekView, DayView, EventView, ApplicationController, CalendarController, Router, IndexRoute){
	/*Module Pattern*/
	var App = {
		ApplicationView: ApplicationView,
		CalendarView: CalendarView,
		WeekView: WeekView,
		DayView: DayView,
		EventView: EventView,
		ApplicationController: ApplicationController,
		CalendarController: CalendarController,
		Router: Router,
		IndexRoute: IndexRoute
	};

	return App;


});
