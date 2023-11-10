window.addMaGiamGiaController = function ($http, $scope) {
    $scope.showMa = true;
    $scope.showTen = true;
    $scope.showSoLuong = true;
    $scope.showTT = true;
    $scope.showTD = true;
    $scope.showBD = true;
    $scope.showKT = true;
    $scope.randoom = "KM" + Math.floor(Math.random() * 10000) + 1;

    $scope.detailProduct = {
        id: "",
        ma: "",
        tenKM: "",
        hinhThucGiam: "0",
        trangThai: "1",
        soLuong:"",
        giaTriDonToiThieu: "",
        giaTriGiamToiDa: "",
        ngayBatDau: "",
        ngayKetThuc: "",
    };

    $scope.add = function (event) {
        $scope.showMa = true;
        $scope.showTen = true;
        $scope.showSoLuong = true;
        $scope.showTT = true;
        $scope.showTD = true;
        $scope.showBD = true;
        $scope.showKT = true;
        let check = true;
        let ma = $scope.detailProduct.ma;
        let ten = $scope.detailProduct.tenKM;
        let tt = $scope.detailProduct.giaTriDonToiThieu;
        let td = $scope.detailProduct.giaTriGiamToiDa;
        let ht = $scope.detailProduct.hinhThucGiam;
        let sl = $scope.detailProduct.soLuong;
        let bd = $scope.detailProduct.ngayBatDau;
        let kt = $scope.detailProduct.ngayKetThuc;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const regex = /[^0-9a-zA-Z]/;
        //alert(bd);
        if(bd.length == 0) {
            $scope.showBD = false;
            check = false;
        } else {
            let unix = Date.parse(bd);
            var date = new Date(unix);
            var curr = new Date();
            if(date < curr) {
                $scope.showBD = false;
                check = false;
            }
        }
        if(kt.length == 0) {
            $scope.showKT = false;
            check = false;
        } else {
            let unixBD = Date.parse(bd);
            var dateBD = new Date(unixBD);
            if(isNaN(dateBD.getTime())) {
                $scope.showKT = false;
                check = false;
            } else {
                let unix = Date.parse(kt);
                var date = new Date(unix);
                if(date < dateBD) {
                    $scope.showKT = false;
                    check = false;
                }
            }
        }
        if(ma.length == 0 || ma.length > 10 || regex.test(ma)) {
            $scope.showMa = false;
            check = false;
        }
        if(ten.length == 0 || ten.length > 100 || specialChars.test(ten)) {
            $scope.showTen = false;
            check = false;
        }
        if(tt.length == 0 || parseInt(tt) < 1000 || parseInt(tt) != parseFloat(tt)) {
            $scope.showTT = false;
            check = false;
        }
        if(parseInt(ht) == 0) {
            if(tt.length == 0) {
                $scope.showTD = false;
                check = false;
            } else if (td.length == 0 || parseInt(td) < 0 || parseInt(td) >= parseInt(tt) || parseInt(td) != parseFloat(td)) {
                $scope.showTD = false;
                check = false;
            }
        } else {
            if (td.length == 0 || parseFloat(td) < 0 || parseFloat(td) > 100) {
                $scope.showTD = false;
                check = false;
            }
        }
        if (sl.length == 0 || parseInt(sl) < 0 || parseInt(sl) != parseFloat(sl)) {
            $scope.showSoLuong = false;
            check = false;
        }
        if(check) {
            $http.post(magiamgiaAPI + "/add", $scope.detailProduct).then(function () {
                alert("Thêm thành công");
                $scope.show = true;
                //window.location.href = magiamgiaAPI+"/hienthi";
            }).catch(
                function (e) {
                    event.preventDefault();
                    alert("Mã đã tồn tại");
                    $scope.show = true;
                    // window.location.href = "#ma-giam-gia/hienthi";

                }
            );
        } else {
            event.preventDefault();
        }
    };

}