window.updateHoaTietController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $scope.formHoaTiet = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http
    .get(hoaTietAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formHoaTiet = response.data;
      }
    });

  $scope.update = function (idHoaTiet) {
    let elem = document.getElementById("myBar");
    let width = 0;
    let idp = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(idp);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }

    if ($scope.formHoaTiet.ten === "") {
      $scope.message = "Tên họa tiết không được trống";
      return null;
    } else {
      $scope.updateHoaTiet = {
        ten: $scope.formHoaTiet.ten,
        ngaySua: new Date(),
        daXoa: $scope.formHoaTiet.daXoa,
      };
      $http
        .put(hoaTietAPI + "/update/" + idHoaTiet, $scope.updateHoaTiet)
        .then(function () {
          $location.path("/hoa-tiet/hien-thi");
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
