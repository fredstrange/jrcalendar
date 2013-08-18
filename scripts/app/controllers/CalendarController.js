define(["ember", "models/dayModel"], function(Ember, DayModel){
	var CalendarController = Ember.ArrayController.extend({

		currentYear: new Date().getFullYear(),
		startMonth: 1,
		numMonths: 3,
		holidays: {},
		calendar: [],

		conTest: function(){
			return "test";
		},

		init: function(){
			this._super();
			this.initYear();
		},

		filteredMonths: function(){
			var year, startMonth, numMonths, calendar, filteredArray;

			year = this.get('currentYear');
			startMonth = this.get('startMonth');
			numMonths = this.get('numMonths');
			calendar = this.get('calendar');

			filteredArray = calendar.filter(function(item, index, enumerable){
				var itemYear = item.get('year'),
					itemMonth = item.get('month');

				return (itemYear == year && itemMonth >= startMonth && itemMonth <= (startMonth + numMonths - 1));
			});

			return filteredArray;
		}.property('calendar.@each', 'startMonth', 'numMonths', 'currentYear'),

		isFirstMonth: function(item, second){
			console.log(item);
			console.log(second);
		}.property('startMonth'),


		initYear: function(year){
			var day, dayModel, days, cal, year, holidays, lang;
			
			cal = this.get('calendar');
			holidays = this.get('holidays');
			lang = 'en';

			if(!cal) cal = [];
			if(!year) year = new Date().getFullYear();
			this.generateHolidays(holidays, year);
			this.set('holidays', holidays);

			for(var month = 1; month < 13; month++){
				days = this.daysInMonth(month, year);
				for(var date = 1; date < days +1; date++){
					day = new Date(year, month-1, date).getDay();

					dayModel = DayModel.create({
						year: year,
						month: month,
						date: date, 
						day: day
					});

					if(	holidays[year] !== undefined 
						&& holidays[year][month] !== undefined 
						&& holidays[year][month][date] !== undefined
						&& holidays[year][month][date][lang] !== undefined){
						dayModel.set('holiday', holidays[year][month][date][lang]);
					}

					cal.push(dayModel);
				}
			}

			
			this.set('calendar', cal);
		},

		// Returns number of days in a month at any given year. (Month is 1-12)
		daysInMonth: function(month,year) {
			// By Entering day 0 of the month the last day of the previous month is generated. 
			// month +1 (next month) -1 (compensate for 0-11)
			var dd = new Date(year, month, 0);
			return dd.getDate();
		}, 

		/*
		*	Get all the Swedish holidays and apply them to a calendar object
		*/
		generateHolidays: function(holidays, year){
			if(!holidays) holidays = {};

			// Holidays on fixed dates
			this.setHoliday(holidays, year, 5, 1, 'en', 'May First');
			this.setHoliday(holidays, year, 5, 1, 'sv', 'Först maj');
			this.setHoliday(holidays, year, 1, 1, 'en', 'New Years Day');
			this.setHoliday(holidays, year, 1, 1, 'sv', 'Nyårsdagen');
			this.setHoliday(holidays, year, 1, 6, 'en', 'Epiphany');
			this.setHoliday(holidays, year, 1, 6, 'sv', 'Trettondagen');
			this.setHoliday(holidays, year, 12, 24, 'en', 'Christmas Eve');
			this.setHoliday(holidays, year, 12, 24, 'sv', 'Juldagen');
			this.setHoliday(holidays, year, 12, 25, 'en', 'Christmas Day');
			this.setHoliday(holidays, year, 12, 25, 'sv', 'Juldagen');
			this.setHoliday(holidays, year, 12, 26, 'en', 'Boxing Day');
			this.setHoliday(holidays, year, 12, 26, 'sv', 'Annandag jul');
			this.setHoliday(holidays, year, 6, 6, 'en', 'National Day');
			this.setHoliday(holidays, year, 6, 6, 'sv', 'Nationaldagen');

			// Holidays on calculated dates
			this.getEaster(holidays, year);
			this.allSaintsDay(holidays, year);
			this.midSummer(holidays, year);
		},

		setHoliday: function(holidays, year, month, date, lang, name){
			if(!holidays) holidays = {};
			if(!holidays[year]) holidays[year] = {};
			if(!holidays[year][month]) holidays[year][month] = {};
			if(!holidays[year][month][date]) holidays[year][month][date] = {};
			if(!lang) lang = 'en';
			holidays[year][month][date][lang] = name;
		},

		/*
		*	Determine when Midsummer is and add it to the Holidays
		*/
		midSummer: function (holidays, year){
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
			this.setHoliday(holidays, year, 6, day, 'en', 'Midsummers Eve');
			this.setHoliday(holidays, year, 6, day, 'sv', 'Midsommarafton');
			// Midsummers Day
			day++;
			this.setHoliday(holidays, year, 6, day, 'en', 'Midsummers Day');
			this.setHoliday(holidays, year, 6, day, 'sv', 'Midsommardagen');
		},

		/*
		*	Determine when all saints day is and add it to the holidays
		*/
		allSaintsDay: function(holidays, year){
			var date, weekday, month, day;

			date = this.jrDate(year,10,31);
			weekday = date.getDay();
			
			if(weekday != 6){
				date = this.jrDate(year, 11, 6 - weekday);
			}
			month = date.month;
			day =  date.date;

			this.setHoliday(holidays, year, month, day, 'en', 'All Saints Day');
			this.setHoliday(holidays, year, month, day, 'sv', 'Alla helgons dag');
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

		getEaster: function(holidays, year){

			var days_in_march, days_in_april, days_in_may, easter, month, dayE, dayGF, dayEM, daysInMonth,
			dayKH, monthKH, daysinNextMonth, dayPD, monthPD, daysinNextMonth;

			days_in_march = this.daysInMonth(3,year);
			days_in_april = this.daysInMonth(4,year);
			days_in_may = this.daysInMonth(5,year);
			easter = this.easterSunday(year);

			//Easter Day
			month = easter.month;
			dayE = easter.day;

			this.setHoliday(holidays, year, month, dayE, 'en', 'Easter Day');
			this.setHoliday(holidays, year, month, dayE, 'sv', 'Påskdagen');
		
			//Långfredag, Good Friday
			dayGF = dayE - 2;
			if(dayGF <= 0){
				month = 3;
				dayGF = days_in_march + dayGF;
			}

			this.setHoliday(holidays, year, month, dayGF, 'en', 'Good Friday');
			this.setHoliday(holidays, year, month, dayGF, 'sv', 'Långfredag');

			//AnnandagPåsk, Easter Monday
			dayEM = dayE + 1;
			if(dayEM > days_in_march){
				month = 4; 
				dayEM = dayEM - days_in_march;
			}

			this.setHoliday(holidays, year, month, dayEM, 'en', 'Easter Monday');
			this.setHoliday(holidays, year, month, dayEM, 'sv', 'Annandag Påsk');
			
			//Kristi Himmelsfärd, Ascension of Jesus
			dayKH = dayE + 39;
			monthKH = easter.month;
			daysinNextMonth = this.daysInMonth(monthKH+1, year);
			
			while(dayKH > daysinNextMonth){
				dayKH -= daysinNextMonth;
				monthKH++;
				daysinNextMonth = this.daysInMonth(monthKH+1, year);
			}

			this.setHoliday(holidays, year, month, dayKH, 'en', 'Ascension');
			this.setHoliday(holidays, year, month, dayKH, 'sv', 'Kristi himmelsfärd');
			
			//Pinstdagen, Pentecost
			dayPD = dayE + 49;
			monthPD = easter.month;
			daysinNextMonth = this.daysInMonth(monthPD+1, year);
			
			while(dayPD > daysinNextMonth){
				dayPD -= daysinNextMonth;
				monthPD++;
				daysinNextMonth = this.daysInMonth(monthPD+1, year);
			}

			this.setHoliday(holidays, year, month, dayPD, 'en', 'Pentecost');
			this.setHoliday(holidays, year, month, dayPD, 'sv', 'Pingstdagen');

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

	});

	return CalendarController;
});
