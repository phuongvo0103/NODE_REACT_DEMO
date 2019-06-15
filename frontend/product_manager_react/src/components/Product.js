import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div className="col-4">
                <div className="card text-left">
                    <img className="card-img-top" src={this.props.image} alt={this.props.product_name} />
                    <div className="card-body">
                        <h4 className="card-title float-left">{this.props.product_name}</h4>
                        <h4 className="card-title float-right">{this.props.product_price}</h4>
                    </div>
                </div>
            </div>

        );
    }
}

export default Product;