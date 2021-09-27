import React from "react";
import DataTable from 'react-data-table-component';

/**
 * StockList Component
 */

 const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
 const columns = [
   {
     name: 'Title',
     selector: 'title',
     sortable: true,
   },
   {
     name: 'Year',
     selector: 'year',
     sortable: true,
     right: true,
   },
 ];
 
 class StockList extends React.Component{
   render() {
     return (

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-10">
              <h1>Stock List</h1>
            </div>
            <div class="col-sm-2">
             <button  onClick={() => { this.props.history.push("/create_stock") }} type="button" class="btn btn-block btn-primary pull-right">Add Stock</button>
             </div>
            <div class="col-sm-3">
              {/* <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">DataTables</li>
              </ol> */}
             
            </div>
          </div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">DataTable with minimal features & hover style</h3>
              </div>
              <div class="card-body">
                <DataTable
                  title="Arnold Movies"
                  columns={columns}
                  data={data}
                />
                {/* <table id="example2" class="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                  </thead>
                  <tbody>                 
                  <tr>
                    <td>Other browsers</td>
                    <td>All others</td>
                    <td>-</td>
                    <td>-</td>
                    <td>U</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                  </tfoot>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
     )
   }
 };


export default StockList;
