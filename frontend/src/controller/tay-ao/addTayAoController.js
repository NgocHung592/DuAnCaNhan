window.addTayAoController = function ($http, $scope, $location) {
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
    if ($scope.formTayAo.ten == "") {
      $scope.message = "Tên tay áo không được trống";
      return false;
    } else {
      $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
        $location.path("/tay-ao/hien-thi");
        return true;
      });
    }
  };
};
