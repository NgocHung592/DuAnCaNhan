window.updateTayAoController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.formTayAo = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(tayAoAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formTayAo = response.data;
    }
  });

  $scope.update = function (id) {
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
    if ($scope.formTayAo.ten == "") {
      $scope.message = "Tên tay áo không được trống";
      return;
    } else {
      $scope.updateTayAo = {
        ten: $scope.formTayAo.ten,
        ngaySua: new Date(),
        daXoa: $scope.formTayAo.daXoa,
      };
      $http
        .put(tayAoAPI + "/update/" + id, $scope.updateTayAo)
        .then(function () {
          $location.path("/tay-ao/hien-thi");
        });
    }
  };
};
