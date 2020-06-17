import React, { Component } from 'react';

import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formItem : {
        item : ''
      },
      form:{
        avatar: '',
        email: '',
        first_name:'',
        last_name:''
      },
      items: [],
      last: '',
      //url: 'https://reqres.in/api/users',
      url: 'http://localhost:8000/api',
      paginate: [],
      update: false,
      showItemForm :false,
      showItemFormUpdate :false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { 
    const name = event.target.name;
    const value = event.target.value;
    let form = this.state.formItem
    form[name] = value
    this.setState({formItem : form});  
  }

  handleSubmit(event) {
        event.preventDefault();
      }

  paginateUser(id) {
      fetch(`${this.state.url+'?page='+id}`)
        .then(res => res.json())
        .then(data => {
          this.setState(
            {items: data.data}
          );
          this.setForm()
        })
  }


  editUser(id) {
    fetch(`${this.state.url+'/'+id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({update: true});
        this.setState({form: data.data});
      });
  }

  componentDidMount() {
   this.allItems()
  }

  allUser(){
    fetch(this.state.url)
    .then(res => res.json())
    .then(data => {
      let array = []
      for (let i = 0; i < data.last_page; i++) {
        array.push(i+1);
      }
      this.setForm()
     this.setState({items: data.data});
     this.setState({last: data.last_page});
     this.setState({paginate: array});
    });
  }

  createUser(form){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
      };
      fetch(this.state.url, requestOptions)
        .then(res => res.json())
        .then(data =>{
          this.allUser()
        });
  }

  setForm(){
    
    this.setState(
      {formItem: {item: ''}
      }
    );
  }

  updateItem(form){
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
      };
      fetch(`${this.state.url+'/items/'+form.id}`, requestOptions)
        .then(res => res.json())
        .then(data =>{
          this.allItems()
        });
  }


  deleteItem(id){
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
      };
      fetch(`${this.state.url+'/items/'+id}`, requestOptions)
        .then(res => res.json())
        .then(data =>{
          this.allItems()
        });
  }

  showItem(type){
    if (type == 1) {
      
      this.setState({showItemFormUpdate: true});
    }else{
      this.setForm()
      this.setState({showItemFormUpdate: false});
    }
    var show = this.state.showItemForm
    this.setState({showItemForm: !show});
   
  }

  addItem(formItem){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formItem)
      };
      fetch(`${this.state.url}/items`, requestOptions)
        .then(res => res.json())
        .then(data =>{
          this.allItems()
        });
  }

  allItems(){
    fetch(`${this.state.url}/items`)
    .then(res => res.json())
    .then(data => {
      this.setState({showItemForm: false});
      this.setForm()
     this.setState({items: data});
    
    });
  }

  editItem(id){
    
    this.showItem(1)
    var item = this.state.items.filter(x=>x.id == id)
    this.setState({formItem: item[0]});
  }

  render() {
    let button = '';
    let buttonSub;
    if(this.state.showItemForm) {
      if (this.state.showItemFormUpdate) {
        buttonSub = <button className="button button2"  onClick={() => this.updateItem(this.state.formItem)}>Update</button>
      }else{
        buttonSub =  <button className="button button2"  onClick={() => this.addItem(this.state.formItem)}>Add</button>
      }
      button = <form onSubmit={this.handleSubmit}>
                <div >
                  <div >
                    <input name="item" value={this.state.formItem.item} type="text" placeholder="Add item" onChange={this.handleChange} autoFocus required/>
                  </div>
                </div>
               {buttonSub}
                
               </form>
    }
    
    return (
      <div className="App">
          <div className="nav">
            <h1>Hello World</h1>
          </div>
          <div className="list">
            <div className="menu">
            <a className="button button2"  onClick={() => this.showItem(0)}> Add Item    <i className="fas fa-plus-circle"></i></a>
            { 
                    this.state.items.map(item => {
                      return (
                      <a>{item.item}   <i className="fas fa-edit coloredit"  onClick={() => this.editItem(item.id)}></i>        <i className="fas fa-trash colordelete" onClick={() => this.deleteItem(item.id)}></i> </a>
                      ) 
                  })
            }
            </div>
            <div className="main">
            {button}
              <h2>Lorum Ipsum</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            </div>
            <div className="right">
              <h2>About</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            </div>
          </div>
          <div className="footer">Prueba Técnica</div>
      </div>
    )
  }


}


export default App;
