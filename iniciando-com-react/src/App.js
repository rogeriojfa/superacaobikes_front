import React from 'react';
import "./index.css"

class App extends React.Component {
  state = {
    nome: ""
  }

  constructor(){
    super()
    this.modificarNome = this.modificarNome.bind(this)
  }

  modificarNome(event){
      this.setState({
        nome: event.target.value
      })
  }

  criaCombobox = () => {
    const opcoes = ["Fulano", "Ciclano"]

    const comboboxOpcoes = opcoes.map(opcao => <option>{opcao}</option> )

    return (
      <select>
        {comboboxOpcoes}
      </select>
    )
    }
  

    
  render(){

    const MeuComboBox = () => this.criaCombobox();

    return (
      <>
      <input className="texto-centralizado" type="text" value={this.state.nome} onChange={this.modificarNome}/>
      <h1>Hello {this.state.nome}</h1>
      <MeuComboBox />
      </>
    ) 
    }
  }
  

export default App;
