(function(){
    'use strict';
    var shoppingList1 = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      }
    ];
    var app = angular.module('Shopping',[]);
    app.controller('ShoppingCtrl',shoppingListController)
    .service('ShoppingListService', ShoppingListService);

//    shoppingListController.$inject = ['$scope'];
    shoppingListController.$inject = ['ShoppingListService'];
    function shoppingListController(ShoppingListService) {
        var shopItem = this;
        shopItem.items = ShoppingListService.getItems();
        shopItem.boughtItems = ShoppingListService.getBoughtItems();
        shopItem.bought = function (itemIndex) {
                        ShoppingListService.removeItem(itemIndex);
        };
    }

    function ShoppingListService() {
      var service = this;

      // List of shopping items
      var item = shoppingList1;
      var item2 = [];

      service.removeItem = function (itemIdex) {
          item2.push(item[itemIdex]);
          item.splice(itemIdex, 1);

      };

      service.getItems = function () {
        return item;
      };

      service.getBoughtItems = function () {
          return item2;
      }
    }
})();
