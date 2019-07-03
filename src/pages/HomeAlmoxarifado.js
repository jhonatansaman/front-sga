import React, { Component } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faUsersCog, faPeopleCarry, faClipboard } from '@fortawesome/free-solid-svg-icons';

import './Home.css';

class HomeAlmoxarifado extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        nome: ''
    }

    async componentDidMount() {
        const { data } = this.props.location;

        const response = await api.post('/posts/buscarUser', {
            siape: data,
        });

        // await this.setState({
        //     nome: response.data[0].nome
        // })

    }


    entrar = () => {
        this.props.history.push("/estoque")
    }
 

    render() {
        return (
            <body>
                <nav id="navbar" className="nav navbar-nav navbar-right" >
                    <p className="titulo">Olá, {this.state.nome}</p>
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

                    <div id="g1">

                    </div>
                    <div id="g2">

                    </div>
                  
                </div>
            </body>
        );
    }
}

export default HomeAlmoxarifado;