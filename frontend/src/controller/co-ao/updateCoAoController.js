window.updateCoAoController = function ($http, $scope, $routeParams) {
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
    $http.put(coAoAPI + "/update/" + id, $scope.formCoAo).then(function () {
      $scope.message = "Cập Nhật Thành Công";
    });
  };
};
