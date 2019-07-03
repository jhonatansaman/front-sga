import React, { Component } from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

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

class Feed extends Component {

    state = {
        feed: [],
        siape: '',
        senha: '',
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
        return (
            <html>
                <header id="main-header">
                    <div className="header-content">
                        <img id="logoUfsc" src={logoUfsc} alt="InstaRocket" />
                        <p id="titulo">SISTEMA DE GERENCIAMENTO UFSC - CAMPUS ARARANGUÁ</p>
                    </div>
                </header>
                <section id="testebody">

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    // ariaHideApp={false}
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>
                        <button onClick={this.closeModal}>close</button>
                        <div className="Login">
                            <form>
                                <label>SIAPE</label>
                                <FormGroup controlId="email" bsSize="large">

                                    <FormControl
                                        autoFocus
                                        type="siape"
                                        value={this.state.email}
                                        onChange={this.updateInput}
                                    />
                                </FormGroup>
                                <label>Senha</label>
                                <FormGroup controlId="password" bsSize="large">
                                    {/* <ControlLabel>Password</ControlLabel> */}
                                    <FormControl
                                        value={this.state.password}
                                        type="password"
                                        onChange={this.updateInput2}
                                    />
                                </FormGroup>
                                    <Button
                                        block
                                        bsSize="large"
                                        // disabled={!this.validateForm()}
                                        // type="submit"
                                        onClick={this.testar}
                                    >

                                        Login
                                </Button>
                            </form>
                        </div>
                    </Modal>
                    <div id="container">
                        <div id="s1">
                            <p id="subtitle" ><a id="link" onClick={() => this.openModal()}>ALMOXARIFADO</a></p>
                        </div>
                        <div id="s2">
                            <p id="subtitle" ><a id="link" onClick={() => this.testar()}>EMPRÉSTIMO DE MATERIAIS</a></p>
                        </div>
                    </div>
                </section>
            </html >
        );
    }
}

export default Feed;