
import React, { Component } from 'react';
import './Estoque.css';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Modal, Form, Table, Navbar, Nav, NavDropdown, FormControl, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import logoUfsc from '../assets/logoUfsc.png'
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';


const columns = [{
    dataField: 'id_estoque',
    text: 'ID'
}, {
    dataField: 'nome',
    text: 'Nome'
}, {
    dataField: 'quantidade',
    text: 'Quantidade'
}];

class Estoque extends Component {

    state = {
        descricao: '',
        quantidade: '',
        estoque: [],
        editar: false,
        modalShow: false,
        deletar: false,
        search: '',
        show: false,
        idDeletar: '',
        idKey: '',
        showModalEditar: false,
        idEditar: '',
        descricaoEditar: '',
        quantidadeEditar: '',
    }

    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateInputEditar = this.updateInputEditar.bind(this);
        this.updateInput2Editar = this.updateInput2Editar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.pegarId = this.pegarId.bind(this);



    }

    async componentDidMount() {

        const response = await api.get('/posts/show');

        console.log("dados: ", response.data);

        await this.setState({
            estoque: response.data
        })

        console.log("estoque: ", this.state.estoque);

    }

    entrarEstoque = () => {
        this.props.history.push("/estoque")
    }

    entrarRelatorio = () => {
        this.props.history.push("/relatorio")
    }

    entrarRetirada = () => {
        this.props.history.push("/retirada")
    }

    entrarAddUser = () => {
        this.props.history.push({
            pathname: "/addUser",
            data: this.state.dadoUsuario
        });
    }

    updateInput(event) {
        this.setState({ descricao: event.target.value })
    }

    updateInput2(event) {
        this.setState({ quantidade: event.target.value })
    }

    async updateInputEditar(event) {
        await this.setState({ descricaoEditar: event.target.value });

        console.log("descrição editar: ", this.state.descricaoEditar);

    }

    async updateInput2Editar(event) {
        await this.setState({ quantidadeEditar: event.target.value })
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
            estoque: response2.data,
            modalShow: false,
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

    editarTabela = async (id, descricao, quantidade) => {
        console.log("id, descricao, quantidade: ", id, descricao, quantidade);

        this.setState({
            idEditar: id,
            descricaoEditar: descricao,
            quantidadeEditar: quantidade
        })


        this.setState({ showModalEditar: true })
    }

    salvarEdicao = async () => {
        await this.setState({
            editar: false
        })
    }

    pegarId = async (id, key) => {

        await this.setState({ idKey: key })
        await this.setState({ idDeletar: id })

        this.handleShow();
    }

    pesquisar(event) {
        this.setState({ search: event.target.value });
    }

    filtrar = async () => {
        console.log("campo da pesquisa: ", this.state.search);

        const response = await api.post('/posts/buscarItem', {
            nome: this.state.search,

        });

        console.log("response: ", response.data);

        if (response.data != 0) {
            this.setState({
                estoque: response.data
            })
        }
        else {
            console.log("entrou aqui!");

            this.setState({
                estoque: ['']
            })

            console.log("estoque: ", this.state.estoque);

        }

    }

    deletarTabela = () => {
        if (this.state.deletar == false) {
            this.setState({
                deletar: true
            })
        }
        else {
            this.setState({
                deletar: false
            })
        }
    }

    handleClose = () => {
        this.setState({ show: false, showModalEditar: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    deletar = async () => {
        this.setState({ show: false });
        console.log("id que vai ser deletado: ", this.state.idDeletar);


        const response = await api.post('posts/deletarItemEstoque', {
            id: this.state.idDeletar
        })

        const responseExibir = await api.get('/posts/show');

        await this.setState({
            estoque: responseExibir.data
        })

        console.log("estoque: ", this.state.estoque);



    }

    editarBanco = async () => {
        console.log("id: ", this.state.idEditar);
        console.log("descrição nova: ", this.state.descricaoEditar);
        console.log("quantidade nova: ", this.state.quantidadeEditar);

        const response = await api.post('/posts/editarEstoque', {
            id: this.state.idEditar,
            nome: this.state.descricaoEditar,
            quantidade: this.state.quantidadeEditar
        })

        const response2 = await api.get('/posts/show');

        console.log("dados: ", response2.data);

        await this.setState({
            estoque: response2.data,
            showModalEditar: false
        })



    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <body>
                {/* <nav id="navbar" className="nav navbar-nav navbar-right" >
                    <p className="titulo">GERENCIAMENTO DE ESTOQUE </p>
                </nav>
                <div id="wrapper" className="active">
                    <div id="sidebar-wrapper">
                        <ul id="sidebar_menu" className="sidebar-nav">
                            <li className="sidebar-brand"><img src={require('../assets/logoUfsc.png')} width="50" height="90%" alt="" /></li>
                        </ul>
                        <ul className="sidebar-nav" id="sidebar">

                            <a id="btnitens" onClick={() => this.entrarEstoque()}><li>Estoques</li></a>
                            <a id="btnitens" onClick={() => this.entrarAddUser()}><li>Usuários</li></a>
                            <a id="btnitens" onClick={() => this.entrarRetirada()}><li>Materiais</li></a>
                            <a id="btnitens" onClick={() => this.entrarRelatorio()}><li>Relatórios</li></a>

                        </ul>

                    </div>
                </div> */}

                <Modal
                    // {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.modalShow}
                    onHide={modalClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="tituloModal">
                            Novo Cadastro
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control onChange={this.updateInput} type="text" placeholder="Digite a descrição do material" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control onChange={this.updateInput2} placeholder="Quantidade" />
                            </Form.Group>
                            <Button variant="outline-primary" onClick={() => this.adicionar()}>
                                Adicionar
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja confirmar seu pedido?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => this.deletar()}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal editar */}
                <Modal show={this.state.showModalEditar} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="tituloModal">
                            Editar Estoque
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control onChange={this.updateInputEditar} type="text" placeholder={this.state.descricaoEditar} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control onChange={this.updateInput2Editar} placeholder={this.state.quantidadeEditar} />
                            </Form.Group>
                            <Button variant="outline-primary" onClick={() => this.editarBanco()}>
                                Adicionar
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>


                <Navbar id="navBoot" variant="dark">
                    <img id="logoUfsc" src={logoUfsc} />

                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link id="navLink" >
                            <Button variant="btn btn-outline-light" onClick={() => this.setState({ modalShow: true })}>
                                Adicionar Novo Item
                            </Button>
                            <Button variant="btn btn-outline-light" onClick={() => this.setState({ editar: !this.state.editar })}>Editar</Button>
                            <Button variant="btn btn-outline-light" onClick={() => this.deletarTabela()}>Deletar</Button>
                            {/* <a id="adicionarUser" onClick={() => this.setState({ modalShow: true })}><p id="btn-adicionar">Adicionar Usuário</p></a> */}
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" onChange={this.pesquisar} placeholder="Pesquisar..." className="mr-sm-2" />
                        <Button variant="btn btn-outline-light" onClick={() => this.filtrar()}>Pesquisar</Button>
                    </Form>
                </Navbar>


                <div id="conteudoEstoque">
        
                    {!this.state.deletar && !this.state.editar ?

                        <BootstrapTable keyField='id' pagination={paginator()} data={this.state.estoque} columns={columns} /> 

                        // <BootstrapTable
                        //     data={this.state.estoque}
                        //     pagination
                        //     id="tabelaBoot"
                        //     >
                        //     <TableHeaderColumn id="tabelaColumn" dataField='id_estoque' isKey>ID</TableHeaderColumn>
                        //     <TableHeaderColumn id="tabelaColumn" dataField='nome'>Nome</TableHeaderColumn>
                        //     <TableHeaderColumn id="tabelaColumn" dataField='quantidade'>Quantidade</TableHeaderColumn>
                        // </BootstrapTable>
                        // <Table striped bordered hover id="tabela2" paginatio={true}>
                        //     <thead>
                        //         <tr>
                        //             <th>ID</th>
                        //             <th>Descrição</th>
                        //             <th>Quantidade</th>
                        //         </tr>
                        //     </thead>
                        //     <tbody>
                        //         {this.state.estoque.map(function (autor) {
                        //             return (
                        //                 <tr>
                        //                     <td contentEditable={true}>{autor.id_estoque}</td>
                        //                     <td contenteditable={'true'}>{autor.nome}</td>
                        //                     <td contenteditable={'true'}>{autor.quantidade}</td>
                        //                 </tr>
                        //             );
                        //         })
                        //         }
                        //     </tbody>
                        // </Table>
                        : this.state.deletar && !this.state.editar ?
                            <Table striped bordered hover id="tabela2">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descrição</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.estoque.map((autor, id) => {
                                        return (
                                            <tr key={id}>
                                                <td contentEditable={true}><Button variant="danger" onClick={() => this.pegarId(autor.id_estoque, id)}>X</Button>{autor.id_estoque}</td>
                                                <td contenteditable={'true'}>{autor.nome}</td>
                                                <td contenteditable={'true'}>{autor.quantidade}</td>
                                            </tr>
                                        );
                                    })
                                    }
                                </tbody>
                            </Table>

                            :
                            <Table striped bordered hover id="tabela2">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descrição</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.estoque.map((autor, id) => {
                                        return (
                                            <tr key={id}>
                                                <td contentEditable={true}><Button variant="btn btn-secondary" onClick={() => this.editarTabela(autor.id_estoque, autor.nome, autor.quantidade)}>X</Button>{autor.id_estoque}</td>
                                                <td contenteditable={'true'}>{autor.nome}</td>
                                                <td contenteditable={'true'}>{autor.quantidade}</td>
                                            </tr>
                                        );
                                    })
                                    }
                                </tbody>
                            </Table>

                    }


                </div >
            </body >
        );
    }
}

export default Estoque;