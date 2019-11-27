import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { MDBBtn, MDBInput } from "mdbreact";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: [],
    itemlist: ["item1", "item2", "item3", "item4"],
    step: 1,
    Product_name: "",
    formcontent: null,
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount = () => {
    this.formchange();
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "PRODUCT_REPEATED") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = async () => {
    await this.props.clearErrors();
    await this.setState({
      modal: !this.state.modal
    });
  };

  increment = async () => {
    await this.setState({ step: this.state.step + 1 });
    this.formchange();
  };

  decrement = async () => {
    await this.setState({ step: this.state.step - 1 });
    this.formchange();
  };

  onChange = async val => {
    const items = this.state.name;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    if (arr.length == this.state.name.length) {
      this.setState({ name: [val, ...arr] });
    } else {
      this.setState({ name: [...arr] });
    }
  };
  onqty = async val => {
    const items = this.state.name;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });

    this.setState({ name: [val, ...arr] });
  };
  onSubmit = async e => {
    e.preventDefault();

    let newItem = {
      Product_name: this.state.Product_name,
      itemlist: this.state.name
    };
    await this.props.addItem(newItem);
    this.setState({
      name: [],
      step: 1,
      formcontent: (
        <React.Fragment>
          <input
            placeholder="Product Name"
            onChange={e => {
              this.setState({ Product_name: e.target.value });
            }}
          />
          <br />
          <input
            type="button"
            value="next"
            onClick={e => {
              this.increment();
            }}
          />
        </React.Fragment>
      )
    });
  };

  formchange = () => {
    switch (this.state.step) {
      case 1:
        this.setState({
          formcontent: (
            <React.Fragment>
              <Label for="item">Select Product Name</Label>
              <MDBInput
                Label="Product Name"
                onChange={e => {
                  this.setState({ Product_name: e.target.value });
                }}
              />
              <br />
              <input
                type="button"
                value="next"
                onClick={e => {
                  this.increment();
                }}
              />
            </React.Fragment>
          )
        });
        break;
      case 2:
        this.setState({
          formcontent: (
            <React.Fragment>
              <Label for="item">Items</Label>
              {this.renderList()}
              <br />
              <input
                type="button"
                value="prev"
                onClick={e => {
                  this.decrement();
                }}
              />
              <input
                type="button"
                value="next"
                onClick={e => {
                  this.increment();
                }}
              />
            </React.Fragment>
          )
        });
        break;
      case 3:
        this.setState({
          formcontent: (
            <React.Fragment>
              <p>Product Name : {this.state.Product_name}</p>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>{this.showlists()}</tbody>
              </table>
              <input
                type="button"
                value="prev"
                onClick={e => {
                  this.decrement();
                }}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                SAVE ITEM
              </Button>
            </React.Fragment>
          )
        });
        break;
      default:
        break;
    }
  };

  showlists = () => {
    let count=0;
    return this.state.name.map(item => {
      count++;
      return (
        <React.Fragment>
          <tr>
            <th scope="row">{count}</th>
            <td>{Object.keys(item)[0]}</td>
            <td>{item[Object.keys(item)]}</td>
          </tr>
        </React.Fragment>
      );
    });
  };

  renderList = () => {
    return this.state.itemlist.map(itemm => {
      return (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlfor={itemm}>
              <input
                type="text"
                name="name"
                key={itemm}
                type="checkbox"
                value={itemm}
                onClick={e => this.onChange({ [e.target.value]: 1 })}
              />
              &nbsp;&nbsp;
              {itemm}
            </label>
            <input
              style={{ width: "45px", height: "25px" }}
              min={1}
              onChange={e => this.onqty({ [itemm]: e.target.value })}
              type="number"
            />
          </div>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4 logo">BUNNY MART</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {this.state.formcontent}
                <br />
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  email: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { addItem, clearErrors })(ItemModal);
