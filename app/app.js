angular.module('wsCalc', ['ngRoute', 'ngAnimate', 'angular-velocity'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/', {
			templateUrl : 'app/home.html',
			controller : 'calculatorCtrl'
		})
		.when('/new-meal', {
			templateUrl : 'app/details.html',
			controller : 'calculatorCtrl'
		})
		.when('/my-earnings', {
			templateUrl : 'app/earnings.html',
			controller : 'calculatorCtrl'
		});
		$locationProvider.html5Mode(true);
	}])
	.controller('calculatorCtrl', function($scope){	


		
		// Define function for cancel.
		$scope.cancel = function(){
			$scope.baseMeal = 0;
			$scope.taxRate = 0;
			$scope.tipPercent = 0;
		}	

		// Define function for initial state.
		$scope.initialize = function(){
			$scope.meals = [];
			$scope.chargesTotal = 0;
			$scope.chargesSubtotal = 0;
			$scope.chargesTip = 0;
			$scope.myTips = 0;
			$scope.avgTip = 0;
			$scope.cancel();
		}

		$scope.initialize();


		$scope.addMeal = function(mealBasePrice, mealTaxRate, mealTipPercent, mealSubtotal, mealTip, mealTotal){
			$scope.chargesSubtotal = mealSubtotal;
			$scope.chargesTip = mealTip;
			$scope.chargesTotal = mealTotal;

			$scope.myTips = 0;
			// Function that adds to the meals object.
			$scope.meals.push({
				'basePrice': mealBasePrice,
				'taxRate': mealTaxRate,
				'tipPercent': mealTipPercent,
				'totalPrice': mealTotal,
				'subTotal': mealSubtotal,
				'tips': mealTip
			});

			angular.forEach($scope.meals, function(num, i){
				$scope.myTips += num.tips;
				$scope.avgTip = $scope.myTips / $scope.meals.length;
			});


		}



		$scope.calculate = function(){
			// Function to calculate meal totals, only if form is valid.
			if($scope.calculator.$valid){
				baseMeal = $scope.baseMeal;
				taxRate = $scope.taxRate / 100;
				tipPercent = $scope.tipPercent / 100;
				subTotal = $scope.chargesSubtotal;
				tipAmt = $scope.chargesTip;

				subTotal = baseMeal + (baseMeal * taxRate);
				tipAmt = subTotal * tipPercent;
				totalPrice = subTotal + tipAmt;

				$scope.addMeal(baseMeal, taxRate, tipPercent, subTotal, tipAmt, totalPrice);
				$scope.cancel();
			}
		};
	});