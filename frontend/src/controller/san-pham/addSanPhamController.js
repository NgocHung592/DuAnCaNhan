window.addSanPhamController = function ($http, $scope) {
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
  $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.detailProduct = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    moTa: "",
    daXoa: false,
  };
  $scope.add = function () {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
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
      $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
        $scope.message = "Thêm thành công";
        $scope.show = true;
        return true;
      });
    } else {
      $scope.message = "Thêm thất bại";
      $scope.show = false;
      return false;
    }
  };
};
