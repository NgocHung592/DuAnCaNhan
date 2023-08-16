window.addNhanVienController = function ($http, $scope, $rootScope) {
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
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_tv = [];
  $scope.form_nv = {
    ma: $scope.randoom,
    ten: "",
    email: "",
    ngaysinh: "",
    sodienthoai: "",
    cmt: "",
    matkhau: "123",
    ngaytao: date,
    idVaiTro: "Nhân Viên",
    trangthai: 1,
  };

  $rootScope.list_tv = function () {
    $http.get(vaiTroAPI + "/trang-thai").then(function (response) {
      $scope.list_tv = response.data;
    });
  };
  $rootScope.list_tv();
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
      $scope.form_nv.ma != "" &&
      $scope.form_nv.ten != "" &&
      $scope.form_nv.email != "" &&
      $scope.form_nv.ngaysinh != "" &&
      $scope.form_nv.sodienthoai != "" &&
      $scope.form_nv.cmt != ""
    ) {
      $http.post(nhanVienAPI + "/add", $scope.form_nv).then(function () {
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
