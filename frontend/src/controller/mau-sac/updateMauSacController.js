window.updateMauSacController = function ($http, $scope, $routeParams) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.formMauSac = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(mauSacAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formMauSac = response.data;
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
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    $http.get(api_url + "/id?hex=" + color).then(function (response) {
      $scope.formMauSac.ten = response.data.name.value;
      $http
        .put(mauSacAPI + "/update/" + id, $scope.formMauSac)
        .then(function () {
          $scope.message = "Cập Nhật Thành Công";
        });
    });
  };
};
