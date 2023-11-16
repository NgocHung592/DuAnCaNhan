window.updatePhongCachController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $scope.formPhongCach = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http
    .get(phongCachAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formPhongCach = response.data;
      }
    });

  $scope.update = function (e, idPhongCach) {
    e.preventDefault();
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

    if ($scope.formPhongCach.ten === "") {
      $scope.message = "Tên phong cách không được để trống ";
      return;
    }
    $scope.updatePhongCach = {
      ten: $scope.formPhongCach.ten,
      ngaySua: new Date(),
      daXoa: $scope.formPhongCach.daXoa,
    };
    $http
      .put(phongCachAPI + "/update/" + idPhongCach, $scope.updatePhongCach)
      .then(function () {
        $location.path("/phong-cach/hien-thi");
      });
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
