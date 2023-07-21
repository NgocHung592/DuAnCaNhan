window.ThuChiController = function ($http, $scope, $location) {
  $scope.list_thuchi = [];

  //load table
  $http.get(thuChiAPI + "/hien-thi").then(function (response) {
    $scope.list_thuchi = response.data;
    console.log(list_thuchi);
  });
};
