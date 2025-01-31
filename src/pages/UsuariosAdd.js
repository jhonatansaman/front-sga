import React, { Component } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faUsersCog, faPeopleCarry, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Table, Navbar, Nav, NavDropdown, FormControl, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';

import './Home.css';
import './addUsuario.css';
import logoUfsc from '../assets/logoUfsc.png'


const options = [
    { value: 'servidor', label: 'Servidor' },
    { value: 'outros', label: 'Outros' },
];

const columns = [{
    dataField: 'siape',
    text: 'Siape'
}, {
    dataField: 'nome',
    text: 'Nome'
}, {
    dataField: 'email',
    text: 'E-mail'
}];

class UsuariosAdd extends Component {

    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateInput3 = this.updateInput3.bind(this);
        this.updateInput4 = this.updateInput4.bind(this);
        this.updateInput5 = this.updateInput5.bind(this);
        this.pesquisar = this.pesquisar.bind(this);


    }

    state = {
        siape: '',
        nome: '',
        email: '',
        tipo: '',
        senha: '',
        selectedOption: null,
        usuarios: [],
        modalShow: false,
        search: '',

    }

    async componentDidMount() {
        // const { data } = this.props.location;

        const response = await api.get('/posts/showUser');

        console.log("response: ", response.data);


        await this.setState({
            usuarios: response.data
        })

    }

    updateInput(event) {
        this.setState({ email: event.target.value })
    }
    updateInput2(event) {
        this.setState({ email: event.target.value })
    }
    updateInput3(event) {
        this.setState({ email: event.target.value })
    }

    updateInput4(event) {
        this.setState({ tipo: event.target.value })
    }

    updateInput5(event) {
        this.setState({ senha: event.target.value })
    }


    entrarEstoque = () => {
        this.props.history.push("/estoque");
    }

    entrarMateriais = () => {
        this.props.history.push({
            pathname: "/retirada",
            data: this.state.dadoUsuario
        });
    }

    entrarAddUser = () => {
        this.props.history.push({
            pathname: "/addUser",
            data: this.state.dadoUsuario
        });
    }

    entrarRelatorio = () => {
        this.props.history.push("/relatorio")
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.label);
        this.setState({
            tipo: selectedOption.label
        })
    };

    adicionarUsuario = async () => {

        if (this.state.tipo == "Servidor") {
            await this.setState({
                tipo: 1
            })
        }
        else {
            await this.setState({
                tipo: 2
            })
        }

        console.log("tipo do servidor: ", this.state.tipo)

        const obj = { SIAPE: this.state.siape, nome: this.state.nome, email: this.state.email };

        const response = await api.post('/posts/inserirUsuario', {
            siape: this.state.siape,
            nome: this.state.nome,
            email: this.state.email,
            tipo: this.state.tipo,
            senha: this.state.senha,
        });

        console.log("ok: ", response.data);

        const response2 = await api.get('/posts/showUser');

        console.log("dados: ", response2.data);

        await this.setState({
            usuarios: response2.data
        })

    }

    filtrar = async () => {
        console.log("campo da pesquisa: ", this.state.search);

        const response = await api.post('/posts/searchUser', {
            nome: this.state.search,
        });

        console.log("response: ", response.data);

        if (response.data != 0) {
            this.setState({
                usuarios: response.data
            })
        }
        else {
            console.log("entrou aqui!");

            this.setState({
                usuarios: ['']
            })
        }



    }


    pegarId = async (id) => {
        console.log("o id é: ", id);

    }

    pesquisar(event) {
        this.setState({ search: event.target.value })
    }

    render() {

        const { selectedOption } = this.state;
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <body>

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
                        <Form className="formulario">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>SIAPE</Form.Label>
                                    <Form.Control required onChange={this.updateInput} placeholder="Digite o SIAPE" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control onChange={this.updateInput3} type="text" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control onChange={this.updateInput2} type="text" />
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Tipo</Form.Label>
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                        id="selectar"
                                        required
                                        placeholder="Tipo de usuário"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridAddress1">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" required onChange={this.updateInput5} placeholder="Digite a senha" />
                                </Form.Group>

                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={() => this.adicionarUsuario()}>
                            Adicionar Usuário
                        </Button>
                        <Button variant="outline-danger" onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>


                <Navbar id="navBoot" variant="dark">
                    <img id="logoUfsc" src={logoUfsc} />

                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link id="navLink" >
                            <Button variant="btn btn-outline-light" onClick={() => this.setState({ modalShow: true })}>
                                Adicionar Usuário
                            </Button>
                            {/* <a id="adicionarUser" onClick={() => this.setState({ modalShow: true })}><p id="btn-adicionar">Adicionar Usuário</p></a> */}
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" onChange={this.pesquisar} placeholder="Pesquisar..." className="mr-sm-2" />
                        <Button variant="btn btn-outline-light" onClick={() => this.filtrar()}>Pesquisar</Button>
                    </Form>
                </Navbar>


                <div id="conteudoUsuario">
                    {/* 
                    <Table striped bordered hover id="tabela2">
                        <thead>
                            <tr>
                                <th>SIAPE</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuarios.map(function (autor) {
                                return (
                                    <tr>
                                        <td>{autor.siape}</td>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </Table> */}
                    <BootstrapTable keyField='id' pagination={paginator()} data={this.state.usuarios} columns={columns} />

                    {/* <BootstrapTable
                        data={this.state.usuarios}
                        pagination>
                        <TableHeaderColumn dataField='siape' isKey>SIAPE</TableHeaderColumn>
                        <TableHeaderColumn dataField='nome'>Nome</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
                    </BootstrapTable> */}

                </div>
            </body >
        );
    }
}

export default UsuariosAdd;