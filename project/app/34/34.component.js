/*
 * 34.component.js
 * Autor: Lucas Costa
 * data: Janeiro de 2020
 */
(()=> {
    "user strict"

    angular
        .module("lucasfrct")
        .component("treefour", {
            templateUrl: "app/34/34.html",
            controller: ["$scope", TreeFourController]
        })

    function TreeFourController($scope) {
        
    }
})()