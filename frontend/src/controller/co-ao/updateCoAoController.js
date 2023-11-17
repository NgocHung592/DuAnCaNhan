window.updateCoAoController = function (
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
  $scope.formCoAo = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(coAoAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formCoAo = response.data;
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
    if ($scope.formCoAo.ten == "") {
      $scope.message = "Tên cổ áo không được để trống";
      return;
    }
    $scope.updateCoAo = {
      ten: $scope.formCoAo.ten,
      ngaySua: new Date(),
      daXoa: $scope.formCoAo.daXoa,
    };
    $http.put(coAoAPI + "/update/" + id, $scope.updateCoAo).then(function () {
      $location.path("/co-ao/hien-thi");
    });
  };
};
