window.addChatLieuController = function ($http, $scope, $location) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }

  $scope.randoom = "CL" + Math.floor(Math.random() * 10000) + 1;

  $scope.formChatLieu = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };

  $scope.add = function (e) {
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
    if ($scope.formChatLieu.ten == "") {
      $scope.message = "Tên Chất Liệu Không Được Trống";
      return false;
    } else {
      $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
        $location.path("/chat-lieu/hien-thi");
      });
      return true;
    }
  };
};
