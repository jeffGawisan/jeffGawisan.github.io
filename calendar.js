(function(){
	"use strict";

	angular.module("myApp", [])

	.directive("createCalendar", ["$filter", "calendarFct", "vars",
		function($filter, calendarFct, vars){
			return {
				restrict : "EA",
				scope : {
					setDate: "=setDate"
				},
				link : function(scope, elem, attr){
					scope.setDate = $filter('date')(scope.setDate, calendarFct.dateFormat);
					scope.title = calendarFct.getMonthName(scope.setDate);
					scope.totalDays = calendarFct.getDays(scope.setDate);
					scope.showMonths = [];
					scope.showCalendar = false;

					console.log(scope.totalDays);

					scope.showOptions = function(option){
						if(isNaN(option)){
							// reset the value of totalDays
							scope.totalDays = [];
							scope.showMonths = [];
							var lastIndex = 0;

							console.log(scope.showMonths);

							for(var a = 0; a < vars.months.length; a++){
								if(a % 3 === 0){
									var obj = {};
									obj.months = [];
									scope.showMonths.push(obj);

									if(scope.showMonths.length > 1) lastIndex++;
								}

								var obj2 = {};
								obj2.name = vars.months[a];
								obj2.colspan = ((a-1) % 3 === 0) ? 3 : 2;

								scope.showMonths[lastIndex].months.push(obj2);
							}
						}
					};
				},
				template:
					"<div class='j-calendar-container col-xs-4'>"+
					"	<div class='input-group'>"+
					"		<input type='text' class='form-control text-center col-xs-3' ng-model='setDate' disabled>"+
					"		<div class='input-group-addon'>"+
					"			<span ng-click='showCalendar = !showCalendar' class='glyphicon glyphicon-calendar j-calendar-icon' aria-hidden='true'></span>"+
					"		</div>"+
					"	</div>"+
					"	<p></p>"+
					"	<div ng-show='showCalendar'>"+
					"		<table class='table table-bordered table-striped' style='width:250px'>"+
					"			<thead>"+
					"				<tr>"+
					"					<th>"+
					"						<button class='btn btn-sm btn-info'>"+
					"							<span class='glyphicon glyphicon-circle-arrow-left' aria-hidden='true'></span>"+
					"						</button>"+
					"					</th>"+
					"					<th style='text-align:center'colspan='5'>"+
					"						<button class='btn btn-link' ng-click='showOptions(title)'> {{title}} </button> </th>"+
					"					<th>"+
					"						<button class='btn btn-sm btn-info'>"+
					"							<span class='glyphicon glyphicon-circle-arrow-right' aria-hidden='true'></span>"+
					"						</button>"+
					"					</th>"+
					"				</tr>"+
					"				<tr ng-if='totalDays.length > 0'>"+
					"					<th style='text-align:center'>Sun</th>"+
					"					<th style='text-align:center'>Mon</th>"+
					"					<th style='text-align:center'>Tue</th>"+
					"					<th style='text-align:center'>Wed</th>"+
					"					<th style='text-align:center'>Thu</th>"+
					"					<th style='text-align:center'>Fri</th>"+
					"					<th style='text-align:center'>Sat</th>"+
					"				</tr>"+
					"			</thead>"+
					"			<tbody>"+
					"				<tr ng-if='totalDays.length > 0' ng-repeat='weeks in totalDays'>"+
					"					<td ng-repeat='days in weeks.weekdays track by $index'>{{days}}</td>"+
					"				</tr>"+
					"			</tbody>"+
					"		</table>"+
					"	</div>"+
					"</div>",
			}
		}
	])
	
	.constant("vars", {
		// add your desired date format here
		dateFormat : ["yyyy-MM-dd", "mm-dd-yyyy", "MMMM dd, yyyy"],
		months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	})

	.factory("calendarFct", ["vars",
		function(vars){
			return{
				// change here the date format
				dateFormat: vars.dateFormat[2],
				generate: function(){

				},
				getDays: function(date){
					var disDate = new Date(date);
					console.log(disDate);
					var year = disDate.getFullYear();
					var month = disDate.getMonth();
					var totalDays =  new Date(year, month + 1, 0).getDate();
					var arr = [];
					var lastIndex = 0;
					var additionalDays = 7 - totalDays % 7;

					for(var a = 0; a < totalDays; a++){
						if(a % 7 === 0){
							var obj = { weekdays : [] };
							arr.push(obj);
							
							if(arr.length > 1) lastIndex++;
						}
						
						arr[lastIndex].weekdays.push(a+1);
					}

					for(var b = 0; b < additionalDays; b++){
						arr[lastIndex].weekdays.push("");
					}

					return arr;
				},
				getMonthName: function(date){
					var disDate = new Date(date);
					var month = disDate.getMonth();

					return vars.months[month];
				}
			}
		}
	])

	.controller("calendarCtrl",[
		function(){
			this.currentDate = new Date();
		}
	])
}());