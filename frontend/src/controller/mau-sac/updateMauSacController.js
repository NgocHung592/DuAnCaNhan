window.updateMauSacController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.formMauSac = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(mauSacAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formMauSac = response.data;
      console.log($scope.formMauSac);
    }
  });

  $scope.update = function (id) {
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    $http.get(api_url + "/id?hex=" + color).then(function (response) {
      $scope.formMauSac.ten = response.data.name.value;
      $scope.updateMauSac = {
        ma: $scope.formMauSac.ma,
        ten: $scope.formMauSac.ten,
        ngaySua: new Date(),
        daXoa: $scope.formMauSac.daXoa,
      };
      $http
        .put(mauSacAPI + "/update/" + id, $scope.updateMauSac)
        .then(function () {
          $location.path("/mau-sac/hien-thi");
        });
    });
  };
};
