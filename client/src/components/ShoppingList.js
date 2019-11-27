import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem, getProducts } from "../actions/itemActions";
import PropTypes from "prop-types";
import ProductList from "./productListTest";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getProducts();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { products } = this.props.item;

    const Shopping_List = (
      <ListGroup>
        {products.map(({ _id, product_name }) => {
          console.log(_id);
          return (
              <ListGroupItem style={{display:"flex", justifyContent:'space-between'}}>
                <div>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {product_name}
                </div>
                <div>
                  <ProductList product_Id={_id} />
                </div>
              </ListGroupItem>
          );
        })}
      </ListGroup>
    );

    return (
      <Container>{this.props.isAuthenticated ? Shopping_List : null}</Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, getProducts })(
  ShoppingList
);
