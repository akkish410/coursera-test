(function(){
    'use strict';
    var app = angular.module('restaurant',[]);
    app.controller('menuctrl',menuctrl)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems);


    function FoundItems() {
      var ddo = {
          templateUrl: 'listItem.html'
         //template: '<li><b>Name:</b> {{item.name}} <b>Shortname:</b> {{item.shortname}}<b> Description:</b> {{item.description}} <button ng-click="menu.removeItem($index);">Do not want this one!</button></li>'
      };

      return ddo;
    }

    menuctrl.$inject = ['MenuCategoriesService'];

    function menuctrl(MenuCategoriesService) {
      var menu = this;
      menu.itemName = "";
      menu.getItems = function (itemName) {
          menu.content = [];
          menu.errorMessage = "";
          if(menu.itemName) {
              var promise = MenuCategoriesService.getMenuItems();
              promise.then(function (response) {
                  var categories = response.data.menu_items;
                //   console.log(categories);
                //   console.log(itemName);
                  var length = categories.length;
                  for(var i=0; i<length; i++) {
                      if(categories[i].description.indexOf(itemName.toLowerCase()) !== -1) {
                          var item = {
                                name: categories[i].name,
                                shortname: categories[i].short_name,
                                description: categories[i].description
                            }
                            menu.content.push(item);
                      }
                  }
                  if(menu.content.length == 0) {
                      menu.errorMessage = "Nothing found!";
                  }
                });
          }
          else {
              menu.errorMessage = "Nothing found!";
          }
      }

      menu.removeItem = function (index) {
          menu.content.splice(index,1);
      }

    }


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {

  var service = this;
  var found =[];
  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

}

})();
