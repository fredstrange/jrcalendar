define([
  "require",
  "ember",
  "controllers/eventController"
], function(require, Ember, eventController){

  function getEventController(){
    if(!eventController){
      eventController = require("controllers/eventController");//due to circular dependency
    }
    return eventController;
  };

  var EventModel = Ember.Object.extend({

    title: null,
    description: null,
    event_type: null,
    blocking: null,
    start_at: null,
    stop_at: null,
    project_id: null,
    created_at: null,
    updated_at: null,
    location: null,
    active: false,

    init: function(){
      this._super();
      getEventController();
      this.notifyPropertyChange("name");
    }

  });
  
  return EventModel;
});