import React, { Component } from 'react';
import api from '../services/api';
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDolly, faHome, faUsersCog, faPeopleCarry, faClipboard, faChartLine } from '@fortawesome/fontawesome-free-solid'
import { Modal, Form, Table, Navbar, Nav, NavDropdown, FormControl, Col } from 'react-bootstrap';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Chart from "react-apexcharts";
import logoUfsc from '../assets/logoUfsc.png'

import Relatorio from './Relatorio';
import Estoque from './Estoque';
import UsuariosAdd from './UsuariosAdd';
import GerarPdf from './GerarPdf';

// import './Home.css';
import './Dashboard.css';
import Retirada from './Retirada';

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

class Dashboard extends Component {

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
                id: "basic-bar",
            },
            title: {
                text: "OS ITENS MAIS RETIRADOS NO MÊS DE JULHO",
                textAlign: 'center',
                style: {
                    fontSize: '18px',
                    textAlign: 'center',
                    alignItems: 'center'
                }
            },
            xaxis: {
                categories: ['teste']
            }
        },
        series: [
            {
                name: "",
                data: []
            }
        ],
        options2: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series2: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

    async componentDidMount() {
        const responseGraficoRetirada = await api.get('/get/graficoRetiradaMensal');

        let i;
        let arrayDescricao = [];
        let arrayQuantidade = [];

        for (i = 0; i < responseGraficoRetirada.data.length; i++) {
            arrayDescricao.push(responseGraficoRetirada.data[i].descricao);
            arrayQuantidade.push(responseGraficoRetirada.data[i].quantidade);
        }

        await this.setState({
            options: {
                ...this.state.options,
                xaxis: { categories: arrayDescricao }
            }
        })

        await this.setState({
            series: [
                ...this.state.series,
                {
                    name: "series-1",
                    data: arrayQuantidade
                }
            ]
        })

        console.log("tamanho do array: ", this.state.options);
        console.log("series: ", this.state.series[0].data);


        arrayDescricao.push()

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

                <Navbar id="navBoot" variant="dark">
                    <img id="logoUfsc" src={logoUfsc} />
                    <div style={{ justifyContent: 'center' }}>
                        {/* <p style={{ alignContent: 'center',  textAlign: 'center' }}>Retirada</p> */}
                    </div>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                </Navbar>

                <div id="conteudoGrafico">

                    <div id="conteudoGrafico2">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                            style={{ marginLeft: '10%'}}
                            id="g1"
                        />

                        {/* <Chart
                        options={this.state.options2}
                        series={this.state.series}
                        type="line"
                        width="500"
                        style={{marginLeft: '10%', marginTop: '10%'}}
                        // text="teste"
                        // id="g2"

                    />  */}

                        <Chart id="g2" options={this.state.options2} series={this.state.series2} type="line" width="500" />

                    </div>

                    <div style={style}>
                        Centro de Ciências, Tecnologias e Saúde (CTS) | Secretaria de Apoio à Direção (SAD) | Contato: sad.cts.ara@contato.ufsc.br                 </div>
                </div>

            </body>
        );
    }
}

export default Dashboard;