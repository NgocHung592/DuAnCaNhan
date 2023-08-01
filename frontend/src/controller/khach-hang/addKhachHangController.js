window.addKhachHangController = function ($http, $scope, $rootScope) {
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
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_Hang = [];
  $scope.form_kh = {
    ma: $scope.randoom,
    ten: "",
    email: "",
    ngaysinh: "",
    sodienthoai: "",
    matkhau: "123",
    ngaytao: date,
    idHangKhachHang: "9309e014-df10-40d8-a01b-65091091e05f",
    trangthai: 1,
  };

  $rootScope.list_Hang = function () {
    $http.get(hangKhachHangAPI + "/trang-thai").then(function (response) {
      $scope.list_Hang = response.data;
    });
  };

  $rootScope.list_Hang();
  $scope.add = function () {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 15);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    if (
      $scope.form_kh.ma != "" &&
      $scope.form_kh.ten != "" &&
      $scope.form_kh.email != "" &&
      $scope.form_kh.ngaysinh != "" &&
      $scope.form_kh.sodienthoai != ""
    ) {
      $http.post(khachHangAPI + "/add", $scope.form_kh).then(function () {
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
