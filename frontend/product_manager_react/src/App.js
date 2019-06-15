import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import HeadTitile from './components/HeadTitile';
import Product from './components/Product';

const getProductData = () => axios.get('/getData01').then((res)=>res);
const addProduct = (data) =>{
  return axios.post('/add', data).then((respone)=> {
      return respone.data
  }).catch((err)=>{

  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      data: null,
      product_name: '',
      product_price: '',
      image: ''
    }
  }
  
  componentWillMount() {
    if (this.state.data === null) {
      getProductData().then((res)=> {
        console.log(res.data);
        
        this.setState({data: res.data});
      });
    }
  }

  printData = ()=>{
    if (this.state.data !== null) {
      return this.state.data.map((value, key)=>{
        return (<Product
          key={key}
          product_name={value.product_name}
          product_price = {value.product_price}
          image={value.image}/>);
      });
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
                      this.setState({
                        data: [...this.state.data, {product_name, product_price, image}]
                      });
                  });
  }
  
  render() {
    return (
      <div>
        <HeadTitile/>
        <div className="container">
          <div className="row">
            <div className="col-9 ">
              <div className="row">
                {this.printData()}
              </div>
            </div>
            <div className="col-3">
              <div className="row">
                  <div className="col-12 mx-auto">
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
                        <button type="reset" onClick={(event)=>{this.onSubmitForm(event)}} className="btn btn-primary btn-block">Submit</button>
                    </form>
                  </div>
                </div>
              </div>     
          </div>
        </div>
      </div>
    );
  }
}

export default App;
