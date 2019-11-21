import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button,Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
     
    const Shopping_List= <ListGroup>
    <TransitionGroup className='shopping-list'>
    <Table>
    <thead>
      <th>edit</th>
      <th>productname</th>
      <th>itemname</th>
      {items.map(({ _id, name,product_name }) => (
        
                  
                      <tr>
            {this.props.isAuthenticated ? (
                <td>
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                &times;
              </Button>
              </td>
            ) : null}
            <td>{product_name}</td>
            <td>{name}</td>
            {/* <span>{product_name}</span> */}
            </tr>
          

        
      ))}
        </thead>
            </Table>
    </TransitionGroup>
  </ListGroup>

    return (
      <Container>
        {/* <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup> */}
        {this.props.isAuthenticated?Shopping_List:null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

// export default connect(
//   mapStateToProps,
//   { getItems, deleteItem }
// )(ShoppingList);

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
