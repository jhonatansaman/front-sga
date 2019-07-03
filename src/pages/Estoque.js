
import React, { Component } from 'react';
import './Estoque.css';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


class Estoque extends Component {

    state = {
        descricao: '',
        quantidade: '',
        estoque: [],
        editar: false,
    }

    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);


    }

    async componentDidMount() {

        const response = await api.get('/posts/show');

        console.log("dados: ", response.data);

        await this.setState({
            estoque: response.data
        })

        console.log("estoque: ", this.state.estoque);
    }

    entrar = () => {
        this.props.history.push("/estoque")
    }

    updateInput(event) {
        this.setState({ descricao: event.target.value })
    }

    updateInput2(event) {
        this.setState({ quantidade: event.target.value })
    }

    adicionar = async () => {
        console.log("descricao: ", this.state.descricao);
        console.log("quantidade: ", this.state.quantidade);

        let qtde = parseInt(this.state.quantidade);

        const response = await api.post('/posts/adicionarItem', {
            nome: this.state.descricao,
            quantidade: qtde
        });

        const response2 = await api.get('/posts/show');

        console.log("dados: ", response2.data);

        await this.setState({
            estoque: response2.data
        })

    }

    mostrarItens = async () => {
        const response = await api.get('/posts/show');

        console.log("dados: ", response.data);

        await this.setState({
            estoque: response.data
        })

        console.log("estoque: ", this.state.estoque);

    }


    editarTabela = async () => {
        await this.setState({
            editar: true
        })
        
    }

    salvarEdicao = async () => {
        await this.setState({
            editar: false
        })
    }

    render() {
        return (
            <body>
                <nav id="navbar" className="nav navbar-nav navbar-right" >
                    <p className="titulo">Olá, </p>
                </nav>
                <div id="wrapper" className="active">
                    <div id="sidebar-wrapper">
                        <ul id="sidebar_menu" className="sidebar-nav">
                            <li className="sidebar-brand"><img src={require('../assets/logoUfsc.png')} width="50" height="90%" alt="" /></li>
                        </ul>
                        <ul className="sidebar-nav" id="sidebar">

                            <a id="btnitens" onClick={() => this.entrar()}><li>Estoques</li></a>
                            <a id="btnitens"><li>Usuários</li></a>
                            <a id="btnitens"><li>Materiais</li></a>
                            <a id="btnitens"><li>Relatórios</li></a>

                        </ul>

                    </div>
                </div>

                <div id="conteudo">

                    {/* <div className="adicionarItem">
                        <h1 id="tituloNav">Adicionar novo Item</h1>
                        <div id="cadastrarItem">
                            <label>Descricao: </label>
                            <input id="inputCadastroItem" onChange={this.updateInput}></input><br />
                            <label>Quantidade: </label>
                            <input id="inputCadastroItem" onChange={this.updateInput2}></input> <br />
                            <button id="btnAdicionar" onClick={() => this.adicionar()}>Adicionar</button>
                        </div>
                    </div> */}

                    <ButtonToolbar>
                        <Button variant="primary" onClick={() => this.editarTabela()}>Editar</Button>
                        {this.state.editar ? 
                        <Button variant="primary" onClick={() => this.salvarEdicao()}>Salvar Edição</Button>
                        : false}
                    </ButtonToolbar>

                    <button>Adicionar Novo Item</button>

                    <div className="adicionarItem">
                        <div id="cadastrarItem">

                            <table id="tabela">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.estoque.map(function (autor) {
                                            return (
                                                <tr key={autor.id_estoque}>
                                                    <td contentEditable={true}>{autor.id_estoque}</td>
                                                    <td contenteditable={'true'}>{autor.nome}</td>
                                                    <td contenteditable={'true'}>{autor.quantidade}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div >
            </body >
        );
    }
}

export default Estoque;