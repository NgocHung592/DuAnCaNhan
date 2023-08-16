window.updateTayAoController = function ($http, $scope, $routeParams) {
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
    $http.put(tayAoAPI + "/update/" + id, $scope.formTayAo).then(function () {
      $scope.message = "Cập Nhật Thành Công";
    });
  };
};
