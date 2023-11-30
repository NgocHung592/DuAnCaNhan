window.updateMaGiamGiaController = function ($http, $scope, $routeParams) {
  $scope.showTen = true;
  $scope.showSoLuong = true;
  $scope.showTT = true;
  $scope.showTD = true;
  $scope.showBD = true;
  $scope.showKT = true;

  $scope.detailProduct = {
    id: "",
    ma: "",
    tenKM: "",
    hinhThucGiam: "",
    trangThai: "",
    soLuong: "",
    giaTriDonToiThieu: "",
    giaTriGiamToiDa: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  };

  $http
    .get(magiamgiaAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response.data.ngayBatDau);
        response.data.ngayBatDau = new Date(
          response.data.ngayBatDau.split("+")[0].split(".")[0]
        );
        response.data.ngayKetThuc = new Date(
          response.data.ngayKetThuc.split("+")[0].split(".")[0]
        );
        if (
          response.data.ngayBatDau.getHours() < 5 ||
          (response.data.ngayBatDau.getHours() > 12 &&
            response.data.ngayBatDau.getHours() < 17)
        ) {
          response.data.ngayBatDau.setHours(
            response.data.ngayBatDau.getHours() + 12 - 5
          );
        } else {
          response.data.ngayBatDau.setHours(
            response.data.ngayBatDau.getHours() - 5
          );
        }
        if (
          response.data.ngayKetThuc.getHours() < 5 ||
          (response.data.ngayKetThuc.getHours() > 12 &&
            response.data.ngayKetThuc.getHours() < 17)
        ) {
          response.data.ngayKetThuc.setHours(
            response.data.ngayKetThuc.getHours() + 12 - 5
          );
        } else {
          response.data.ngayKetThuc.setHours(
            response.data.ngayKetThuc.getHours() - 5
          );
        }
        console.log(response.data);
        $scope.detailProduct = response.data;
        //document.getElementById("inputNkt").value = $scope.detailProduct.ngayKetThuc.split("+")[0].split(".")[0];
        //document.getElementById("inputNbd").value = $scope.detailProduct.ngayBatDau.split("+")[0].split(".")[0];
      }
    });

  $scope.update = function (id, event) {
    $scope.showTen = true;
    $scope.showSoLuong = true;
    $scope.showTT = true;
    $scope.showTD = true;
    $scope.showBD = true;
    $scope.showKT = true;
    let check = true;
    let ten = $scope.detailProduct.tenKM;
    let tt = $scope.detailProduct.giaTriDonToiThieu;
    let td = $scope.detailProduct.giaTriGiamToiDa;
    let ht = $scope.detailProduct.hinhThucGiam;
    let sl = $scope.detailProduct.soLuong;
    let bd = $scope.detailProduct.ngayBatDau;
    let kt = $scope.detailProduct.ngayKetThuc;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regex = /[^0-9a-zA-Z]/;
    if (bd == null) {
      $scope.showBD = false;
      check = false;
    } else if (bd.length == 0) {
      $scope.showBD = false;
      check = false;
    } else {
      let unix = Date.parse(bd);
      var date = new Date(unix);
      var curr = new Date();
      if (date < curr) {
        $scope.showBD = false;
        check = false;
      }
    }
    if (kt == null) {
      $scope.showKT = false;
      check = false;
    } else if (kt.length == 0) {
      $scope.showKT = false;
      check = false;
    } else {
      let unixBD = Date.parse(bd);
      var dateBD = new Date(unixBD);
      if (isNaN(dateBD.getTime())) {
        $scope.showKT = false;
        check = false;
      } else {
        let unix = Date.parse(kt);
        var date = new Date(unix);
        if (date < dateBD) {
          $scope.showKT = false;
          check = false;
        }
      }
    }
    if (ten == null) {
      $scope.showTen = false;
      check = false;
    } else if (ten.length == 0 || ten.length > 100 || specialChars.test(ten)) {
      $scope.showTen = false;
      check = false;
    }
    if (tt == null) {
      $scope.showTT = false;
      check = false;
    } else if (
      tt.length == 0 ||
      parseInt(tt) < 1000 ||
      parseInt(tt) != parseFloat(tt)
    ) {
      $scope.showTT = false;
      check = false;
    }
    if (parseInt(ht) == 0) {
      if (tt == null || tt.length == 0) {
        $scope.showTD = false;
        check = false;
      } else if (
        td == null ||
        td.length == 0 ||
        parseInt(td) < 0 ||
        parseInt(td) >= parseInt(tt) ||
        parseInt(td) != parseFloat(td)
      ) {
        $scope.showTD = false;
        check = false;
      }
    } else {
      if (
        td == null ||
        td.length == 0 ||
        parseFloat(td) < 0 ||
        parseFloat(td) > 100
      ) {
        $scope.showTD = false;
        check = false;
      }
    }
    if (
      sl == null ||
      sl.length == 0 ||
      parseInt(sl) < 0 ||
      parseInt(sl) != parseFloat(sl)
    ) {
      $scope.showSoLuong = false;
      check = false;
    }
    if (check) {
      $http
        .put(magiamgiaAPI + "/update/" + id, $scope.detailProduct)
        .then(function () {
          alert("Cập nhật thành công");
        });
    } else {
      event.preventDefault();
    }
  };
};
