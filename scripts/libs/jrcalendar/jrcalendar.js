define([], function () {
    'use strict';

    var jrcalendar,

	

	// The Calendar object
    jrcalendar = {

		months: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    	sv_months: ['','Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
		sv_dayNames: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],

	    // Day structure. Only here to simplify codeing
		Day: function(){
			var day = {}

			day.weekday = '';
			day.holiday = '';
			day.t_holiday = '';
			
			// States can be 'blocked', 'confirmed', 'preliminary', 'other'
			day.state = '';
			//Info Comment
			day.info = '';

			return day;
		},	
		
		// jrDate structure. Months are 1-12. Can be expanded to replace javascripts Date object. 
		jrDate: function(y, m, d){

			var date = {};

			date.day = d;
			date.date = d;
			date.year = y;
			date.month = m;
		//	this._date = new Date(y,m-1,d);
			//log(this.year + '-' + this.month + '-' + this.day);
			//log(this._date);

			date.toString = function(){
				return this.year + '-' + this.month + '-' + this.day;
			}
			date.getDay = function(){
				return new Date(y,m-1,d).getDay();
			}
			date.getDate = function(){
				return new Date(y,m-1,d).getDate();
			}
			date.getMonth = function(){
				return new Date(y,m-1,d).getMonth();
			}

			return date;
		},

		/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com 
		* Modified for jrCalendar by James Rumack
		*/
		
		// Returns the week number of any given javascript Date. 
		// param date: The date to check 
		// param dowOffset: Offset to compensate for differences in which day is considered the first day of the week. 
		//		0: For USA 
		// 		1: For EU 
		
		getWeek: function (date, dowOffset) {

			var newYear, day, daynum, weeknum;

			dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 1; //default dowOffset to one (EU)
			newYear = new Date(date.getFullYear(),0,1);
			day = newYear.getDay() - dowOffset; //the day of week the year begins on
			day = (day >= 0 ? day : day + 7);
			daynum = Math.floor((date.getTime() - newYear.getTime() - (date.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;

			//If the year starts before the middle of a week
			if(day < 4) {
					weeknum = Math.floor((daynum+day-1)/7) + 1;
				if(weeknum > 52) {
					nYear = new Date(date.getFullYear() + 1,0,1);
					nday = nYear.getDay() - dowOffset;
					nday = nday >= 0 ? nday : nday + 7;
					/*If the next year starts before the middle of
					the week, it is week #1 of that year*/
					weeknum = nday < 4 ? 1 : 53;
				}
			}
			else {
				weeknum = Math.floor((daynum+day-1)/7);
			}
			return weeknum;
		},

		// Returns number of days in a month at any given year. (Month is 1-12)
		daysInMonth: function(month,year) {
			// By Entering day 0 of the month the last day of the previous month is generated. 
			// month +1 (next month) -1 (compensate for 0-11)
			var dd = new Date(year, month, 0);
			return dd.getDate();
		}, 

		// Returns an jrDate with the date for easter sunday. This date is the bases for all easter related hoidays. 
		easterSunday: function(year){
			var a,b,c,d,e,f,g,h,i,j,k,m,month,day,easterSunday;

			year = year*1;
			a = year % 19;
			b = Math.floor(year/100);
			c = year % 100;
			d = Math.floor(b/4);
			e = b % 4;
			f = Math.floor((b+8) / 25);
			g = Math.floor((b-f+1) / 3);
			h = (19*a + b - d - g + 15) % 30;
			i = Math.floor(c/4);
			j = c % 4;
			k = (32 + 2*e + 2*i - h - j) % 7;
			m = Math.floor((a + 11*h + 22*k) / 451);
			month = Math.floor((h + k - 7*m + 114) / 31);
			day = ((h + k - 7*m +114) % 31) + 1;
			easterSunday = this.jrDate(year,month, day);
			
			return easterSunday;
		},

		/*	
		*	Get the Easter holidays and add them to the caliendar object.
		*/

		getEaster: function(cal, year){

			var days_in_march, days_in_april, days_in_may, easter, month, dayE, dayGF, dayEM, daysInMonth,
			dayKH, monthKH, daysinNextMonth, dayPD, monthPD, daysinNextMonth;

			days_in_march = this.daysInMonth(3,year);
			days_in_april = this.daysInMonth(4,year);
			days_in_may = this.daysInMonth(5,year);
			easter = this.easterSunday(year);

			//Easter Day
			month = easter.month;
			dayE = easter.day;

			

			cal[year][month][dayE].holiday = 'Easter Day';
			cal[year][month][dayE].t_holiday = 'Påskdagen';
		
			//Långfredag, Good Friday
			dayGF = dayE - 2;
			if(dayGF <= 0){
				month = 3;
				dayGF = days_in_march + dayGF;
			}	
			cal[year][month][dayGF].holiday = 'Good Friday';
			cal[year][month][dayGF].t_holiday = 'Långfredag';
		

			//AnnandagPåsk, Easter Monday
			dayEM = dayE + 1;
			if(dayEM > days_in_march){
				month = 4; 
				dayEM = dayEM - days_in_march;
			}
			cal[year][month][dayEM].holiday = 'Easter Monday';
			cal[year][month][dayEM].t_holiday = 'Annandag Påsk';
			
			//Kristi Himmelsfärd, Ascension of Jesus
			dayKH = dayE + 39;
			monthKH = easter.month;
			daysinNextMonth = this.daysInMonth(monthKH+1, year);
			
			while(dayKH > daysinNextMonth){
				dayKH -= daysinNextMonth;
				monthKH++;
				daysinNextMonth = this.daysInMonth(monthKH+1, year);
			}
			cal[year][month][dayKH].holiday = 'Ascension';
			cal[year][month][dayKH].t_holiday = 'Kristi himmelsfärd';
			
			//Pinstdagen, Pentecost
			dayPD = dayE + 49;
			monthPD = easter.month;
			daysinNextMonth = this.daysInMonth(monthPD+1, year);
			
			while(dayPD > daysinNextMonth){
				dayPD -= daysinNextMonth;
				monthPD++;
				daysinNextMonth = this.daysInMonth(monthPD+1, year);
			}
			cal[year][month][dayPD].holiday = 'Pentecost';
			cal[year][month][dayPD].t_holiday = 'Pingstdagen';

		},

		/*
		*	Determine when all saints day is and add it to the calendar
		*/
		allSaintsDay: function(cal, year){
			var date, weekday, month, day;

			date = this.jrDate(year,10,31);
			weekday = date.getDay();
			
			if(weekday != 6){
				date = this.jrDate(year, 11, 6 - weekday);
			}
			month = date.month;
			day =  date.date;
			cal[year][month][day].holiday = 'All Saints Day';
			cal[year][month][day].t_holiday = 'Alla helgons dag';
		},
		
		/*
		*	Determine when Midsummer is and add it to the calendar
		*/
		midSummer: function (cal, year){
			var day, date, weekday

			//Midsummers day is on the first saterday after the 19:th of June
			var day = 19;
			var date = this.jrDate(year,6,day);
			var weekday = date.getDay();
			
			if(weekday < 5){
				day += 5 - weekday;
			}else if(weekday == 6){
				day += 6;
			}
			// Midsummers Eve
			cal[year][6][day].holiday = 'Midsummers Eve';
			cal[year][6][day].t_holiday = 'Midsommarafton';
			// Midsummers Day
			day++;
			cal[year][6][day].holiday = 'Midsummers Day';
			cal[year][6][day].t_holiday = 'Midsommardagen';
		},

		/*
		*	Helper function: Determine if a date is a saturday
		*/
		isSaturday: function(date){
			if(date.getDay() == 6) return true;
			return false;
		},

		/*
		*	Get all the Swedish holidays and apply them to a calendar object
		*/
		setHolidays: function(cal, year){
			// Holidays on calculated dates
			this.getEaster(cal, year);
			this.allSaintsDay(cal, year);
			this.midSummer(cal, year);
			// Holidays on fixed dates
			cal[year][5][1].holiday = 'May First';
			cal[year][5][1].t_holiday = 'Först maj';
			cal[year][1][1].t_holiday = 'Nyårsdagen';
			cal[year][1][1].holiday = 'New Years Day'
			cal[year][1][6].holiday = 'Epiphany';
			cal[year][1][6].t_holiday = 'Trettondagen';
			cal[year][12][24].holiday = 'Christmas Eve';
			cal[year][12][24].t_holiday = 'Julafton';
			cal[year][12][25].holiday = 'Christmas Day';
			cal[year][12][25].t_holiday = 'Juldagen';
			cal[year][12][26].holiday = 'Boxing Day';
			cal[year][12][26].t_holiday = 'Annandag jul';
			cal[year][6][6].holiday = 'National Day';
			cal[year][6][6].t_holiday = 'Nationaldagen';
		},

		// Generate the calendar object for any given year. 
		// If this function is called again for a new year it will add that year. 
		// Calling this on an existing year will overwrite it. (Be careful) 
		initCal: function(cal, year){
			var days;

			if(cal === undefined) cal = {};
			if(year === undefined) year = new Date().getFullYear();
			if(!cal[year]){
				cal[year] = [];
			}

			for(var i = 1; i < 13; i++){
				cal[year][i] = [];
				days = this.daysInMonth(i, year);
				for(var j = 1; j < days +1; j++){
					var d = new Date(year, i-1, j).getDay();
					cal[year][i][j] = this.Day();
					cal[year][i][j].weekday = d;
				}
			}

			this.setHolidays(cal, year);
		}

	
	};// End of Calendar object

    return jrcalendar;
})