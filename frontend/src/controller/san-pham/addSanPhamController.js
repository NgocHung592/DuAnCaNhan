window.addSanPhamController = function ($http, $scope) {
  $scope.show = Boolean;
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
      $scope.add();
    });
  }
  $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.detailProduct = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    moTa: "",
    daXoa: false,
  };
  $scope.add = function () {
    if (
      $scope.detailProduct.ma != "" &&
      $scope.detailProduct.ten != "" &&
      $scope.detailProduct.moTa != ""
    ) {
      $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
        $scope.message = "Thêm thành công";
        $scope.show = false;
      });
    }
    $scope.message = "Thêm thất bại";
    $scope.show = false;
  };
};
