import React, { Component } from 'react';
import api from '../services/api';
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDolly, faHome, faUsersCog, faPeopleCarry, faClipboard } from '@fortawesome/fontawesome-free-solid'


import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Chart from "react-apexcharts";

import Relatorio from './Relatorio';
import Estoque from './Estoque';
import UsuariosAdd from './UsuariosAdd';
import GerarPdf from './GerarPdf';


import './Home.css';
import Retirada from './Retirada';

class HomeAlmoxarifado extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        nome: '',
        dadoUsuario: '',
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho']
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70]
            }
        ],
        
    }

    async componentDidMount() {
        const { data } = this.props.location;

        const response = await api.post('/posts/buscarUser', {
            siape: data,
        });

        // await this.setState({
        //     dadoUsuario: response.data[0]
        // })

        // await this.setState({
        //     nome: response.data[0].nome
        // })

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

    render() {
        return (
            <body>
                {/* <nav id="navbar" className="nav navbar-nav navbar-right" >
                    <p className="titulo">Olá, Anderson Luiz Perez</p>

                </nav> */}
                {/* <div id="wrapper" className="active">
                    <div id="sidebar-wrapper">
                        <ul id="sidebar_menu" className="sidebar-nav">
                            <li className="sidebar-brand"><img src={require('../assets/logoUfsc.png')} width="50" height="90%" alt="" /></li>
                        </ul>
                        <ul className="sidebar-nav" id="sidebar">

                            <a id="btnitens" onClick={() => this.entrarEstoque()}><li>Estoques</li></a>
                            <a id="btnitens" onClick={() => this.entrarAddUser()}><li>Usuários</li></a>
                            <a id="btnitens" onClick={() => this.entrarMateriais()}><li>Materiais</li></a>
                            <a id="btnitens"><li>Relatórios</li></a>

                        </ul>
                    </div>
                </div>  */}
                <Router>
                    <Route render={({ location, history }) => (
                        <React.Fragment>
                            <SideNav
                                onSelect={(selected) => {
                                    const to = '/' + selected;
                                    console.log("selected: ", selected);

                                    if (location.pathname !== to) {
                                        history.push(to);
                                    }
                                }}
                                style={{ backgroundColor: '#00366d' }}
                            >
                                <SideNav.Toggle />
                                <SideNav.Nav defaultSelected="home">
                                    <NavItem eventKey="home">
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Home
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="usuariosAdd">
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faUsersCog} style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Usuários
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="estoque">
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faDolly} style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Estoque
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="materiais">
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faPeopleCarry} style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Retirada
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="devices">
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faClipboard} style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Relatorio
                                        </NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>
                            <main>
                                {/* <Route path="/" exact component={props => <RootComponent />} /> */}
                                {/* <Route path="/home" component={props => <HomeAlmoxarifado />} /> */}
                                <Route path="/estoque" component={props => <Estoque />} />
                                <Route path="/usuariosAdd" component={props => <UsuariosAdd />} />
                                <Route path="/materiais" component={props => <Retirada />} />
                                <Route path="/devices" component={props => <Relatorio />} />
                                {/* <Route path="/pdf" component={props => <GerarPdf />} /> */}
                            </main>
                        </React.Fragment>
                    )}
                    />
                </Router>
                <div id="conteudo">
                    
                    {/* <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width="500"
                        style={{marginLeft: '10%', marginTop: '10%'}}
                    /> */}
                    {/* 
                    <div id="g1">

                    </div>
                    <div id="g2">

                    </div> */
                    }

                </div>

                <footer id="footer">

                </footer>
            </body>
        );
    }
}

export default HomeAlmoxarifado;