window.updateKhachHangController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $http
    .get(khachHangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKhachHang = response?.data;
      console.log($scope.detailKhachHang);
      // const groupedKhachHang = {};
      // $scope.detailKhachHang.forEach((khachHang) => {
      //   const tenKhachHang = khachHang.hoTen;

      //   if (!groupedKhachHang[tenKhachHang]) {
      //     groupedKhachHang[tenKhachHang] = {
      //       ...khachHang,
      //       diaChi: [sanPham.tenMauSac],
      //       tenKichThuoc: [sanPham.tenKichThuoc],
      //       duongDan: [sanPham.duongDan],
      //       giaMin: sanPham.donGia,
      //       giaMax: sanPham.donGia,
      //     };
      //   } else {
      //     if (
      //       !groupedSanPham[tenSanPham].tenMauSac.includes(sanPham.tenMauSac)
      //     ) {
      //       groupedSanPham[tenSanPham].tenMauSac.push(sanPham.tenMauSac);
      //     }
      //     if (
      //       !groupedSanPham[tenSanPham].tenKichThuoc.includes(
      //         sanPham.tenKichThuoc
      //       )
      //     ) {
      //       groupedSanPham[tenSanPham].tenKichThuoc.push(sanPham.tenKichThuoc);
      //     }
      //     if (!groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)) {
      //       groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
      //     }
      //   }
      // });

      // $scope.newDetailKhachHang = Object.values(groupedKhachHang);

      // console.log($scope.newDetailKhachHang);
    });
  var date = new Date();
  $scope.update = function (id1, id2, event) {
    let check = true;
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.detailKhachHang.khachHang.anhdaidien = image.name;
    }
    $scope.updateKhachHang = {
      ma: $scope.detailKhachHang.khachHang.ma,
      hoten: $scope.detailKhachHang.khachHang.hoten,
      email: $scope.detailKhachHang.khachHang.email,
      gioitinh: $scope.detailKhachHang.khachHang.gioitinh,
      ngaysinh: $scope.detailKhachHang.khachHang.ngaysinh,
      matkhau: $scope.detailKhachHang.khachHang.matkhau,
      anhdaidien: $scope.detailKhachHang.khachHang.anhdaidien,
      sodienthoai: $scope.detailKhachHang.khachHang.sodienthoai,
      ngaysinh: $scope.detailKhachHang.khachHang.ngaysinh,
      tinhthanhpho: $scope.detailKhachHang.tinhthanhpho,
      quanhuyen: $scope.detailKhachHang.quanhuyen,
      phuongxa: $scope.detailKhachHang.phuongxa,
      ngaysua: ($scope.detailKhachHang.khachHang.ngaysua = date),
      ngaytao: $scope.detailKhachHang.khachHang.ngaytao,
      trangthai: $scope.detailKhachHang.khachHang.trangthai,
      mota: $scope.detailKhachHang.mota,
    };
    if (check) {
      $http
        .put(
          khachHangAPI + "/update/" + id1 + "/" + id2,
          $scope.updateKhachHang
        )
        .then(function () {
          alert("Cập nhật thành công");
          $location.path("/khach-hang/hien-thi");

          return true;
        })
        .catch(function (errorResponse) {
          if (errorResponse && errorResponse.preventDefault) {
            errorResponse.preventDefault();
          }
          alert("Email hoặc số điện thoại đã tồn tại");
        });
    } else {
      event.preventDefault();
    }
  };

  $scope.show = Boolean;

  var date = new Date();
  $scope.form_dc = {
    tinhthanhpho: "",
    quanhuyen: "",
    phuongxa: "",
    ngaytao: date,
    mota: "",
    trangthai: 1,
  };
  $scope.addDiaChi = function () {
    console.log($scope.form_nv);
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
    if (
      $scope.form_dc.tinhthanhpho != "" &&
      $scope.form_dc.quanhuyen != "" &&
      $scope.form_dc.phuongxa != "" &&
      $scope.form_dc.mota != ""
    ) {
      $http
        .post(
          khachHangAPI + "/addid/" + $scope.detailKhachHang.khachHang.id,
          $scope.form_dc
        )
        .then(function () {
          $scope.message = "Thêm thành công";
          console.log(from_dc);
          $scope.show = true;
          return true;
        });
    } else {
      $scope.message = "Thêm thất bại";
      $scope.show = false;
      return false;
    }
  };
  $scope.show = Boolean;

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
      $scope.form_dc.tinhthanhpho = $("#city option:selected").text();
      $scope.form_dc.quanhuyen = $("#district option:selected").text();
      $scope.form_dc.phuongxa = $("#ward option:selected").text();
    }
  };
};
