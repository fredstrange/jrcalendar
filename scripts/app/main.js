define([
	"views/ApplicationView",
	"views/CalendarView",
	"views/WeekView",
	"views/DayView",
	"controllers/ApplicationController",
	"controllers/CalendarController",
	"app/router",
	"routes/IndexRoute"
	
], function(ApplicationView, CalendarView, WeekView, DayView, ApplicationController, CalendarController, Router, IndexRoute){
	/*Module Pattern*/
	var App = {
		ApplicationView: ApplicationView,
		CalendarView: CalendarView,
		WeekView: WeekView,
		DayView: DayView,
		ApplicationController: ApplicationController,
		CalendarController: CalendarController,
		Router: Router,
		IndexRoute: IndexRoute
	};

	Handlebars.registerHelper("debug", function(optionalValue) {
	  console.log("Current Context");
	  console.log("====================");
	  console.log(this);
	 
	  if (optionalValue) {
	    console.log("Value");
	    console.log("====================");
	    console.log(optionalValue);
	  }
	});
	
	return App;


});
