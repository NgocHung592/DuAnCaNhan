window.updateSanPhamController = function ($http, $scope, $routeParams) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.detailProduct = {
    id: "",
    ma: "",
    ten: "",
    moTa: "",
    daXoa: Boolean,
  };

  $http
    .get(sanPhamAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.detailProduct = response.data;
        console.log($scope.detailProduct);
      }
    });

  $scope.update = function (id) {
    $http
      .put(sanPhamAPI + "/update/" + id, $scope.detailProduct)
      .then(function () {
        $scope.message = "Cập nhật thành công";
      });
  };
};
