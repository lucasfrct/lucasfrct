/*
 * 55.component.js
 * Autor: Lucas Costa
 * Data: Janeiro de 2020
 */
(()=> {
    "use strict"

    angular
        .module("lucasfrct")
        .component("fivefive", {
            templateUrl: "app/55/55.html",
            controller: ["$scope", FiveFiveController]
        })

    function FiveFiveController($scope) {
        
    }
})()