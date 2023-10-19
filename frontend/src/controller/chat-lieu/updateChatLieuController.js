window.updateChatLieuController = function (
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
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
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

    if ($scope.formChatLieu.ten == "") {
      $scope.message = "Tên Chất Liệu Không Được Trống";
      return false;
    } else {
      $http
        .put(chatLieuAPI + "/update/" + id, $scope.formChatLieu)
        .then(function () {
          $location.path("/chat-lieu/hien-thi");
        });
      return true;
    }
  };
};
