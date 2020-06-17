import React, { Component } from 'react';

import './App.scss';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formItem : {
        item : ''
      },
      form:{
        nickname: '',
        email: '',
        first_name:'',
        last_name:'',
        cel: '',
        edad:''
      },
      items: [],
      list: '',
      url: (window.location.hostname == 'localhost') ? '/laravel_back/public/api' :'https://ekoomedia.herokuapp.com/public/api',  
      paginate: [],
      update: false,
      showItemForm :false,
      showItemFormUpdate :false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  handleChange(event) { 
    const name = event.target.name;
    const value = event.target.value;
    let form = this.state.formItem
    form[name] = value
    this.setState({formItem : form});  
  }

  handleChangeForm(event) { 
    const name = event.target.name;
    const value = event.target.value;
    let form = this.state.form
    form[name] = value
    this.setState({form : form});  
  }

  handleSubmit(event) {
        event.preventDefault();
      }

 

  componentDidMount() {
   this.allItems()
    }

  

  

  setForm(id){
    $('span').hide()
    if (id===0) {
      this.setState(
        {formItem: {item: ''}
        }
      );
    }else{
      this.setState(
        {form: {nickname: '',
        email: '',
        first_name:'',
        last_name:'',
        cel: 0,
        edad:0}
        }
      );
    }
    
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
    if (type === 1) {
      
      this.setState({showItemFormUpdate: true});
    }else{
      this.setForm(0)
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
      this.setForm(0)
     this.setState({items: data});
    this.setState({list: data[0].item});
    });
  }

  editItem(id){
    
    this.showItem(1)
    var item = this.state.items.filter(x=>x.id === id)
    this.setState({formItem: item[0]});
  }

  setTitle(id){
    var item = this.state.items.filter(x=>x.id === id)
    this.setState({list: item[0].item});
  }

  createForm(body){
    var isOk = true
   $('.span').each(function () {
      if (body[this.id] == '' && this.id != 'nickname') {
        $('#'+this.id).show()
        isOk = false
      }else{
        $('#'+this.id).hide()
      }
    })
    if( !(Number(body['edad'])>0) ){
      $('#edad').show()
    }else{
      $('#edad').hide()
    }
    if( !(Number(body['cel'])>0) ){
      $('#cel').show()
    }else{
      $('#cel').hide()
    }
    
    if (isOk) {
      fetch(`${this.state.url}/tasks/${body.nickname}`)
      .then(res => res.json())
      .then(data => {
        if (data.length===0) {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
            };
            fetch(`${this.state.url}/tasks`, requestOptions)
            .then(res => res.json())
            .then(data =>{
              this.setForm(1)
              $('#myModal').show('slow')
            setTimeout(function(){ $('#myModal').fadeOut() }, 5000);
            });
        }else{
          $('#nickname').show('slow')
        }
      
    });
    
  }
    
     
  }

  closeModal(){
    $('#myModal').fadeOut()
  }

  checkNickName(email){
    let form = this.state.form
    if (email.search('@') != -1) {
      form['nickname'] = email.split('@')[0]
    }else{
      
      form['nickname'] = email
    }
    this.setState({form : form});  
     
      
  }

  render() {
    let button = '';
    let buttonSub;
    if(this.state.showItemForm) {
      if (this.state.showItemFormUpdate) {
        buttonSub = <button className="button button2"  onClick={() => this.updateItem(this.state.formItem)}>Actualizar Item</button>
      }else{
        buttonSub =  <button className="button button2"  onClick={() => this.addItem(this.state.formItem)}>Crear Item</button>
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
            <h1>FullStack Ekoomedia</h1>
          </div>
          <div className="list">
            <div className="menu">
            <a className="button button2" onClick={() => this.showItem(0)}> Crear Item    <i className="fas fa-plus-circle"></i></a>
            { 
                    this.state.items.map((item,i)=> {
                      return (
                      <a key={i} className="button button2" onClick={() => this.setTitle(item.id)}> {item.item} <i className="fas fa-edit coloredit"  onClick={() => this.editItem(item.id)}></i>        <i className="fas fa-trash colordelete" onClick={() => this.deleteItem(item.id)}></i> </a>
                      ) 
                  })
            }
            </div>
            <div className="main">
            {button}
              <h2>Hola bienvenido</h2>
              <p>Sabemos que quieres viajar en un <b>{this.state.list}</b>. por favor diligencia el siguiente formulario:</p>
              <div className="form">
              <form onSubmit={this.handleSubmit}>
                <div >
                  <div >
                  <label for="first_name">First Name</label><span id="first_name" className="span"> * First Name es requerido</span>
                    <input name="first_name" value={this.state.form.first_name} type="text" placeholder="First Name" onChange={this.handleChangeForm} autoFocus required/>
                  </div>
                  <div >
                  <label for="last_name">Last Name</label><span id="last_name" className="span"> * Last Name es requerido</span>
                    <input name="last_name" value={this.state.form.last_name} type="text" placeholder="Last Name" onChange={this.handleChangeForm} autoFocus required/>
                  </div>
                  <div >
                  <label for="email">Email</label><span id="email" className="span"> * Email es requerido</span>
                    <input name="email" value={this.state.form.email} onKeyUp={() => this.checkNickName(this.state.form.email)} type="text" placeholder="Email" onChange={this.handleChangeForm} autoFocus required/>
                    
                    </div>
                  <div >
                  <label for="nickname">Nickname </label><span id="nickname" className="span"> * Nickname ya existe</span>
                    <input name="nickname" value={this.state.form.nickname}  type="text" placeholder="Nickname" onChange={this.handleChangeForm} autoFocus disabled/>
                   </div>
                  <div >
                  <label for="edad">Edad</label><span id="edad" className="span"> * Edad debe estar entre 18 - 100 años</span>
                    <input name="edad" value={this.state.form.edad} type="text" placeholder="Edad" onChange={this.handleChangeForm} autoFocus required/>
                  </div>
                  <div >
                  <label for="cel">Celular</label><span id="cel" className="span"> * Celular es requerido</span>
                    <input name="cel" value={this.state.form.cel} type="text" placeholder="Celular" onChange={this.handleChangeForm} autoFocus required/>
                  </div>
                  <button className="button button2"  onClick={() => this.createForm(this.state.form)}>Guardar Formulario</button>
                  
                </div>
                
               </form>
               </div>
            </div>
            <div className="right">
              <h2>About</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            </div>
          </div>
          <div className="footer">Prueba Técnica</div>
          <div id="myModal" className="modal">
            <span className="close cursor" onClick={() => this.closeModal()}>&times;</span>
            <div className="modal-content">
              <div className="alert">
                <h3><strong>Success!</strong> Los datos del formulario se crearon correctamente.</h3>
                  
              </div>
             </div>
          </div>
      </div>
    )
  }


}


export default App;
