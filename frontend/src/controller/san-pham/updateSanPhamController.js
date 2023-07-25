window.updateSanPhamController = function ($http, $scope, $routeParams) {
  $scope.show = Boolean;
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
    var elem = document.getElementById("myBar");
    var width = 0;
    var idpro = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(idpro);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    if (
      $scope.detailProduct.ma != "" &&
      $scope.detailProduct.ten != "" &&
      $scope.detailProduct.moTa != ""
    ) {
      $http
        .put(sanPhamAPI + "/update/" + id, $scope.detailProduct)
        .then(function () {
          $scope.message = "Cập nhật thành công";
          $scope.show = true;
          return true;
        });
    } else {
      $scope.message = " Cập nhật thất bại";
      $scope.show = false;
      return false;
    }
  };
};
