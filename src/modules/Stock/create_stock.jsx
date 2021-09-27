import React from "react";

/**
 * Stock Component
 */
class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

    /**
     * main render
     * @returns 
     */
	render() {
        
		return (
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Stock Form</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Stock Form</li>
                </ol>
              </div>
            </div>
          </div>  
        </section>
    
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
   
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">General Elements</h3>
                  </div>

                  <div class="card-body">
                    <form>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Text</label>
                            <input type="text" class="form-control" placeholder="Enter ..."/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Textarea</label>
                            <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                          </div>
                        </div>
                      </div>
   
                      <div class="row">
                        <div class="col-sm-12">

                          <div class="form-group">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox"/>
                              <label class="form-check-label">Checkbox</label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" checked/>
                              <label class="form-check-label">Checkbox checked</label>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12">

                          <div class="form-group">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="radio1"/>
                              <label class="form-check-label">Radio</label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="radio1" checked/>
                              <label class="form-check-label">Radio checked</label>
                            </div>
                          </div>
                        </div>
                      </div>
    
                      <div class="row">
                        <div class="col-sm-12">

                          <div class="form-group">
                            <label>Select</label>
                            <select class="form-control">
                              <option>option 1</option>
                              <option>option 2</option>
                              <option>option 3</option>
                              <option>option 4</option>
                              <option>option 5</option>
                            </select>
                          </div>
                        </div>
                      </div>
    
                      <div class="row">
                        <div class="col-sm-12">

                          <div class="form-group">
                            <label>Select Multiple</label>
                            <select multiple class="form-control">
                              <option>option 1</option>
                              <option>option 2</option>
                              <option>option 3</option>
                              <option>option 4</option>
                              <option>option 5</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>


              </div>

            </div>

          </div>
        </section>

      </div>
      );
	}
}


export default Stock;
