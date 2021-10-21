import React from "react";
import DataTable from 'react-data-table-component';
import Pagination from 'react-js-pagination'
import Product from "./product";


function ProductList() {
  const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },

  ];
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
  };

  return (
    
    <div class="col-sm-2">
    {/* <button  onClick={() => { this.props.history.push("/purchase") }} type="button" class="btn btn-block btn-primary pull-right">Add Purchase</button> */}
    <Product />
    </div>
  );
}

export default ProductList

