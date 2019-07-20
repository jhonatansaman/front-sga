import React, { Component } from 'react';
// import Modal from 'react-modal';
// import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// import ControlLabel from 'react-bootstrap/Control';

import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';
import logoUfsc from '../assets/logoUfsc.png'
import Background from '../assets/background-159244_1280.png';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '200',
        bottom: '300',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}


class Feed extends Component {

    state = {
        feed: [],
        siape: '',
        senha: '',
        modalShow: false,

    }

    constructor() {
        super();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    async componentDidMount() {
        // Modal.setAppElement('section')
        // this.registerToSocket();

        // const response = await api.get('posts');

        // this.setState({ feed: response.data });
    }


    testar = async () => {

        const response = await api.post('/posts/buscar', {
            siape: this.state.siape,
            senha: this.state.senha
        });

        console.log(response);

        if (response.data == 1) {
            alert("Login efetuado com sucesso!");

            this.props.history.push({
                pathname: "/home",
                data: this.state.siape
            });
        } else {
            alert("Login ou senha inválidos!")
        }

        console.log("siape: ", this.state.siape);
        console.log("senha: ", this.state.senha);

    }

    updateInput(event) {
        this.setState({ siape: event.target.value })
    }

    updateInput2(event) {
        this.setState({ senha: event.target.value })
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <html>
                <header id="main-header">
                    <div className="header-content">
                        <img id="logoUfsc" src={logoUfsc} alt="InstaRocket" />
                        <p id="titulo">SISTEMA DE GERENCIAMENTO UFSC - CAMPUS ARARANGUÁ</p>
                    </div>
                </header>
                {/* <section id="testebody"> */}


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
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>SIAPE</Form.Label>
                                <Form.Control type="`siape`" onChange={this.updateInput} placeholder="Entre com seu SIAPE ou e-mail" />
                                <Form.Text className="text-muted">
                                    Nós não compartinhamos seu SIAPE ou e-mail com ninguém.
                            </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control onChange={this.updateInput2} type="password" placeholder="Senha" />
                            </Form.Group>
                            <Button variant="primary" onClick={this.testar}>
                                Entrar
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <div id="container">
                    <div id="s1">
                        <p id="subtitle" ><a id="link" onClick={() => this.setState({ modalShow: true })}>ALMOXARIFADO</a></p>
                    </div>
                    <div id="s2">
                        <p id="subtitle" ><a id="link" onClick={() => this.testar()}>EMPRÉSTIMO DE MATERIAIS</a></p>
                    </div>
                    <div style={style}>
                    Centro de Ciências, Tecnologias e Saúde (CTS) | Secretaria de Apoio à Direção (SAD) | Contato: sad.cts.ara@contato.ufsc.br                    </div>
                </div>
                {/* </section> */}
            </html >
        );
    }
}

export default Feed;