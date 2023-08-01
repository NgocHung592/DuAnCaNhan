window.updateChatLieuController = function ($http, $scope, $routeParams) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };

  $http
    .get(chatLieuAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formChatLieu = response.data;
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
    $http
      .put(chatLieuAPI + "/update/" + id, $scope.formChatLieu)
      .then(function () {
        $scope.message = "Cập Nhật Thành Công";
      });
  };
};
