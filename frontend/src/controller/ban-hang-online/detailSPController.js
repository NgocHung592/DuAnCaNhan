window.detaiSPController = function ($http, $scope, $location) {
    $scope.totalPages = [];
    $scope.products = [];
    $scope.productDetails = [];
    $scope.sizeAndQuantitys = [];
    $scope.colors = [];
    $scope.sizeAndColors = [];
    $scope.newSizeAndColors = [];

    $scope.currentPage = 0;
    $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;

    $scope.product = {
        maSanPham: $scope.randoomSanPham,
        tenSanPham: "",
        moTa: "",
        idPhongCach: "",
        idChatLieu: "",
        idHoaTiet: "",
        idCoAo: "",
        idTayAo: "",
        idMauSac: "",
        daXoa: false,
    };
    $scope.sizeAndQuantity = {
        tenKichThuoc: "",
        soLuong: "",
        gia: "",
        urlImage: "",
    };
    $scope.color = {
        tenMauSac: "",
    };
    $scope.selectedFiles = [];

    $scope.selectFile = function (tenMauSac, index) {
        var productImageInput = document.getElementById("product-image");

        // Loại bỏ sự kiện "change" hiện tại
        // productImageInput.removeEventListener("change", handleImageChange);

        productImageInput.click();

        // Thêm sự kiện "change" mới cho sản phẩm mới
        productImageInput.addEventListener("change", handleImageChange);

        function handleImageChange(event) {
            $scope.$apply(function () {
                var selectedFiles = event.target.files;
                console.log(selectedFiles);
                if (
                    $scope.groupedProducts[tenMauSac] &&
                    $scope.groupedProducts[tenMauSac].length > index
                ) {
                    var product = $scope.groupedProducts[tenMauSac];
                    console.log(product);
                    product.forEach((product) => {
                        for (const file of selectedFiles) {
                            var newProduct = Object.assign({}, product);
                            newProduct.urlImage = file.name;
                            $scope.newSizeAndColors.push(newProduct);
                            return;
                        }
                    });
                }
            });

            // Loại bỏ sự kiện "change" sau khi đã xử lý
            productImageInput.removeEventListener("change", handleImageChange);
        }
    };


    $scope.renderMota = function (tenSanPham) {
        $http.get(sanPhamAPI + "/find/" + tenSanPham).then(function (response) {
            $scope.product.moTa = response.data.moTa;
        });
    };


    //load thuoc tinh theo trang thai kich hoat
    $scope.getChatLieuTrangThai = function () {
        $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
            $scope.listChatLieuTrangThai = response.data;
        });
    };
    $scope.getChatLieuTrangThai();

    $scope.getSanPhamTrangThai = function (response) {
        $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
            $scope.listSanPhamTrangThai = response.data;
        });
    };
    $scope.getSanPhamTrangThai();

    $scope.getHoaTietTrangThai = function () {
        $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
            $scope.listHoaTietTrangThai = response.data;
        });
    };
    $scope.getHoaTietTrangThai();

    $scope.getPhongCachTrangThai = function () {
        $http.get(phongCachAPI + "/trang-thai").then(function (response) {
            $scope.listPhongCachTrangThai = response.data;
        });
    };
    $scope.getPhongCachTrangThai();

    $scope.getKichThuocTrangThai = function () {
        $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
            $scope.listKichThuocTrangThai = response.data;
        });
    };

    $scope.getMauSacTrangThai = function () {
        $http.get(mauSacAPI + "/trang-thai").then(function (response) {
            $scope.listMauSacTrangThai = response.data;
        });
    };
    $scope.getMauSacTrangThai();

    $scope.getCoAoTrangThai = function () {
        $http.get(coAoAPI + "/trang-thai").then(function (response) {
            $scope.listCoAoTrangThai = response.data;
        });
    };
    $scope.getCoAoTrangThai();

    $scope.getTayAoTrangThai = function () {
        $http.get(tayAoAPI + "/trang-thai").then(function (response) {
            $scope.listTayAoTrangThai = response.data;
        });
    };
    $scope.getTayAoTrangThai();

    //add nhanh thuoc tinh
    $scope.randoomCL = "CL" + Math.floor(Math.random() * 10000) + 1;

    $scope.formChatLieu = {
        ma: $scope.randoomCL,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.randoomPC = "PC" + Math.floor(Math.random() * 10000) + 1;

    $scope.formPhongCach = {
        ma: $scope.randoomPC,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.randoomHT = "HT" + Math.floor(Math.random() * 10000) + 1;

    $scope.formHoaTiet = {
        ma: $scope.randoomHT,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.randoomCA = "CA" + Math.floor(Math.random() * 10000) + 1;

    $scope.formCoAo = {
        ma: $scope.randoomCA,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.randoomTA = "TA" + Math.floor(Math.random() * 10000) + 1;

    $scope.formTayAo = {
        ma: $scope.randoomTA,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.randoomKT = "KT" + Math.floor(Math.random() * 10000) + 1;

    $scope.formKichThuoc = {
        ma: $scope.randoomKT,
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };

    $scope.formMauSac = {
        ma: "",
        ten: "",
        ngayTao: new Date(),
        daXoa: false,
    };


    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");
    if (toastTrigger) {
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastTrigger.addEventListener("click", () => {
            toastBootstrap.show();
        });
    }
};
