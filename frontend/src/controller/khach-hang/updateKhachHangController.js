window.updateKhachHangController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $document
) {
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.form_dc = {
    diaChiMacDinh: false,
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $http
    .get(khachHangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKhachHang = response?.data;
      console.log($scope.detailKhachHang);
    });
  $scope.detailDiaChi = function () {
    $http
      .get(diaChiAPI + "/detail/" + $routeParams.id)
      .then(function (response) {
        $scope.detailDiaChi = response?.data;
        console.log($scope.detailDiaChi);
      });
  };
  $scope.detailDiaChi();

  $scope.updateKhachHang = function (event) {
    event.preventDefault();
    let check = true;
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.detailKhachHang.anhDaiDien = image.name;
    }
    $scope.khachHangUpdate = {
      hoTen: $scope.detailKhachHang.hoTen,
      email: $scope.detailKhachHang.email,
      gioiTinh: $scope.detailKhachHang.gioiTinh,
      ngaySinh: $scope.detailKhachHang.ngaySinh,
      anhDaiDien: $scope.detailKhachHang.anhDaiDien,
      soDienThoai: $scope.detailKhachHang.soDienThoai,
      ngaySua: new Date(),
      daXoa: $scope.detailKhachHang.daXoa,
    };
    if (check) {
      $http
        .put(
          khachHangAPI + "/update/" + $routeParams.id,
          $scope.khachHangUpdate
        )
        .then(function () {
          alert("Cập nhật thành công");
        });
    }
  };

  $scope.addDiaChi = function () {
    if (
      $scope.form_dc.tinhThanhPho != "" &&
      $scope.form_dc.quanHuyen != "" &&
      $scope.form_dc.phuongXa != "" &&
      $scope.form_dc.diaChiCuThe != ""
    ) {
      $http
        .post(diaChiAPI + "/add/" + $routeParams.id, $scope.form_dc)
        .then(function () {
          alert("them thanh cong");
          $http
            .get(diaChiAPI + "/detail/" + $routeParams.id)
            .then(function (response) {
              $scope.detailDiaChi = response?.data;
            });
        });
    } else {
      alert("them that bai");
    }
  };
  $scope.updateDiaChi = function (index, event, idDiaChi) {
    event.preventDefault();
    $scope.updateDC = {
      diaChiMacDinh: $scope.detailDiaChi[index].diaChiMacDinh,
      diaChiCuThe: $scope.detailDiaChi[index].diaChiCuThe,
      tinhThanhPho: $scope.detailDiaChi[index].tinhThanhPho,
      quanHuyen: $scope.detailDiaChi[index].quanHuyen,
      phuongXa: $scope.detailDiaChi[index].phuongXa,
      ngaySua: new Date(),
    };
    $http
      .put(diaChiAPI + "/update/" + idDiaChi, $scope.updateDC)
      .then(function () {
        alert("cap nhat thanh cong");
      });
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
      console.log($scope.cityOptions);
    });
  };
  $scope.getCity();

  $scope.dropDownThanhPho = function (event) {
    var dropDownThanhPho = document.getElementById("dropDownThanhPho");
    dropDownThanhPho.style.display =
      dropDownThanhPho.style.display === "block" ? "none" : "block";
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display = "none";
    var dropDownPhuongXa = document.getElementById("dropDownPhuongXa");
    dropDownPhuongXa.style.display = "none";
    event.stopPropagation();
  };
  $scope.dropDownQuanHuyen = function (event) {
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display =
      dropDownQuanHuyen.style.display === "block" ? "none" : "block";
    var dropDownThanhPho = document.getElementById("dropDownThanhPho");
    dropDownThanhPho.style.display = "none";
    var dropDownPhuongXa = document.getElementById("dropDownPhuongXa");
    dropDownPhuongXa.style.display = "none";
    event.stopPropagation();
  };
  $scope.dropDownPhuongXa = function (event) {
    var dropDownPhuongXa = document.getElementById("dropDownPhuongXa");
    dropDownPhuongXa.style.display =
      dropDownPhuongXa.style.display === "block" ? "none" : "block";
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display = "none";
    var dropDownThanhPho = document.getElementById("dropDownThanhPho");
    dropDownThanhPho.style.display = "none";
    event.stopPropagation();
  };

  $scope.selectOptionThanhPho = function (diaChi, option) {
    diaChi.tinhThanhPho = option;
    let selectedCityCode = "";

    $scope.cityOptions.find((city) => {
      if (city.name === option) {
        selectedCityCode = city.code;
      }
    });
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response?.data.districts;
      });
    }
    var dropDownThanhPho = document.getElementById("dropDownThanhPho");
    dropDownThanhPho.style.display = "none";
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display = "none";
  };
  $scope.selectOptionQuanHuyen = function (diaChi, option) {
    diaChi.quanHuyen = option;
    let selectedDistrictCode = "";

    $scope.districtOptions.find((district) => {
      if (district.name === option) {
        selectedDistrictCode = district.code;
      }
    });
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response?.data.wards;
        console.log($scope.wardOptions);
      });
    }
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display = "none";
  };
  $scope.selectOptionPhuongXa = function (diaChi, option) {
    diaChi.phuongXa = option;
    var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
    dropDownQuanHuyen.style.display = "none";
  };
  document.addEventListener("click", function (event) {
    var dropdown_container = document.getElementById("dropdown-container");

    if (event.target !== dropdown_container) {
      var dropDownThanhPho = document.getElementById("dropDownThanhPho");
      dropDownThanhPho.style.display = "none";
    }
    if (event.target !== dropdown_container) {
      var dropDownQuanHuyen = document.getElementById("dropDownQuanHuyen");
      dropDownQuanHuyen.style.display = "none";
    }
    if (event.target !== dropdown_container) {
      var dropDownPhuongXa = document.getElementById("dropDownPhuongXa");
      dropDownPhuongXa.style.display = "none";
    }
  });

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
    let row = ' <option disable value="">Mời chọn</option>';
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
};
