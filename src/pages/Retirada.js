
import React, { Component } from 'react';
import './Estoque.css';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Modal, Form, Table, Navbar, Nav, NavDropdown, FormControl, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Retirada.css'
import Select from 'react-select';
import logoUfsc from '../assets/logoUfsc.png'
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class Retirada extends Component {

    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateInput3 = this.updateInput3.bind(this);
        this.updateInput4 = this.updateInput4.bind(this);
        this.updateInput5 = this.updateInput5.bind(this);
        this.updateInput6 = this.updateInput6.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            estoque: [],
            editar: false,
            modalShow: false,
            deletar: true,
            search: '',
            carrinho: [{ descricao: '', quantidade: '' }],
            siape: '',
            email: '',
            nome: '',
            descricao: '',
            qtde: '',
            funcao: '',
            nomeMaterial: [],
            input: '',
            selectedOption: null,
            dadoUsuario: '',
            nome: '',
            email: '',
            digitouSiape: false,
            tipo: '',
            arrayNomeMaterial: '',
            materialSelecionado: '',
            arrayPedido: [],
            analisarButton: true,
            show: false,
            id_usuario: '',
            id_estoque: '',
            dia: '',
            mes: '',
            ano: '',
            name: 'Adrian',
            receiptId: 0,
            price1: 0,
            price2: 0,
            habilitar: true,
            dSiape: false,
            dDescricao: false,
            dQuantidade: false,
            
        }
    }

    async componentDidMount() {

        const response = await api.get('/posts/show');

        await this.setState({
            estoque: response.data
        })


        let nomeMaterial = []
        this.state.estoque.map((item) => {
            nomeMaterial = [...nomeMaterial, item.nome]
        })
        await this.setState({ nomeMaterial });


        const newNames = this.state.nomeMaterial.map(name => {
            return { value: name, label: name };
        });


        await this.setState({
            arrayNomeMaterial: newNames
        })

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.label);
        this.setState({
            materialSelecionado: selectedOption.label,
            dDescricao: true,
        })
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onChangeHandler(e) {
        this.setState({
            input: e.target.value,
        })
    }

    entrarEstoque = () => {
        this.props.history.push("/estoque")
    }

    entrarRelatorio = () => {
        this.props.history.push("/relatorio")
    }

    entrarAddUser = () => {
        this.props.history.push({
            pathname: "/addUser",
            data: this.state.dadoUsuario
        });
    }

    async updateInput(event) {
        await this.setState({ siape: event.target.value })
        await this.setState({ digitouSiape: true })
        // onBlur={this.consultarSiape()}
        this.consultarSiape();

    }

    updateInput2(event) {
        this.setState({ email: event.target.value })
    }

    updateInput3(event) {
        this.setState({ nome: event.target.value })
    }

    updateInput4(event) {
        this.setState({ descricao: event.target.value })
    }

    updateInput5(event) {
        this.setState({ 
            quantidade: event.target.value,
            dQuantidade: true
        })

        this.habilitarCarrinho();
       
            
    }

    updateInput6(event) {
        this.setState({ funcao: event.target.value })
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

        // console.log("estoque: ", this.state.estoque);

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

    pegarId = async () => {
        console.log("o id é: ");

    }

    pesquisar(event) {
        this.setState({ search: event.target.value })
    }

    suggestionSelected(value) {
        console.log("value: ", value);

        this.setState({
            input: value,
        })

    }

    adicionarCarrinho = async () => {

        console.log("nome: ", this.state.nome);
        console.log("material selecionado: ", this.state.materialSelecionado);
        console.log("quantidade: ", this.state.quantidade);

        const teste = [this.state.nome, this.state.materialSelecionado, this.state.quantidade];

        const obj = { descricao: this.state.materialSelecionado, quantidade: this.state.quantidade, nome: this.state.nome };

        await this.setState({
            arrayPedido: [...this.state.arrayPedido, obj],
            analisarButton: false
        });

        console.log("array pedido: ", this.state.arrayPedido);

    }

    async dataAtual() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        await this.setState({
            dia: dd,
            mes: mm,
            ano: yyyy
        })
    }


    confirmarRetirada = async () => {

        const response = await api.post('/posts/buscarItem', {
            nome: this.state.materialSelecionado,

        });

        await this.setState({
            id_estoque: response.data[0].id_estoque,
            show: false,
        })

        this.dataAtual();

        console.log("SIAPE: ", this.state.siape);
        console.log("descricao: ", this.state.materialSelecionado);
        console.log("quantidade: ", this.state.quantidade);
        console.log("dia: ", this.state.dia);
        console.log("mes: ", this.state.mes);
        console.log("ano: ", this.state.ano);
        console.log("id usuario: ", this.state.id_usuario);
        console.log("id estoque: ", this.state.id_estoque);

        const responseInserir = await api.post('/posts/inserirRetirada' ,{
            siape: this.state.siape,
            descricao: this.state.materialSelecionado,
            quantidade: this.state.quantidade,
            dia: this.state.dia,
            mes: this.state.mes,
            ano: this.state.ano,
            id_usuario: this.state.id_usuario,
            id_estoque: this.state.id_estoque
        })

        console.log("response inserir: ", responseInserir);
        

        this.atualizarEstoque();

    }

    async atualizarEstoque() {
        const response = await api.post('/posts/buscarItem', {
            nome: this.state.materialSelecionado,

        });

        let novaQuantidade = response.data[0].quantidade - this.state.quantidade;

        console.log("nova Quantidade: ", novaQuantidade);

        const responseAtualizar = await api.post('/posts/editarEstoqueQuantidade', {
            id: response.data[0].id_estoque,
            quantidade: novaQuantidade
        })
    }


    consultarSiape = async () => {
        console.log("siape: ", this.state.siape);

        // console.log("consultando!");

        if (this.state.digitouSiape == true) {
            const response = await api.post('/posts/buscarUser', {
                siape: this.state.siape
            });

            if (response.data != 0) {
                this.setState({
                    id_usuario: response.data[0].idusuario,
                    nome: response.data[0].nome,
                    email: response.data[0].email,
                    dSiape: true
                })
                if (response.data[0].tipo == 1)
                    this.setState({ tipo: 'Docente' })
                if (response.data[0].tipo == 2)
                    this.setState({ tipo: 'TAE' })
            }
        }

        if (this.state.siape == '') {
            this.setState({
                nome: '',
                email: ''
            })
        }

    }



    consultarQuantidade = async() => {

        console.log("material selecionado: ", this.state.materialSelecionado);

        const response = await api.post('/posts/buscarItem', {
            nome: this.state.materialSelecionado
        })

        let quantidade = response.data[0].quantidade;
        let quantidadeRestante = quantidade - this.state.quantidade;
        
        console.log("Quantidade no estoque: ", quantidade);
        console.log("Quantidade restante: ", quantidadeRestante);
        
       
        if(quantidadeRestante <= 0) {
            await this.setState({ habilitar: false })
            // alert("Estoque esgotou");
        }
        else{
            await this.setState({ habilitar: false })
        }
    }

    habilitarCarrinho = async() => {
        if(this.state.dDescricao==true && this.state.dSiape==true && this.state.dQuantidade==true){
            await this.setState({ habilitar: false })            
        }
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false });

        const list = this.state.nomeMaterial
            .filter(d => this.state.input === '' || d.includes(this.state.input))
            .map((d, index) => <li key={index}>{d}</li>);


        const { selectedOption } = this.state;


        return (
            <body>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja confirmar seu pedido?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => this.confirmarRetirada()}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Navbar id="navBoot" variant="dark">
                    <img id="logoUfsc" src={logoUfsc} />
                    <div style={{justifyContent: 'center'}}>
                        {/* <p style={{ alignContent: 'center',  textAlign: 'center' }}>Retirada</p> */}
                    </div>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                </Navbar>

                <div id="conteudo">
                    <Form className="formulario">
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>SIAPE</Form.Label>
                                <Form.Control required onChange={this.updateInput} placeholder="Digite o SIAPE" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control value={this.state.email} onChange={this.updateInput2} type="text" />
                            </Form.Group>


                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control value={this.state.nome} onChange={this.updateInput3} type="text" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Descrição</Form.Label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.arrayNomeMaterial}
                                    id="selectar"
                                    required
                                />

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control required onChange={this.updateInput5} placeholder="Digite a quantidade de material..." />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Função</Form.Label>
                                <Form.Control onChange={this.updateInput6} placeholder="" value={this.state.tipo} />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="outline-primary" disabled={this.state.habilitar} onClick={() => this.adicionarCarrinho()}>
                            Adicionar ao Carrinho
                        </Button>

                        <Button variant="outline-success" onClick={this.handleShow} disabled={this.state.analisarButton}>
                            Confirmar Solicitação
                        </Button>
                        
                        <Table striped bordered hover id="tabela2">
                            <thead>
                                <tr>
                                    {/* <th id="btnDelete"></th> */}
                                    <th>Descrição</th>
                                    <th>Quantidade</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.arrayPedido.map(function (autor) {
                                    return (
                                        <tr>
                                            <td>{autor.descricao}</td>
                                            <td>{autor.quantidade}</td>
                                            <td>{autor.nome}</td>
                                        </tr>
                                    );
                                })
                                }
                            </tbody>
                        </Table>
                    </Form>
                </div >
            </body >
        );
    }
}


export default Retirada;