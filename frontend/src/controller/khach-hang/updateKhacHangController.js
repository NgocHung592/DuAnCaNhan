window.updateKhachHangController = function ($http, $scope, $routeParams) {
  $scope.list_Hang = [];

  $http
    .get(khachHangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKhachHang = response.data;
      console.log($scope.detailKhachHang);
    });

  $scope.list_Hang = function () {
    $http.get(hangKhachHangAPI + "/trang-thai").then(function (response) {
      $scope.list_Hang = response.data;
    });
  };
  $scope.list_Hang();
  $scope.update = function (id) {
    $scope.updateKhachHang = {
      ma: $scope.detailKhachHang.ma,
      ten: $scope.detailKhachHang.hoten,
      idHangKhachHang: $scope.detailKhachHang.hangKhachHang.id,
      email: $scope.detailKhachHang.email,
      ngaytao: $scope.detailKhachHang.ngaytao,
      sodienthoai: $scope.detailKhachHang.sodienthoai,
      ngaysinh: $scope.detailKhachHang.ngaysinh,
      trangthai: $scope.detailKhachHang.trangthai,
    };
    $http
      .put(khachHangAPI + "/update/" + id, $scope.updateKhachHang)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
  $scope.show = Boolean;
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  const host = "https://provinces.open-api.vn/api/";
  var callAPI = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data, "city");
    });
  };
  callAPI("https://provinces.open-api.vn/api/?depth=1");
  var callApiDistrict = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.districts, "district");
    });
  };
  var callApiWard = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.wards, "ward");
    });
  };

  var renderData = (array, select) => {
    let row = ' <option disable value=""></option>';
    array.forEach((element) => {
      row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  $("#city").change(() => {
    callApiDistrict(
      host + "p/" + $("#city").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#district").change(() => {
    callApiWard(
      host + "d/" + $("#district").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#ward").change(() => {
    printResult();
  });
  $scope.randoom = "DC" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.form_dc = {
    ten: $scope.randoom,
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngayTao: date,
    idTaiKhoan: $routeParams.id,
    mota: "",
    trangThai: 1,
  };
  var printResult = () => {
    if (
      $("#district").find(":selected").data("id") != "" &&
      $("#city").find(":selected").data("id") != "" &&
      $("#ward").find(":selected").data("id") != ""
    ) {
      $scope.form_dc.tinhThanhPho = $("#city option:selected").text();
      $scope.form_dc.quanHuyen = $("#district option:selected").text();
      $scope.form_dc.phuongXa = $("#ward option:selected").text();
    }
  };

  $scope.addDiaChi = function () {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 15);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }

    $http.post(diaChiAPI + "/add", $scope.form_dc).then(function () {
      $scope.message = "Thêm thành công";
      console.log(form_dc);
      $scope.show = true;
      return true;
    });
  };
};
