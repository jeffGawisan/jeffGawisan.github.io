(function(){
	"use strict";

	angular.module("app.module.directives", [])

	.directive("backDrop", function(){
		return {
			restrict : "E",
			transclude : true,
			scope: {
				open : "=open"
			},
			template :
				"<div class='backdrop' ng-show='open'>"+
				"	<div ng-transclude>"+
				"	</div>"+
				"</div>",
		}
	})
}());