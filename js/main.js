class ProductList {

    jsonProduct = {
        code: '',
        product: '',
        qty: '',
        price: ''
    }

    constructor(formFields) {
        this.jsonProduct = formFields;
        this.selectedRow = null;
    }

    onFormSubmit = (e) => {
        //e.preventDefault();
        let formData = this.readFormData();
        //console.log(formData)
        (this.selectedRow != null) ? this.updateRecord(formData) : this.insertNewRecord(formData);
        this.resetForm();
    }

    add = () => {
        let newProduct = this.readFormData()
        let currentData = this.read() || []
        let finalData = [...currentData, newProduct]
        localStorage.setItem(DB_NAME, JSON.stringify(finalData))
        this.updateRecord(finalData) 
    }

    read = () => JSON.parse(localStorage.getItem(DB_NAME))

    //Retrieve the data (Read)
    readFormData = () => {
        return {
            code: document.getElementById(this.jsonProduct.code).value,
            product: document.getElementById(this.jsonProduct.product).value,
            qty: document.getElementById(this.jsonProduct.qty).value,
            price: document.getElementById(this.jsonProduct.price).value
        }
    }

    //Insert the data (Create)
    insertNewRecord = (data) => {
        let table = document.getElementById(DB_NAME).getElementsByTagName(TABLE_NAME)[0];
        let newRow = table.insertRow(table.length);
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.code;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.product;
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.qty;
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.price;
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick='objetoProductList.onEdit(this)'>Edit</button> <button onClick='objetoProductList.onDelete(this)'>Delete</button>`
        localStorage.setItem(DB_NAME, JSON.stringify(data))
    }

    //Edit the data (Update)
    onEdit = (td) => {
        let selectedRow = td.parentElement.parentElement;
        console.log(selectedRow)
        document.getElementById(this.jsonProduct.code).value = selectedRow.cells[0].innerHTML;
        document.getElementById(this.jsonProduct.product).value = selectedRow.cells[1].innerHTML;
        document.getElementById(this.jsonProduct.qty).value = selectedRow.cells[2].innerHTML;
        document.getElementById(this.jsonProduct.price).value = selectedRow.cells[3].innerHTML;
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
            let row = td.parentElement.parentElement;
            document.getElementById(DB_NAME).deleteRow(row.rowIndex);
        }
        this.resetForm();
    }

    //Reset the data
    resetForm = () => {
        document.getElementById(this.jsonProduct.code).value = '';
        document.getElementById(this.jsonProduct.product).value = '';
        document.getElementById(this.jsonProduct.qty).value = '';
        document.getElementById(this.jsonProduct.price).value = '';
    }
}

const DB_NAME = "storeList";
const TABLE_NAME = 'tbody';
const formFields = {
    code: "productCode",
    product: "product",
    qty: "qty",
    price: "perPrice"
}
const objetoProductList = new ProductList(formFields);
objetoProductList.read();