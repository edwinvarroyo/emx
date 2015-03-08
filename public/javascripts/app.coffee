app = angular.module 'app',[]

homeController = (scope,window) ->
	scope.login = () ->
		console.log("login")
		window.location.href = '/login'
		return
	scope.signup = () ->
		console.log("signup")
		window.location.href  = '/signup'
		return

homeController.$inject = ['$scope','$window']
app.controller('homeCtrl', homeController)