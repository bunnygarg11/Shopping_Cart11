import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem,updateItem } from "../actions/itemActions"
import { clearErrors } from "../actions/errorActions"

class EditModal extends Component {
  state = {
    modal: false,
    edit:[],
    name: [],
    itemlist: ["item1", "item2", "item3", "item4"],
    step: 1,
    Product_name:"",
    formcontent: null,
    msg:null
  };

//   static propTypes = {
//     isAuthenticated: PropTypes.bool,
//     error: PropTypes.object.isRequired,
//     login: PropTypes.func.isRequired,
//     clearErrors: PropTypes.func.isRequired
//   };
  async componentDidMount(){
    //   await this.setState()
      await this.setState({edit:[...this.state.edit,...this.props.items],Product_name:this.props.product})

  }

//   componentDidUpdate(prevProps) {
//     const { error, isAuthenticated } = this.props;
//     if (error !== prevProps.error) {
//       // Check for register error
//       if (error.id === 'LOGIN_FAIL') {
//         this.setState({ msg: error.msg.msg });
//       } else {
//         this.setState({ msg: null });
//       }
//     }

//     // If authenticated, close modal
//     if (this.state.modal) {
//       if (isAuthenticated) {
//         this.toggle();
//       }
//     }
//   }
//   renderlist3(){
//       const arr=this.props.items.map(item=>{
//           return item.name
//       })
//       return this.state.itemlist.map(item=>{
//           if(arr.includes(item)==-1){
//               return (
//                 <React.Fragment>
//                 <br />
//                 <div>
//                 <label htmlfor={item} style={{padding:"1px"}}>
//                 <input
//                 type="text"
//                 name="name"
//                 key={item}
//                 type="checkbox"
//                 value={item}
//                 onClick={e => this.onChange({[e.target.value]:1})}
//                 />
//                 {item}
//                 </label>
//                 <input style={{width:"45px"}} min={1} onChange={e=>this.onqty({[item]:e.target.value})} type="number"/>
//                 </div>
//                 </React.Fragment>
//               )
//           }
//           return (
//               <React.Fragment>
//                   <br/>
//                   <div>
//                   <Button
//                 className='remove-btn'
//                 color='danger'
//                 size='sm'
//                 onClick={this.onDeleteClick.bind(this, _id)}
//               >
//                 &times;
//               </Button>
//               {item}
//               <input style={{width:"45px"}} min={1} onChange={e=>this.onqty({[item]:e.target.value})} type="number"/>
//                   </div>
//               </React.Fragment>
//           )
//       })
//   }
toggle = () => {
    // Clear errors
  
    this.setState({
      modal: !this.state.modal
    });
  };
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  increment = async () => {
    await this.setState({ step: this.state.step + 1 });
    // this.formchange();
    };
  decrement = async () => {
    await this.setState({ step: this.state.step - 1 });
    // this.formchange();
    };
//   onChange = obj => {
//     this.setState({edit:[...this.state.edit,obj] });
//   };

//   onSubmit = e => {
//     e.preventDefault();

//     const { email, password } = this.state;

//     const user = {
//       email,
//       password
//     };

//     // Attempt to login
//     this.props.login(user);
//   };
  onqty=async(obj)=>{
    // const items = this.state.name;
    // const arr = items.filter(item => {
    //   return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    // });
    
    //     this.setState({ name: [val, ...arr] });

   const brr= this.state.edit.map( itemm=>{
        if(itemm.name===obj.name){
            itemm.quantity=obj.quantity
        }
        return itemm
    })
   await this.setState({edit:brr})
}
showlists=()=>{
    return this.state.edit.map(ite=>{
        return (
            <React.Fragment>
                <li key={ite.name}>
                    {ite.name}
                    <br/>
                    {ite.quantity}
                </li>
            </React.Fragment>
        )
    })
}
onSubmit = async e => {
    e.preventDefault();
    const edit=this.state.edit
    let newItem={
        item:edit
    }
this.props.updateItem(newItem)
this.setState({step:1})
this.toggle()
}

//   renderList = () => {
//     return this.state.itemlist.map(itemm => {
//     return (
//     <React.Fragment>
//     <br />
//     <div>
//     <label htmlfor={itemm} style={{padding:"1px"}}>
//     <input
//     type="text"
//     name="name"
//     key={itemm}
//     type="checkbox"
//     value={itemm}
//     onClick={e => this.onChange({[e.target.value]:1})}
//     />
//     {itemm}
//     </label>
//     <input style={{width:"45px"}} min={1} onChange={e=>this.onqty({[itemm]:e.target.value})} type="number"/>
//     </div>
//     </React.Fragment>
//     );
//     });
//     };


  renderlist11(){
      return this.state.edit.map(item=>{
          return (
            <React.Fragment>
            <br/>
            <div>
            <Button
          className='remove-btn'
          color='danger'
          size='sm'
          onClick={this.onDeleteClick.bind(this, item._id)}
        >
          &times;
        </Button>
        {item.name}
        <input style={{width:"45px"}} min={1} value={item.quantity} onChange={e=>this.onqty({name:item.name,quantity:e.target.value,_id:item._id})} type="number"/>
            </div>
        </React.Fragment>
          )
      })
  }

  
  render() {
      const items=(
        <React.Fragment>
          <p>{this.state.Product_name}</p>
        {this.renderlist11()}
        <br/>
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
      

      const preview=(
        <React.Fragment>
            {/* <Form onSubmit={this.onSubmit}> */}
            <p>{this.state.Product_name}</p>
        {this.showlists()}
        <input
        type="button"
        value="prev"
        onClick={e => {
        this.decrement();
        }}
        />
        <Button color="dark" style={{ marginTop: "2rem" }} block>
        Add Item
        </Button>
            {/* </Form> */}
       
        </React.Fragment>
      )
    return (
         <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            EDIT
          </Button>
        ) : null}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>EDIT</ModalHeader>
          <ModalBody>
            {/* {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null} */}
            <Form onSubmit={this.onSubmit}>
            {this.state.step===1?items:preview}
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  items:state.item.items
});

export default connect(
  mapStateToProps,
  { deleteItem, clearErrors,updateItem }
)(EditModal);