import React, { Component } from 'react';
import './Estoque.css';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import './Relatorio.css';
import { Modal, Form, Table, Navbar, Nav, NavDropdown, FormControl, Col } from 'react-bootstrap';
import Select from 'react-select';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import logoUfsc from '../assets/logoUfsc.png'

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const colstyle = {
    width: "30%"
};
const tableStyle = {
    width: "100%"
};
const options = [
    { value: '1', label: 'Escolha' },
    { value: '2', label: 'Data' },
    { value: '3', label: 'Usuário' },
    { value: '4', label: 'Material' },
];

const dia = [
    { value: '1', label: '01' },
    { value: '2', label: '02' },
    { value: '3', label: '03' },
    { value: '4', label: '04' },
    { value: '5', label: '05' },
    { value: '6', label: '06' },
    { value: '7', label: '07' },
    { value: '8', label: '08' },
    { value: '9', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' },
];

const mes = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },

]

const ano = [
    { value: '1', label: '2019' }
]

const Prints = () => (
    <div>
        <h3>Time & Materials Statement of Work (SOW)</h3>
        <h4>General Information</h4>
        <table id="tab_customers" className="table table-striped" style={tableStyle}>
            <colgroup>
                <col span="1" style={colstyle} />
                <col span="1" style={colstyle} />
            </colgroup>
            <thead>
                <tr className="warning">
                    <th>SOW Creation Date</th>
                    <th>SOW Start Date</th>
                    <th>Project</th>
                    <th>Last Updated</th>
                    <th>SOW End Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dec 13, 2017</td>
                    <td>Jan 1, 2018</td>
                    <td>NM Connect - NMETNMCM</td>
                    <td>Dec 13, 2017</td>
                    <td>Dec 31, 2018</td>
                </tr>
            </tbody>
        </table>
        <p>
            This is a Time and Materials Statement of Work between Northwestern Mutual
            Life Insurance Company and Infosys with all general terms and conditions
            as described in the current Master Agreement and its related documents
        </p>
    </div>
);

const print = (props) => {
    const string = renderToString(<Prints />);
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.fromHTML(window.document.getElementById('gerarPdf'), 10, 10, { 'width': 100 });
    // const columns = [
    //     "SOW Creation Date",
    //     "SOW Start Date",
    //     "Project",
    //     "Last Updated",
    //     "SOW End Date"
    // ];
    // var rows = [
    //     [
    //         "Dec 13, 2017",
    //         "Jan 1, 2018",
    //         "ABC Connect - ABCXYZ",
    //         "Dec 13, 2017",
    //         "Dec 31, 2018"
    //     ]
    // ];
    // pdf.fromHTML(string);
    pdf.save("pdf");
};


const columns = [{
    dataField: 'siape',
    text: 'Siape'
}, {
    dataField: 'descricao',
    text: 'Descrição'
}, {
    dataField: 'quantidade',
    text: 'Quantidade'
}];

class Relatorio extends Component {

    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);


        this.state = {
            filename: '',
            input: '',
            nome: '',
            result: '',
            value: 'coconut',
            selectedOption: null,
            selectedOption2: null,
            selectedDia: null,
            selectedMes: null,
            selectedAno: null,
            arrayTipoRelatorio: [],
            tipoRelatorio: 1,
            consulta: '',
            habilitar: true,
            arrayNomeMaterial: '',
            arrayBuscaMaterial: '',
            arrayBuscaUsuario: '',
            siape: '',
            digitouSiape: false

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

        console.log("nome Material novo: ", newNames);

        await this.setState({
            arrayNomeMaterial: newNames
        })

        console.log("nome dos materiais: ", this.state.arrayNomeMaterial)
    }

    onChangeHandler(e) {
        this.setState({
            input: e.target.value,
        })
    }

    entrarEstoque = () => {
        this.props.history.push("/estoque")
    }

    entrarAddUser = () => {
        this.props.history.push({
            pathname: "/addUser",
            data: this.state.dadoUsuario
        });
    }

    entrarMateriais = () => {
        this.props.history.push({
            pathname: "/retirada",
            data: this.state.dadoUsuario
        });
    }

    entrarRelatorio = () => {
        this.props.history.push("/relatorio")
    }

    gerarRelatorio = async () => {
        await this.setState({ habilitar: false })

        console.log("mês: ", this.state.selectedMes.value);
        console.log("ano: ", this.state.selectedAno.label);

        const responseMesAno = await api.post('/posts/gerarRelatorioMesAno', {
            mes: this.state.selectedMes.value,
            ano: this.state.selectedAno.label
        })

        console.log("response: ", responseMesAno.data);

        await this.setState({
            consulta: responseMesAno.data
        })

        // console.log("filename: ", this.state.filename)

        // const response = api.post('/posts/gerarRelatorio', {
        //     filename: this.state.filename
        // }) 
    }


    async updateInput(event) {
        await this.setState({ siape: event.target.value })
        await this.setState({ digitouSiape: true })

        this.consultarSiape();

    }

    async updateInput2(event) {
        this.setState({ nome: event.target.value })
        console.log("nome: ", this.state.nome);

    }

    onTodoChange(value) {
        this.setState({
            name: value
        });
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.label);
        if (selectedOption.value == 2) {
            this.setState({ tipoRelatorio: 2 })
        }
        if (selectedOption.value == 3) {
            this.setState({ tipoRelatorio: 3 })
        }
        if (selectedOption.value == 4) {
            this.setState({ tipoRelatorio: 4 })
        }
    };

    handleChange5 = selectedOption2 => {
        this.setState({ selectedOption2 });

    };


    handleChange2 = selectedDia => {
        this.setState({ selectedDia });
        console.log(`Option selected:`, selectedDia.label);

    };

    handleChange3 = selectedMes => {
        this.setState({ selectedMes });
        console.log(`Option selected:`, selectedMes.label);

    };
    handleChange4 = selectedAno => {
        this.setState({ selectedAno });
        console.log(`Option selected:`, selectedAno.label);

    };

    consultarMaterial = async () => {

        await this.setState({ habilitar: false })

        const response = await api.post('/posts/gerarRelatorioMaterial', { //vou criar uma nova rota 
            descricao: this.state.selectedOption2.label
        })

        this.setState({ arrayBuscaMaterial: response.data })

        console.log("busca pelo material: ", this.state.arrayBuscaMaterial);

    }

    consultarUsuario = async () => {
        await this.setState({ habilitar: false })

        const response = await api.post('/posts/gerarRelatorioUsuario', { //vou criar uma nova rota 
            siape: this.state.siape
        })

        this.setState({ arrayBuscaUsuario: response.data })

        console.log("busca pelo material: ", this.state.arrayBuscaUsuario);
    }


    consultarSiape = async () => {
        console.log("siape: ", this.state.siape);

        console.log("digitou siape: ", this.state.digitouSiape);

        // console.log("consultando!");

        if (this.state.digitouSiape == true) {
            const response = await api.post('/posts/buscarUser', {
                siape: this.state.siape
            });

            if (response.data != 0) {
                this.setState({
                    id_usuario: response.data[0].idusuario,
                    nome: response.data[0].nome,
                    email: response.data[0].email
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
    render() {

        const { selectedOption } = this.state;

        return (

            <body>
                {/* <nav id="navbar" className="nav navbar-nav navbar-right" >
                    <h3 className="titulo">GERAR RELATÓRIO</h3>
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
                            <a id="btnitens" onClick={() => this.entrarRelatorio()}><li>Relatórios</li></a>

                        </ul>

                    </div>
                </div>  */}


                <Navbar id="navBoot" variant="dark">
                    <img id="logoUfsc" src={logoUfsc} />

                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}

                </Navbar>

                <div id="conteudo">
                    {this.state.tipoRelatorio == 2 ?

                        <Form className="formulario">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Tipo de Relatório</Form.Label>
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                        id="selectar"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Dia</Form.Label>
                                    <Select
                                        value={this.state.selectedDia}
                                        onChange={this.handleChange2}
                                        options={dia}
                                        id="selectar"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Mês</Form.Label>
                                    <Select
                                        value={this.state.mes}
                                        onChange={this.handleChange3}
                                        options={mes}
                                        id="selectar"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Ano</Form.Label>
                                    <Select
                                        value={this.state.ano}
                                        onChange={this.handleChange4}
                                        options={ano}
                                        id="selectar"
                                        required
                                    />
                                </Form.Group>
                            </Form.Row>

                            <br />
                            <Button variant="primary" onClick={() => this.gerarRelatorio()}>
                                Consultar
                            </Button>

                            <Button variant="primary" disabled={this.state.habilitar} onClick={print}>Gerar Relatório</Button>

                            <br />
                            <br />

                            <div id="gerarPdf" >
                                <BootstrapTable keyField='id' pagination={paginator()} data={this.state.consulta} columns={columns} /> <br />
                            </div>

                        </Form>

                        : this.state.tipoRelatorio == 3 ?
                            <Form className="formulario">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Tipo de Relatório</Form.Label>
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                            id="selectar"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>SIAPE</Form.Label>
                                        <Form.Control type="text" onChange={this.updateInput} placeholder="Digite o SIAPE" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control value={this.state.nome} type="text" onChange={this.updateInput2} placeholder="Nome" />
                                    </Form.Group>

                                </Form.Row>


                                <Button variant="primary" onClick={() => this.consultarUsuario()}>
                                    Consultar
                                </Button>

                                <Button variant="primary" disabled={this.state.habilitar} onClick={print}>Gerar Relatório</Button>

                                <br />
                                <br />

                                <div id="gerarPdf" >
                                    <BootstrapTable keyField='id' pagination={paginator()} data={this.state.arrayBuscaUsuario} columns={columns} /> <br />
                                </div>
                            </Form>
                            :
                            <Form className="formulario">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Tipo de Relatório</Form.Label>
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                            id="selectar"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Material</Form.Label>
                                        <Select
                                            value={this.state.selectedOption2}
                                            onChange={this.handleChange5}
                                            options={this.state.arrayNomeMaterial}
                                            id="selectar"
                                            required
                                        />
                                    </Form.Group>
                                </Form.Row>


                                <Button variant="primary" onClick={() => this.consultarMaterial()}>
                                    Consultar
                                </Button>

                                <Button variant="primary" disabled={this.state.habilitar} onClick={print}>Gerar Relatório</Button>

                                <br />
                                <br />

                                <div id="gerarPdf" >
                                    <BootstrapTable keyField='id' pagination={paginator()} data={this.state.arrayBuscaMaterial} columns={columns} /> <br />
                                </div>
                            </Form>
                    }

                </div>

            </body>

        );
    }
}

export default Relatorio;