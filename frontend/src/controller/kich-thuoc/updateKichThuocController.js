window.updateKichThuocController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $scope.formKichThuoc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Boolean,
  };

  $http
    .get(kichThuocAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formKichThuoc = response.data;
      }
    });

  $scope.update = function (e, idKichThuoc) {
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
      return;
    } else {
      $scope.updateKichThuoc = {
        ten: $scope.formKichThuoc.ten,
        ngaySua: new Date(),
        daXoa: $scope.formKichThuoc.daXoa,
      };
      $http
        .put(kichThuocAPI + "/update/" + idKichThuoc, $scope.updateKichThuoc)
        .then(function () {
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
