// ================== DỮ LIỆU KHỞI TẠO (MÔ PHỎNG DATABASE) ==================
let categories = [
    { CategoryID: 1, CategoryName: "Kinh tế" },
    { CategoryID: 2, CategoryName: "Kỹ năng sống" },
    { CategoryID: 3, CategoryName: "Thiếu nhi" },
    { CategoryID: 4, CategoryName: "Truyện tranh" },
    { CategoryID: 5, CategoryName: "Nghệ thuật" },
    { CategoryID: 6, CategoryName: "Tâm lý" },
    { CategoryID: 7, CategoryName: "Thưởng thức" }
];

let products = [
    {
        ProductID: 1,
        CategoryID: 6,
        ProductName: "Tâm Lý Học Đám Đông (Tái Bản 2022)",
        ProductDescription: "Tác phẩm kinh điển của Gustave Le Bon phân tích tâm lý và hành vi của đám đông.",
        ProductPrice: 112000.00,
        ProductImage: "https://placehold.co/200x280/e67e22/ffffff?text=Tam+Ly+Hoc+Dam+Dong"
    },
    {
        ProductID: 2,
        CategoryID: 4,
        ProductName: "Thám tử lừng danh Conan (tái bản 2023)",
        ProductDescription: "Truyện tranh trinh thám nổi tiếng của tác giả Gosho Aoyama - Tập 100.",
        ProductPrice: 24200.00,
        ProductImage: "https://placehold.co/200x280/2980b9/ffffff?text=Conan+Tap+100"
    },
    {
        ProductID: 3,
        CategoryID: 1,
        ProductName: "Người giàu nhất thành Babylons",
        ProductDescription: "Bí quyết làm giàu và quản lý tài chính cá nhân từ thành cổ Babylon.",
        ProductPrice: 180000.00,
        ProductImage: "https://placehold.co/200x280/27ae60/ffffff?text=Babylon"
    }
];

let customers = [
    { CustomerID: 1, CustomerName: "Nguyễn Văn An", Email: "an.nguyen@gmail.com", Phone: "0901234567", Address: "Quận 10, TP.HCM" },
    { CustomerID: 2, CustomerName: "Trần Thị Bích", Email: "bich.tran@gmail.com", Phone: "0912345678", Address: "Quận 3, TP.HCM" }
];

let orders = [
    { OrderID: 101, CustomerID: 1, OrderDate: "2024-10-15", TotalAmount: 292000, Status: "Đã giao", Items: [{ ProductName: "Tâm Lý Học Đám Đông (Tái Bản 2022)", Quantity: 1, Price: 112000 }, { ProductName: "Người giàu nhất thành Babylons", Quantity: 1, Price: 180000 }] },
    { OrderID: 102, CustomerID: 2, OrderDate: "2024-10-18", TotalAmount: 48400, Status: "Đang xử lý", Items: [{ ProductName: "Thám tử lừng danh Conan (tái bản 2023)", Quantity: 2, Price: 24200 }] }
];

let accounts = [
    { Username: "admin", Role: "Admin", Status: "Hoạt động" },
    { Username: "staff01", Role: "Admin", Status: "Hoạt động" }
];

// Biến lưu trạng thái Tìm kiếm, Sắp xếp, Phân trang của Product (ProductSearchVM)
let productSearchState = {
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    sortOrder: "name_asc",
    pageNumber: 1,
    pageSize: 2
};

// Biến lưu ảnh tạm khi upload
let tempUploadedImage = null;

// ================== ĐIỀU HƯỚNG TRANG (ROUTER) ==================
function setActiveNav(navId) {
    document.querySelectorAll('#adminNavbar li').forEach(li => li.classList.remove('active'));
    const activeEl = document.getElementById('nav-' + navId);
    if (activeEl) activeEl.classList.add('active');
}

function navigate(page, param = null) {
    tempUploadedImage = null;
    if (page === 'home') {
        setActiveNav('home');
        renderHome();
    } else if (page === 'categories') {
        setActiveNav('categories');
        renderCategoryIndex();
    } else if (page === 'category-create') {
        setActiveNav('categories');
        renderCategoryForm(null);
    } else if (page === 'category-edit') {
        setActiveNav('categories');
        renderCategoryForm(param);
    } else if (page === 'category-delete') {
        setActiveNav('categories');
        renderCategoryDelete(param);
    } else if (page === 'products') {
        setActiveNav('products');
        renderProductIndex();
    } else if (page === 'product-create') {
        setActiveNav('products');
        renderProductForm(null);
    } else if (page === 'product-edit') {
        setActiveNav('products');
        renderProductForm(param);
    } else if (page === 'product-details') {
        setActiveNav('products');
        renderProductDetails(param, false);
    } else if (page === 'product-delete') {
        setActiveNav('products');
        renderProductDetails(param, true);
    } else if (page === 'customers') {
        setActiveNav('customers');
        renderCustomers();
    } else if (page === 'orders') {
        setActiveNav('orders');
        renderOrders(param);
    } else if (page === 'accounts') {
        setActiveNav('accounts');
        renderAccounts();
    }
}

// ================== 1. TRANG HOME & THỐNG KÊ GOOGLE CHART ==================
function renderHome() {
    const view = document.getElementById('app-view');
    view.innerHTML = `
        <h2>TRANG QUẢN TRỊ</h2>
        <p class="text-muted">Chào mừng bạn đến với hệ thống quản trị website bán hàng My Store.</p>
        <div class="row" style="margin-top:20px;">
            <div class="col-md-4">
                <div class="panel panel-success">
                    <div class="panel-heading"><strong>Tổng số Danh mục</strong></div>
                    <div class="panel-body"><h3>${categories.length} danh mục</h3></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-info">
                    <div class="panel-heading"><strong>Tổng số Sản phẩm</strong></div>
                    <div class="panel-body"><h3>${products.length} sản phẩm</h3></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-warning">
                    <div class="panel-heading"><strong>Tổng số Đơn hàng</strong></div>
                    <div class="panel-body"><h3>${orders.length} đơn hàng</h3></div>
                </div>
            </div>
        </div>
        <div id="chart_div" style="width: 100%; height: 360px; border: 1px solid #eee; border-radius: 6px; padding: 10px;"></div>
    `;
    drawChart();
}

function drawChart() {
    if (typeof google === 'undefined' || !google.charts) return;
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        const dataArr = [['Danh mục', 'Số lượng sản phẩm']];
        categories.forEach(c => {
            const count = products.filter(p => p.CategoryID === c.CategoryID).length;
            dataArr.push([c.CategoryName, count]);
        });
        const data = google.visualization.arrayToDataTable(dataArr);
        const options = {
            title: 'Thống kê số lượng sản phẩm theo Danh mục',
            pieHole: 0.3
        };
        const chartEl = document.getElementById('chart_div');
        if (chartEl) {
            const chart = new google.visualization.PieChart(chartEl);
            chart.draw(data, options);
        }
    });
}

// ================== 2. QUẢN LÝ DANH MỤC (CATEGORY CRUD) ==================
function renderCategoryIndex() {
    let rows = categories.map(item => `
        <tr>
            <td>${escapeHtml(item.CategoryName)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="navigate('category-edit', ${item.CategoryID})">Cập nhật</button>
                <button class="btn btn-primary btn-sm" onclick="navigate('category-delete', ${item.CategoryID})">Xóa</button>
            </td>
        </tr>
    `).join('');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">DANH SÁCH DANH MỤC</h2>
        <table class="table bg-info col-md-12">
            <thead>
                <tr>
                    <th class="bg-success col-md-8">TÊN DANH MỤC</th>
                    <th class="bg-success col-md-4"></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <p>
            <button class="btn btn-primary" onclick="navigate('category-create')">Thêm mới</button>
        </p>
    `;
}

function renderCategoryForm(categoryId) {
    const isEdit = categoryId !== null;
    const category = isEdit ? categories.find(c => c.CategoryID === categoryId) : { CategoryID: 0, CategoryName: "" };
    const title = isEdit ? "CẬP NHẬT DANH MỤC" : "THÊM DANH MỤC";

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">${title}</h2>
        <form onsubmit="saveCategory(event, ${isEdit ? category.CategoryID : 'null'})">
            <div class="form-horizontal">
                <hr />
                <div id="cat-val-error" class="text-danger" style="margin-bottom:10px;"></div>
                <!-- Partial View: PVCreateEditCategory -->
                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Tên danh mục</strong></div>
                    <div class="col-md-10">
                        <input type="text" id="CategoryName" class="form-control" value="${escapeHtml(category.CategoryName)}" required />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input type="submit" value="Lưu" class="btn btn-primary" />
                        <button type="button" class="btn btn-primary" onclick="navigate('categories')">Quay lại danh sách</button>
                    </div>
                </div>
            </div>
        </form>
    `;
}

function saveCategory(event, categoryId) {
    event.preventDefault();
    const nameInput = document.getElementById('CategoryName').value.trim();
    if (!nameInput) {
        document.getElementById('cat-val-error').innerText = "Vui lòng nhập tên danh mục!";
        return;
    }
    if (categoryId === null) {
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.CategoryID)) + 1 : 1;
        categories.push({ CategoryID: newId, CategoryName: nameInput });
    } else {
        const cat = categories.find(c => c.CategoryID === categoryId);
        if (cat) cat.CategoryName = nameInput;
    }
    navigate('categories');
}

function renderCategoryDelete(categoryId) {
    const category = categories.find(c => c.CategoryID === categoryId);
    if (!category) return navigate('categories');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">XÓA DANH MỤC</h2>
        <h4 class="alert-danger">Bạn thực sự muốn xóa sản phẩm/danh mục này à?</h4>
        <div class="form-horizontal">
            <div class="form-group">
                <div class="control-label col-md-2"><strong>Tên danh mục</strong></div>
                <div class="col-md-10" style="padding-top:7px;">
                    ${escapeHtml(category.CategoryName)}
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-2 col-md-10">
                    <button class="btn btn-primary" onclick="confirmDeleteCategory(${category.CategoryID})">Xóa</button>
                    <button class="btn btn-primary" onclick="navigate('categories')">Quay lại danh sách</button>
                </div>
            </div>
        </div>
    `;
}

function confirmDeleteCategory(categoryId) {
    categories = categories.filter(c => c.CategoryID !== categoryId);
    navigate('categories');
}

// ================== 3 & 4. QUẢN LÝ SẢN PHẨM + TÌM KIẾM, SẮP XẾP, PHÂN TRANG ==================
function getCategoryName(categoryId) {
    const cat = categories.find(c => c.CategoryID === Number(categoryId));
    return cat ? cat.CategoryName : "Chưa phân loại";
}

function renderProductIndex() {
    const s = productSearchState;

    // 1. Lọc theo từ khóa (tên, mô tả, chủng loại) & khoảng giá
    let filtered = products.filter(p => {
        const term = s.searchTerm.toLowerCase().trim();
        const catName = getCategoryName(p.CategoryID).toLowerCase();
        const matchTerm = !term ||
            p.ProductName.toLowerCase().includes(term) ||
            p.ProductDescription.toLowerCase().includes(term) ||
            catName.includes(term);

        const matchMin = s.minPrice === "" || p.ProductPrice >= parseFloat(s.minPrice);
        const matchMax = s.maxPrice === "" || p.ProductPrice <= parseFloat(s.maxPrice);
        return matchTerm && matchMin && matchMax;
    });

    // 2. Sắp xếp
    filtered.sort((a, b) => {
        switch (s.sortOrder) {
            case "name_asc": return a.ProductName.localeCompare(b.ProductName, 'vi');
            case "name_desc": return b.ProductName.localeCompare(a.ProductName, 'vi');
            case "price_asc": return a.ProductPrice - b.ProductPrice;
            case "price_desc": return b.ProductPrice - a.ProductPrice;
            default: return a.ProductName.localeCompare(b.ProductName, 'vi');
        }
    });

    // 3. Phân trang (PagedList)
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / s.pageSize));
    if (s.pageNumber > totalPages) s.pageNumber = totalPages;
    const startIndex = (s.pageNumber - 1) * s.pageSize;
    const pagedProducts = filtered.slice(startIndex, startIndex + s.pageSize);

    // Tạo bảng danh sách sản phẩm (PVListProduct.cshtml)
    let listHtml = "";
    if (pagedProducts.length > 0) {
        let rows = pagedProducts.map(p => `
            <tr>
                <td><img src="${p.ProductImage}" class="product-list-img" alt="img" /></td>
                <td>${escapeHtml(p.ProductName)}</td>
                <td>${Number(p.ProductPrice).toFixed(2)}</td>
                <td>${escapeHtml(getCategoryName(p.CategoryID))}</td>
                <td class="btn-action-group">
                    <button class="btn btn-primary btn-sm" onclick="navigate('product-edit', ${p.ProductID})">Sửa</button>
                    <button class="btn btn-primary btn-sm" onclick="navigate('product-details', ${p.ProductID})">Chi tiết</button>
                    <button class="btn btn-primary btn-sm" onclick="navigate('product-delete', ${p.ProductID})">Xóa</button>
                </td>
            </tr>
        `).join('');

        let paginationLinks = "";
        for (let i = 1; i <= totalPages; i++) {
            paginationLinks += `<li class="${i === s.pageNumber ? 'active' : ''}"><a href="#" onclick="changeProductPage(${i}); return false;">${i}</a></li>`;
        }

        listHtml = `
            <h2 class="bg-success">DANH SÁCH SẢN PHẨM</h2>
            <table class="table bg-info table-responsive">
                <thead>
                    <tr>
                        <th class="bg-success col-md-2">Hình ảnh</th>
                        <th class="bg-success col-md-3">Tên sản phẩm</th>
                        <th class="bg-success col-md-2">Đơn giá</th>
                        <th class="bg-success col-md-2">Danh mục</th>
                        <th class="bg-success col-md-3"></th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
            <div class="text-center">
                <ul class="pagination" style="margin: 5px 0;">
                    ${paginationLinks}
                </ul>
            </div>
        `;
    } else {
        listHtml = `<p class="alert alert-warning" style="margin-top:20px;">Không tìm được sản phẩm nào phù hợp.</p>`;
    }

    document.getElementById('app-view').innerHTML = `
        <!-- Form tìm kiếm (Index.cshtml) -->
        <form onsubmit="handleProductSearch(event)">
            <div class="form-group search-container">
                <input type="text" id="searchTerm" class="form-control" placeholder="Nhập tên, mô tả hoặc chủng loại sản phẩm" value="${escapeHtml(s.searchTerm)}" />
                <input type="number" id="minPrice" class="form-control" placeholder="Nhập giá tối thiểu" value="${s.minPrice}" />
                <input type="number" id="maxPrice" class="form-control" placeholder="Nhập giá tối đa" value="${s.maxPrice}" />
                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
            </div>
            <div class="form-group order-container">
                <span>Sắp xếp theo: </span>
                <a href="#" onclick="changeProductSort('name_asc'); return false;" style="${s.sortOrder === 'name_asc' ? 'font-weight:bold;text-decoration:underline;' : ''}">Tên tăng dần</a> |
                <a href="#" onclick="changeProductSort('name_desc'); return false;" style="${s.sortOrder === 'name_desc' ? 'font-weight:bold;text-decoration:underline;' : ''}">Tên giảm dần</a> |
                <a href="#" onclick="changeProductSort('price_asc'); return false;" style="${s.sortOrder === 'price_asc' ? 'font-weight:bold;text-decoration:underline;' : ''}">Giá tăng dần</a> |
                <a href="#" onclick="changeProductSort('price_desc'); return false;" style="${s.sortOrder === 'price_desc' ? 'font-weight:bold;text-decoration:underline;' : ''}">Giá giảm dần</a>
            </div>
        </form>

        <!-- Kết quả tìm kiếm (PVListProduct.cshtml) -->
        ${listHtml}

        <div class="form-group" style="margin-top:15px; overflow:hidden;">
            <div class="col-md-offset-8 col-md-4 text-right">
                <button class="btn btn-primary" onclick="navigate('product-create')">Thêm mới</button>
            </div>
        </div>
    `;
}

function handleProductSearch(event) {
    event.preventDefault();
    productSearchState.searchTerm = document.getElementById('searchTerm').value;
    productSearchState.minPrice = document.getElementById('minPrice').value;
    productSearchState.maxPrice = document.getElementById('maxPrice').value;
    productSearchState.pageNumber = 1;
    renderProductIndex();
}

function changeProductSort(sortOrder) {
    productSearchState.sortOrder = sortOrder;
    productSearchState.pageNumber = 1;
    renderProductIndex();
}

function changeProductPage(page) {
    productSearchState.pageNumber = page;
    renderProductIndex();
}

// Form Thêm / Sửa sản phẩm (Create.cshtml, Edit.cshtml & PVCreateEditProduct.cshtml)
function renderProductForm(productId) {
    const isEdit = productId !== null;
    const product = isEdit
        ? products.find(p => p.ProductID === productId)
        : { ProductID: 0, CategoryID: categories[0]?.CategoryID || 1, ProductName: "", ProductDescription: "", ProductPrice: "", ProductImage: "https://placehold.co/200x280/95a5a6/ffffff?text=Default+Img" };

    const title = isEdit ? "CẬP NHẬT SẢN PHẨM" : "THÊM SẢN PHẨM";
    const submitText = isEdit ? "Lưu" : "Thêm mới";

    const categoryOptions = categories.map(c =>
        `<option value="${c.CategoryID}" ${c.CategoryID === Number(product.CategoryID) ? 'selected' : ''}>${escapeHtml(c.CategoryName)}</option>`
    ).join('');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">${title}</h2>
        <form onsubmit="saveProduct(event, ${isEdit ? product.ProductID : 'null'})">
            <div class="form-horizontal">
                <!-- Partial View: PVCreateEditProduct.cshtml -->
                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Danh mục</strong></div>
                    <div class="col-md-10">
                        <select id="ProductCategoryID" class="form-control">
                            ${categoryOptions}
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Tên sản phẩm</strong></div>
                    <div class="col-md-10">
                        <input type="text" id="ProductName" class="form-control" value="${escapeHtml(product.ProductName)}" required />
                    </div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Mô tả</strong></div>
                    <div class="col-md-10">
                        <textarea id="ProductDescription" class="custom-textarea" required>${escapeHtml(product.ProductDescription)}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Đơn giá</strong></div>
                    <div class="col-md-10">
                        <input type="number" step="0.01" id="ProductPrice" class="form-control" value="${product.ProductPrice}" required />
                    </div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-2"><strong>Hình ảnh</strong></div>
                    <div class="col-md-10">
                        <input type="file" id="UploadImg" accept=".png,.jpg,.jpeg,.gif" onchange="handleImageUpload(event)" />
                        <p class="help-block">Chỉ chấp nhận định dạng PNG, JPG, GIF (Nếu không chọn sẽ dùng ảnh hiện tại/mặc định).</p>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input type="submit" value="${submitText}" class="btn btn-primary" />
                        <button type="button" class="btn btn-primary" onclick="navigate('products')">Quay lại danh sách</button>
                    </div>
                </div>
            </div>
        </form>
    `;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        tempUploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);
}

function saveProduct(event, productId) {
    event.preventDefault();
    const catId = Number(document.getElementById('ProductCategoryID').value);
    const name = document.getElementById('ProductName').value.trim();
    const desc = document.getElementById('ProductDescription').value.trim();
    const price = parseFloat(document.getElementById('ProductPrice').value) || 0;

    if (productId === null) {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.ProductID)) + 1 : 1;
        products.push({
            ProductID: newId,
            CategoryID: catId,
            ProductName: name,
            ProductDescription: desc,
            ProductPrice: price,
            ProductImage: tempUploadedImage || "https://placehold.co/200x280/95a5a6/ffffff?text=Default+Img"
        });
    } else {
        const prod = products.find(p => p.ProductID === productId);
        if (prod) {
            prod.CategoryID = catId;
            prod.ProductName = name;
            prod.ProductDescription = desc;
            prod.ProductPrice = price;
            if (tempUploadedImage) prod.ProductImage = tempUploadedImage;
        }
    }
    navigate('products');
}

// Xem Chi tiết & Xóa sản phẩm (Details.cshtml, Delete.cshtml & PVProductInfo.cshtml)
function renderProductDetails(productId, isDeleteMode) {
    const product = products.find(p => p.ProductID === productId);
    if (!product) return navigate('products');

    const title = isDeleteMode ? "XÓA SẢN PHẨM" : "CHI TIẾT SẢN PHẨM";
    const warningHtml = isDeleteMode
        ? `<h4 class="alert-danger">Bạn thực sự muốn xóa sản phẩm này à?</h4>`
        : ``;

    const actionBtnHtml = isDeleteMode
        ? `<button class="btn btn-primary" onclick="confirmDeleteProduct(${product.ProductID})">Xóa</button>`
        : `<button class="btn btn-primary" onclick="navigate('product-edit', ${product.ProductID})">Sửa</button>`;

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">${title}</h2>
        ${warningHtml}

        <!-- Partial View: PVProductInfo.cshtml -->
        <div class="container-fluid">
            <div class="row bg-info detail-box">
                <div class="col-md-3 text-center">
                    <img src="${product.ProductImage}" class="product-detail-img" alt="Product" />
                </div>
                <div class="col-md-9">
                    <dl>
                        <dt>Tên sản phẩm</dt>
                        <dd>${escapeHtml(product.ProductName)}</dd>

                        <dt>Mô tả</dt>
                        <dd>${escapeHtml(product.ProductDescription)}</dd>

                        <dt>Đơn giá</dt>
                        <dd>${Number(product.ProductPrice).toFixed(2)}</dd>

                        <dt>Danh mục</dt>
                        <dd>${escapeHtml(getCategoryName(product.CategoryID))}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <div class="form-group" style="overflow:hidden;">
            <div class="col-md-offset-3 col-md-9">
                ${actionBtnHtml}
                <button class="btn btn-primary" onclick="navigate('products')">Quay lại danh sách</button>
            </div>
        </div>
    `;
}

function confirmDeleteProduct(productId) {
    products = products.filter(p => p.ProductID !== productId);
    navigate('products');
}

// ================== 5. KHÁCH HÀNG, ĐƠN HÀNG & TÀI KHOẢN ADMIN ==================
function renderCustomers() {
    let rows = customers.map(c => `
        <tr>
            <td>${c.CustomerID}</td>
            <td>${escapeHtml(c.CustomerName)}</td>
            <td>${escapeHtml(c.Email)}</td>
            <td>${escapeHtml(c.Phone)}</td>
            <td>${escapeHtml(c.Address)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="navigate('orders', ${c.CustomerID})">Xem đơn hàng</button>
            </td>
        </tr>
    `).join('');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">DANH SÁCH KHÁCH HÀNG</h2>
        <table class="table bg-info">
            <thead>
                <tr>
                    <th class="bg-success">Mã KH</th>
                    <th class="bg-success">Họ và tên</th>
                    <th class="bg-success">Email</th>
                    <th class="bg-success">Số điện thoại</th>
                    <th class="bg-success">Địa chỉ</th>
                    <th class="bg-success">Thao tác</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function renderOrders(filterCustomerId = null) {
    const list = filterCustomerId ? orders.filter(o => o.CustomerID === filterCustomerId) : orders;
    const customerObj = filterCustomerId ? customers.find(c => c.CustomerID === filterCustomerId) : null;

    let rows = list.map(o => {
        const cust = customers.find(c => c.CustomerID === o.CustomerID);
        const itemsText = o.Items.map(i => `${i.ProductName} (x${i.Quantity})`).join(', ');
        return `
            <tr>
                <td>#${o.OrderID}</td>
                <td>${cust ? escapeHtml(cust.CustomerName) : 'Khách lẻ'}</td>
                <td>${o.OrderDate}</td>
                <td>${itemsText}</td>
                <td>${o.TotalAmount.toLocaleString('vi-VN')} đ</td>
                <td><span class="label label-primary">${o.Status}</span></td>
            </tr>
        `;
    }).join('');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">DANH SÁCH ĐƠN HÀNG ${customerObj ? ' - ' + escapeHtml(customerObj.CustomerName) : ''}</h2>
        ${filterCustomerId ? `<p><button class="btn btn-default btn-sm" onclick="navigate('orders')">Xem tất cả đơn hàng</button></p>` : ''}
        <table class="table bg-info">
            <thead>
                <tr>
                    <th class="bg-success">Mã ĐH</th>
                    <th class="bg-success">Khách hàng</th>
                    <th class="bg-success">Ngày đặt</th>
                    <th class="bg-success">Chi tiết sản phẩm</th>
                    <th class="bg-success">Tổng tiền</th>
                    <th class="bg-success">Trạng thái</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function renderAccounts() {
    let rows = accounts.map(a => `
        <tr>
            <td>${escapeHtml(a.Username)}</td>
            <td>${escapeHtml(a.Role)}</td>
            <td>${escapeHtml(a.Status)}</td>
        </tr>
    `).join('');

    document.getElementById('app-view').innerHTML = `
        <h2 class="bg-success">QUẢN LÝ TÀI KHOẢN ADMIN</h2>
        <table class="table bg-info">
            <thead>
                <tr>
                    <th class="bg-success">Tên đăng nhập</th>
                    <th class="bg-success">Vai trò</th>
                    <th class="bg-success">Trạng thái</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Khởi chạy trang Sản phẩm mặc định khi mở ứng dụng
window.onload = function () {
    navigate('products');
};