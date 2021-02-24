import React from "react";
import ProdutoService from "./../../app/produtoService";
import { withRouter } from "react-router-dom";
import Card from "../../components/card"

const estadoInicial = {
  nome: "",
  sku: "",
  descricao: "",
  preco: 0,
  fornecedor: "",
  sucesso: false,
  errors: [],
  atualizando: false,
};

class CadastroProduto extends React.Component {
  state = estadoInicial;

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  onChange = (event) => {
    const valor = event.target.value;
    const nomeCampo = event.target.name;
    this.setState({ [nomeCampo]: valor });
  };

  onSubmit = (event) => {
    
    event.preventDefault();

    const produto = {
      nome: this.state.nome,
      sku: this.state.sku,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: this.state.fornecedor,
    };
    try {
      this.service.salvar(produto);
      this.limpaCampos();
      this.setState({ sucesso: true });
    } catch (erro) {
      const errors = erro.errors;
      this.setState({ errors: errors });
    }
  };

  limpaCampos = (event) => {
    this.setState(estadoInicial);
  };

  componentDidMount() {
    const sku = this.props.match.params.sku;
    if (sku) {
      const resultado = this.service
        .obterProdutos()
        .filter((prod) => prod.sku === sku);

      if (resultado.length === 1) {
        const produtoEncontrado = resultado[0];
        this.setState({ ...produtoEncontrado, atualizando: true });
      }
    }
  }

  render() {
    return (
      <Card header={ this.state.atualizando ? "Edição de produtos " : "Cadastro de produtos"}>

          <form id="produto" onSubmit={this.onSubmit}>
            {this.state.sucesso && (
              <div class="alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Bom trabalho!</strong> Cadastro realizado com sucesso!
              </div>
            )}

            {this.state.errors.length > 0 &&
              this.state.errors.map((msg) => {
                return (
                  <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">
                      &times;
                    </button>
                    <strong>Erro: </strong> {msg}
                  </div>
                );
              })}

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Nome: *</label>
                  <input
                    type="text"
                    name="nome"
                    value={this.state.nome}
                    onChange={this.onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>SKU: *</label>
                  <input
                    type="text"
                    name="sku"
                    disabled={this.state.atualizando}
                    value={this.state.sku}
                    onChange={this.onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Descrição: *</label>
                  <textarea
                    name="descricao"
                    value={this.state.descricao}
                    onChange={this.onChange}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Valor Venda: *</label>
                  <input
                    type="text"
                    name="preco"
                    value={this.state.preco}
                    onChange={this.onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Fornecedor: *</label>
                  <input
                    type="text"
                    name="fornecedor"
                    value={this.state.fornecedor}
                    onChange={this.onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-1">
                <button type="submit" className="btn btn-success">
                  Salvar
                </button>
              </div>
              <div className="col-md-1">
                <button onClick={this.limpaCampos} className="btn btn-primary">
                  Limpar
                </button>
              </div>
            </div>
          </form>
      </Card>
     );
  }
}

export default withRouter(CadastroProduto);
