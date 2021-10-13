class ProductList {

    jsonProduct = {
        code: '',
        product: '',
        qty: '',
        price: ''
    }

    constructor(formFields) {
        this.jsonProduct = formFields;
    }

    /*
    onFormSubmit = (e) => {
        let formData = this.readFormData();
        //this.add();
        //console.log(add())
        (this.selectedRow != null) ? this.updateRecord(formData) : this.insertNewRecord(formData);
        this.resetForm();
    }
    */

    add = () => {
        let newProduct = this.readFormData()
        let currentData = this.read() || []
        let finalData = [...currentData, newProduct]
        localStorage.setItem(DB_NAME, JSON.stringify(finalData))
        this.refreshData()
        this.resetForm();
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

    //Edit the data (Update)
    onEdit = (td,i) => {
        let selectedRow = td.parentElement.parentElement;
        document.getElementById(this.jsonProduct.code).value = selectedRow.cells[0].innerHTML;
        document.getElementById(this.jsonProduct.product).value = selectedRow.cells[1].innerHTML;
        document.getElementById(this.jsonProduct.qty).value = selectedRow.cells[2].innerHTML;
        document.getElementById(this.jsonProduct.price).value = selectedRow.cells[3].innerHTML;
        //document.getElementById(DB_NAME).deleteRow(selectedRow.rowIndex);
        this.onDelete(td,i);  

    }
    update(i){
        //this.add();
        localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
        //document.getElementById(DB_NAME).deleteRow(selectedRow.rowIndex);  
        this.refreshData();
    }

    //Delete the data (Delete)
    onDelete = (td,i) => {
        /*if (confirm('Do you want to delete this record?')) {*/
            let row = td.parentElement.parentElement;
            document.getElementById(DB_NAME).deleteRow(row.rowIndex);
       // }
        let listaProductos = this.read();
        listaProductos.splice(i, 1)
        localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
        this.refreshData()
        this.resetForm();
    }

    //Reset the data
    resetForm = () => {
        document.getElementById(this.jsonProduct.code).value = '';
        document.getElementById(this.jsonProduct.product).value = '';
        document.getElementById(this.jsonProduct.qty).value = '';
        document.getElementById(this.jsonProduct.price).value = '';
    }
    refreshData = () => {
        let listaProductos = this.read();
        listaProductos = listaProductos.map((obj, i) => `
            <tr>
                <td>${i+1}</td>
                <td>${obj.code}</td>
                <td>${obj.product}</td>
                <td>${obj.qty}</td>
                <td>${obj.price}</td>
                <td class="colActions">
                
                <button onClick='objetoProductList.onEdit(this,${i})'>Edit</button> 
                <button onClick='objetoProductList.onDelete(this,${i})'>Delete</button>
                <button onClick='objetoProductList.update(this,${i})'>Update</button>
                </td>
            </tr>`)

        document.getElementById(TABLE_NAME).innerHTML = listaProductos.join(' ')

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
objetoProductList.refreshData();
