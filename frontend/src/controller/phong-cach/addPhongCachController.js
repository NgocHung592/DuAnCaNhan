window.addPhongCachController = function ($http, $scope, $location) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.randoom = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };

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
    if ($scope.formPhongCach.ten == "") {
      $scope.message = "Tên Phong Cách Không Được Trống";
      return false;
    } else {
      $http.post(phongCachAPI + "/add", $scope.formPhongCach).then(function () {
        $location.path("/phong-cach/hien-thi");
      });
      return true;
    }
  };
};
