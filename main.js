class ProductList {
    jsonProduct = {
        code: '',
        product: '',
        qty: '',
        price: ''
    }
    constructor(formFields) {
        this.json = formFields
        var selectedRow = null;
    }

    onFormSubmit = (e) => {
        console.log("entro");
        e.preventDefault();
        var formData =readFormData() || [];
        (selectedRow != null) ? updateRecord(formData): insertNewRecord(formData);
        resetForm();
    }

    //Retrieve the data (Read)
    readFormData = ()=> {
        return {
            code: document.getElementById(jsonProduct.code).value,
            product: document.getElementById(jsonProduct.product).value,
            qty: document.getElementById(jsonProduct.qty).value,
            price: document.getElementById(jsonProduct.price).value
        }
    }

    //Insert the data (Create)
    insertNewRecord = (data) => {
        var table = document.getElementById(DB_NAME).getElementsByTagName(TABLE_NAME)[0];
        var newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.code;
        var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.product;
        var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.qty;
        var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.price;
        var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
        localStorage.setItem(DB_NAME, JSON.stringify(data))
    }


    //Edit the data (Update)
    onEdit = (td) => {
        selectedRow = td.parentElement.parentElement;
        document.getElementById(jsonProduct.code).value = selectedRow.cells[0].innerHTML;
        document.getElementById(jsonProduct.code).value = selectedRow.cells[1].innerHTML;
        document.getElementById(jsonProduct.code).value = selectedRow.cells[2].innerHTML;
        document.getElementById(jsonProduct.code).value = selectedRow.cells[3].innerHTML;
    }

    updateRecord = (formData) => {
        selectedRow.cells[0].innerHTML = formData.code;
        selectedRow.cells[1].innerHTML = formData.product;
        selectedRow.cells[2].innerHTML = formData.qty;
        selectedRow.cells[3].innerHTML = formData.price;
        localStorage.setItem(DB_NAME, JSON.stringify(formData))
    }


    //Delete the data (Delete)
    onDelete = (td) => {
        
        if (confirm('Do you want to delete this record?')) {
            row = td.parentElement.parentElement;
            document.getElementById(DB_NAME).deleteRow(row.rowIndex);
        }
        resetForm();
    }

    //Reset the data
    resetForm = () => {
        document.getElementById(jsonProduct.code).value = '';
        document.getElementById(jsonProduct.product).value = '';
        document.getElementById(jsonProduct.qty).value = '';
        document.getElementById(jsonProduct.price).value = '';
    }
}
const DB_NAME = "storeList"
const TABLE_NAME = 'tbody'
//var formData = null;
const formFields = {
    code: "productCode",
    product: "product",
    qty: "qty",
    price: "perPrice"
}
const objetoProductList = new ProductList(formFields);