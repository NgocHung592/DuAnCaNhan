window.addMauSacController = function ($http, $scope) {
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
    ma: "",
    ten: "",
    daXoa: false,
  };

  $scope.add = function () {
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

    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    $http.get(api_url + "/id?hex=" + color).then(function (response) {
      $scope.formMauSac.ten = response.data.name.value;
      $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
        $scope.message = "Thêm Thành Công";
      });
    });
  };
};
