define([
  "require",
  "ember",
  "controllers/calendarController"
], function(require, Ember, calendarController){

  function getCaledarController(){
    if(!calendarController){
      calendarController = require("controllers/calendarController");//due to circular dependency
    }
    return calendarController;
  };

  var CalendarModel = Ember.Object.extend({
    calendar: {},

    init: function(){
      this._super();
      getCaledarController();
    }

  });
  
  return CalendarModel;
});