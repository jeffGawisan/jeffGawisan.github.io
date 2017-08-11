(function(){
	"use strict"

	angular.module("myApp", ["app.module.directives"])

	.directive("addModal", function(UsersFct){
		return {
			restrict : "E",
			link : function(scope, attr, elem){
				scope.UsersFct = UsersFct;
				scope.close = function(){
					UsersFct.modalClose();
				}

				scope.submit = function(user){
					if(UsersFct.modal.trigger.add){
						UsersFct.addUser(user);
					} else if(UsersFct.modal.trigger.update){
						UsersFct.updateUser(user);
					}
					
					scope.close();
				};
			},
			template :
				"<div class='col-sm-6 col-sm-offset-3'>"+
				"	<div class='well'>"+
				"		<h1 class='text-center' ng-show='UsersFct.modal.trigger.add'>Add User</h1>"+
				"		<h1 class='text-center' ng-show='UsersFct.modal.trigger.update'>Update User</h1>"+
				"		<hr>" +
				"		<form name='myForm'>"+
				"			<label>First Name</label>"+
				"			<input type='text' class='form-control' placeholder='Input first name here...' ng-model='UsersFct.modal.submit.firstName' required/>"+
				"			<label>Last Name</label>"+
				"			<input type='text' class='form-control' placeholder='Input last name here...' ng-model='UsersFct.modal.submit.lastName' required/>"+
				"			<label>Nick Name</label>"+
				"			<input type='text' class='form-control' placeholder='Input nick name here...' ng-model='UsersFct.modal.submit.nickName' required/>"+
				"			<label>Abilities</label>"+
				"			<textarea class='form-control' placeholder='Input abilities here...' ng-model='UsersFct.modal.submit.abilities' required></textarea>"+
				"			<br/>"+
				"			<input type='button' class='btn btn-success' value='Add' ng-show='UsersFct.modal.trigger.add' ng-click='submit(UsersFct.modal.submit)' ng-disabled='myForm.$invalid'></button>"+
				"			<input type='button' class='btn btn-success' value='Update' ng-show='UsersFct.modal.trigger.update' ng-click='submit(UsersFct.modal.submit)' ng-disabled='myForm.$invalid'></button>"+
				"			<input type='button' class='btn btn-danger' value='Cancel' ng-click='close()'></button>"+
				"		</form>"+
				"	</div>"+
				"</div>",
		}
	})

	.factory("UsersFct", function(){
		return {
			users : [
				{ id : 0, firstName : "Robert Bruce", lastName : "Banner", nickName : "Hulk", abilities : "Super Strength, Super Speed" },
				{ id : 1, firstName : "Anthony Edward", lastName : "Stark", nickName : "Iron Man", abilities : "He's rich and genius" },
				{ id : 2, firstName : "Steven", lastName : "Rogers", nickName : "Captain America", abilities : "Enhanced physical abilities, Skilled in armed and unarmed combat" }
			],

			currentID : 3,
			addID: function(){
				this.currentID += 1;
			},

			modal : {
				open : false,
				trigger : {
					add : false,
					update : false,
				},
				submit : null
			},
			modalResetTrigger: function(){
				this.modal.trigger = {
					add : false,
					update : false
				};
			},
			modalOpen: function(trigger, user){
				this.modal.open = true;
				this.modal.trigger[trigger] = true;

				if(trigger == "add"){
					this.modal.submit = {
						id : this.currentID,
						firstName : null,
						lastName : null,
						nickName : null,
						abilities : null
					}
				} else if(trigger === "update"){
					this.modal.submit = {
						id : user.id,
						firstName : user.firstName,
						lastName : user.lastName,
						nickName : user.nickName,
						abilities : user.abilities
					}	
				}
				
			},
			modalClose: function(){
				this.modal.open = false;
				this.modalResetTrigger();
			},
			addUser: function(user){
				this.users.push(user);
				this.addID();
				console.log(this.users)
			},
			deleteUser: function(id){
				var result = this.findUser(id);
				if(result){
					this.users.splice(result.index, 1);
				}
			},
			updateUser: function(user){
				var result = this.findUser(user.id);

				if(result){
					var index = result.index;
					this.users[index].firstName = user.firstName;
					this.users[index].lastName = user.lastName;
					this.users[index].nickName = user.nickName;
					this.users[index].abilities = user.abilities;
				}
			},

			findUser: function(id){
				for(var a = 0; a < this.users.length; a++){
					console.log(id, this.users[a].id)
					if(id == this.users[a].id){
						return {
							index : a,
							user : this.users[a]
						}
					}
				}

				return null;
			}
		}
	})

	.controller("MainCtrl", function(UsersFct){
		console.log(UsersFct)
		this.UsersFct = UsersFct;
	})
}());