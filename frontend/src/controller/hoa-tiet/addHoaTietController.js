window.addHoaTietController = function ($http, $scope, $location) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.randoom = "HT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaTiet = {
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
    if ($scope.formHoaTiet.ten == "") {
      $scope.message = "Tên Họa Tiết Không Được Trống";
      return false;
    } else {
      $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
        $location.path("/hoa-tiet/hien-thi");
      });
      return true;
    }
  };
};
