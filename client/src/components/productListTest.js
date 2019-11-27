import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  ListGroup,
  ListGroupItem,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem, getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  async componentDidMount() {
    this.props.getItems(this.props.product_Id);
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.getItems(this.props.product_Id);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button color="dark" onClick={this.toggle}>
            See Items
          </Button>
        ) : null}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Product</ModalHeader>
          <ModalBody>
            <Container>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.item.map(item => (
                    <tr>
                      <td>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          &times;
                        </Button>
                        {item.name}
                      </td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: state.item.items,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem, getItems, deleteItem })(
  ItemModal
);
