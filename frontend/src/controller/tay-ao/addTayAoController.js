window.addTayAoController = function ($http, $scope) {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.randoom = "TA" + Math.floor(Math.random() * 10000) + 1;

  $scope.formTayAo = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.add = function (event) {
    event.preventDefault();
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
    if ($scope.formTayAo.ten != "") {
      $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
        $scope.message = "Thêm Thành Công";
        return true;
      });
    } else {
      $scope.message = "Thêm Thất Bại";
      return false;
    }
  };
};
