import React, { Component } from 'react';
import axios from 'axios';

const addProduct = (data) =>{
    return axios.post('/add', data).then((respone)=> {
        return respone.data
    }).catch((err)=>{

    });
}

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            image: ''
        }
    }

    isChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name] : value
        });
    }

    onSubmitForm= (event)=>{
        event.preventDefault()
        console.log("submit Form");
        const {product_name, product_price, image} = this.state;
        addProduct({product_name, product_price, image})
                    .then((res)=>{
                        console.log(res);
                    });
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <form>
                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input type="text" onChange={(event)=>{this.isChange(event)}} name="product_name" id="product_name" className="form-control" placeholder="Nhập tên sản phẩm" aria-describedby="name_text" />
                                    <small id="name_text" className="text-muted">Nhập text</small>
                                </div>
                                <div className="form-group">
                                    <label>Giá sản phẩm</label>
                                    <input type="text" onChange={(event)=>{this.isChange(event)}} name="product_price" id="product_price" className="form-control" placeholder="Nhập giá sản phẩm" aria-describedby="name_text" />
                                    <small id="name_text" className="text-muted">Nhập text</small>
                                </div>
                                <div className="form-group">
                                    <label>Link ảnh sản phẩm</label>
                                    <input type="text" onChange={(event)=>{this.isChange(event)}} name="image" id="image" className="form-control" placeholder="Nhập ảnh sản phẩm" aria-describedby="name_text" />
                                    <small id="name_text" className="text-muted">Nhập text</small>
                                </div>
                                <button type="reset" onClick={(event)=>{this.onSubmitForm(event)}} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddProduct;