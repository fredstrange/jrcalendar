define([
  "require",
  "ember",
  "controllers/dayController",
  "jrcalendar"
], function(require, Ember, dayController, jrcalendar){

  function getDayController(){
    if(!dayController){
      dayController = require("controllers/dayController");//due to circular dependency
    }
    return dayController;
  };


  var DayModel = Ember.Object.extend({

    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    sv_dayNames: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
    monthNames: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    sv_monthNames: ['','Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],

    year: null,
    month: null,
    date: null,
    day: null,
    holiday: null,
    dowOffset: 1,
    events: [],

    weekday: function(){
      var day = this.get('day');
      return (day < this.dayNames.length) ? this.dayNames[day] : '';
    }.property('day'),

    monthName: function(){
      var month = this.get('month');
      return (month < this.monthNames.length) ? this.monthNames[month] : '';
    }.property('month'),

    isHoliday: function(){
      var isSunday =  this.get('day') == 0,
          isHoliday = (typeof this.get('holiday') === 'string' && this.get('holiday').length > 0);

      return isSunday || isHoliday;
    }.property('holiday', 'day'),

    isFirstDayOfWeek: function(){
      return this.get('day') == this.get('dowOffset');
    }.property('day'),

    isFirstDayOfMonth: function(){
      return this.get('date') == 1;
    }.property('date'),

    isLastDayOfMonth: function(){
      return this.get('date') == new Date(this.get('year'), this.get('month'), 0).getDate();
    }.property('date'),

    /* Return the model as a Javascript date object.*/
    jsDate: function(){
      return new Date(this.get('year'), this.get('month') - 1, this.get('date'));
    },

    /*weekNumber was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com 
    * Modified by James Rumack this purpose of this calendar
    */ 
    // Returns the week number of the current DayModel. 
    weekNumber: function(){
      var dowOffset, date, weeknum, newYear, day, daynum;


      dowOffset = this.get('dowOffset');
      dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 1; //default dowOffset to one (EU)
      date = this.jsDate();

      newYear = new Date(date.getFullYear(),0,1);
      day = newYear.getDay() - dowOffset; //the day of week the year begins on
      day = (day >= 0 ? day : day + 7);
      daynum = Math.floor((date.getTime() - newYear.getTime() -
      (date.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
      //if the year starts before the middle of a week
      if(day < 4) {
          weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
          nYear = new Date(date.getFullYear() + 1,0,1);
          nday = nYear.getDay() - dowOffset;
          nday = nday >= 0 ? nday : nday + 7;
          /*if the next year starts before the middle of
          the week, it is week #1 of that year*/
          weeknum = nday < 4 ? 1 : 53;
        }
      }
      else {
        weeknum = Math.floor((daynum+day-1)/7);
      }
      return weeknum;
    }.property(),



    init: function(){
      this._super();
      getDayController();
    },



  });
  
  return DayModel;
});