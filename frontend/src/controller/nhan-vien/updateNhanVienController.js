window.updateNhanVienController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailNhanVien = response?.data;
      $scope.detailNhanVien.ngaySinh = new Date(response.data.ngaySinh);
    });

  $scope.update = function (event) {
    event.preventDefault();
    let check = true;
    $scope.showTen = true;
    $scope.showEmail = true;
    $scope.showSdt = true;
    $scope.showMota = true;
    $scope.showT = true;
    $scope.showP = true;
    $scope.showQ = true;
    let ht = $scope.detailNhanVien.hoTen;

    var date = new Date();
    const hinhanh = document.getElementById("product-image");
    console.log(hinhanh);
    for (const image of hinhanh.files) {
      $scope.detailNhanVien.anhDaiDien = image.name;
    }

    $scope.updateNhanVien = {
      ma: $scope.detailNhanVien.ma,
      hoTen: $scope.detailNhanVien.hoTen,
      email: $scope.detailNhanVien.email,
      gioiTinh: $scope.detailNhanVien.gioTtinh,
      ngayTao: $scope.detailNhanVien.ngayTao,
      soDienThoai: $scope.detailNhanVien.soDienThoai,
      ngaySinh: $scope.detailNhanVien.ngaySinh,
      trangThai: $scope.detailNhanVien.trangThai,
      anhDaiDien: $scope.detailNhanVien.anhDaiDien,
      ngaySua: ($scope.detailNhanVien.ngaySua = date),
      tinhThanhPho: $scope.detailNhanVien.tinhThanhPho,
      quanHuyen: $scope.detailNhanVien.quanHuyen,
      moTa: $scope.detailNhanVien.moTa,
      phuongXa: $scope.detailNhanVien.phuongXa,
    };
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const vietnamPhoneRegex =
      /^(?:\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;

    // if (ht.length == 0 || ht.length > 50 || specialChars.test(ht)) {
    //   $scope.showTen = false;
    //   check = false;
    // }
    // if (!emailRegex.test(email)) {
    //   console.log(email);
    //   $scope.showEmail = false;

    //   check = false;
    // }
    // if (
    //   soDienThoai.length == 0 ||
    //   specialChars.test(soDienThoai) ||
    //   !vietnamPhoneRegex.test(soDienThoai)
    // ) {
    //   $scope.showSdt = false;

    //   check = false;
    // }
    // if (mota.length == 0 || mota.length > 51 || specialChars.test(moTa)) {
    //   $scope.showMota = false;

    //   check = false;
    // }
    // if (tinhthanhpho == "" || specialChars.test(tinhThanhPho)) {
    //   $scope.showT = false;

    //   check = false;
    // }
    // if (quanHuyen == "" || specialChars.test(quanHuyen)) {
    //   $scope.showQ = false;

    //   check = false;
    // }
    // if (phuongXa == "" || specialChars.test(phuongXa)) {
    //   $scope.showP = false;

    //   check = false;
    // }
    // if (check) {
    $http
      .put(nhanVienAPI + "/update/" + $routeParams.id, $scope.updateNhanVien)
      .then(function () {
        alert("Cập nhật thành công");
        $location.path("/nhan-vien/hien-thi");
        $scope.show = true;
        return true;
      })
      .catch(function (errorResponse) {
        if (errorResponse && errorResponse.preventDefault) {
          errorResponse.preventDefault();
        }
        alert("Email hoặc số điện thoại đã tồn tại");
        $scope.show = true;
      });
    // } else {
    //   event.preventDefault();
    // }
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
    });
  };
  $scope.getCity();
  $scope.toggleAPI = function (event, type) {
    // Mở hoặc đóng dropdown tương ứng
    if (type === "ThanhPho") {
      $scope.showDropDownThanhPho = !$scope.showDropDownThanhPho;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownQuanHuyen = false;
    } else if (type === "QuanHuyen") {
      $scope.showDropDownQuanHuyen = !$scope.showDropDownQuanHuyen;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownThanhPho = false;
    } else if (type === "PhuongXa") {
      $scope.showDropDownPhuongXa = !$scope.showDropDownPhuongXa;

      $scope.showDropDownQuanHuyen = false;
      $scope.showDropDownThanhPho = false;
    }
    event.stopPropagation();
  };
  $scope.selectOptionThanhPho = function (index, option) {
    let diaChi = $scope.detailNhanVien[index];
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
    diaChi.quanHuyen = null;
    diaChi.phuongXa = null;

    $scope.showDropDownThanhPho = false;
    $scope.showDropDownQuanHuyen = false;
  };
  $scope.selectOptionQuanHuyen = function (index, option) {
    let diaChi = $scope.detailNhanVien[index];
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
      });
    }
    diaChi.phuongXa = null;
    $scope.showDropDownQuanHuyen = false;
    $scope.showDropDownPhuongXa = false;
  };
  $scope.selectOptionPhuongXa = function (index, option) {
    let diaChi = $scope.detailNhanVien[index];
    diaChi.phuongXa = option;
    $scope.showDropDownPhuongXa = false;
  };
  document.addEventListener("click", function (event) {
    var dropdownContainer = document.querySelector(".dropdown-container");

    if (!dropdownContainer.contains(event.target)) {
      $scope.$apply(function () {
        $scope.showDropDownThanhPho = false;
        $scope.showDropDownQuanHuyen = false;
        $scope.showDropDownPhuongXa = false;
      });
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
      $scope.detailNhanVien.tinhThanhPho = $("#city option:selected").text();
      $scope.detailNhanVien.quanHuyen = $("#district option:selected").text();
      $scope.detailNhanVien.phuongXa = $("#ward option:selected").text();
    }
  };
};
