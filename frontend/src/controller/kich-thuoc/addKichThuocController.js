window.addKichThuocController = function ($http, $scope, $location) {
  $scope.randoom = "KT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formKichThuoc = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  console.log($scope.formKichThuoc);
  $scope.add = function (e) {
    e.preventDefault();
    let elem = document.getElementById("myBar");
    let width = 0;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    if ($scope.formKichThuoc.ten === "") {
      $scope.message = "Tên kích thước không được trống";
    } else {
      $http.post(kichThuocAPI + "/add", $scope.formKichThuoc).then(function () {
        $location.path("/kich-thuoc/hien-thi");
      });
    }
  };
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
};
