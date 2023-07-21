window.addSanPhamController = function ($http, $scope) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      $scope.message = "Thêm thành công";
      toastBootstrap.show();
    });
  }

  $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.detailProduct = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    moTa: "",
    trangThai: 1,
  };
  $scope.add = function (event) {
    event.preventDefault();
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {});
  };
};
