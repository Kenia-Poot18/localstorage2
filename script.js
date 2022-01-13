window.onload = function () {
    var localStorageKeyName = 'data';

    loadFromLocalStorage();

    document.querySelector("#btn-add").addEventListener('click', function () {
        var productCode = document.getElementById("productCode"),
        product = document.getElementById("product"),
        qty = document.getElementById("qty");
        perPrice = document.getElementById("perPrice");

        // validacion
        if (productCode.value.length === 0 || product.value.length === 0 || !parseInt(qty.value) || !parseInt(perPrice.value)) return;

        var productos = {
            productCode: productCode.value,
            product: product.value,
            qty: qty.value,
            perPrice: perPrice.value
        };

        // limpiar datos
        productCode.value = '';
        product.value = '';
        qty.value = '';
        perPrice.value = '';

        // Append to my localStorage
        appendObjectToLocalStorage(productos);
    })

    function appendObjectToLocalStorage(obj) {
        var productosto = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        if (dataInLocalStorage !== null) {
            productosto = JSON.parse(dataInLocalStorage);
        }

        productosto.push(obj);

        localStorage.setItem(localStorageKeyName, JSON.stringify(productosto));

        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        var productosto = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName),
            gridBody = document.querySelector("#grid tbody");

        if (dataInLocalStorage !== null) {
            productosto = JSON.parse(dataInLocalStorage);
        }

        // Dibujar  TR para TBODY
        gridBody.innerHTML = '';

        productosto.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdproductCode = document.createElement("td"),
                tdproduct = document.createElement("td"),
                tdqty = document.createElement("td"),
                tdperPrice = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tdproductCode.innerHTML = x.productCode;
            tdproduct.innerHTML = x.product;
            tdqty.innerHTML = x.qty;
            tdperPrice.innerHTML = x.perPrice;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdproductCode);
            tr.appendChild(tdproduct);
            tr.appendChild(tdqty);
            tr.appendChild(tdperPrice);
            tr.appendChild(tdRemove);

            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        var productosto = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

            productosto = JSON.parse(dataInLocalStorage);

            productosto.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(productosto));

        loadFromLocalStorage();
    }
}