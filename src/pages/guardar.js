 <Navbar bg="light" expand="lg" id="navbarEstoque">
                        <Navbar.Brand href="#home">Estoque</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Button variant="outline-primary" onClick={() => this.deletarTabela()}>Deletar</Button>
                                {/* <Button variant="outline-primary" onClick={() => this.editarTabela()}>Editar</Button> */}
                                <Button variant="outline-primary" onClick={() => this.setState({ modalShow: true })}>Adicionar Novo Item</Button>

                                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            <Form inline>
                                <FormControl type="text" onChange={this.pesquisar} placeholder="Pesquisar..." className="mr-sm-2" />
                                <Button variant="outline-success" onClick={() => this.filtrar()}>Pesquisar</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>

                    <div className="adicionarItem">
                        <div id="cadastrarItem">

                            {this.state.deletar ?
                                <Table striped bordered hover id="tabela">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Descrição</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.estoque.map(function (autor) {
                                            return (
                                                <tr>
                                                    <td contentEditable={true}>{autor.id_estoque}</td>
                                                    <td contenteditable={'true'}>{autor.nome}</td>
                                                    <td contenteditable={'true'}>{autor.quantidade}</td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </Table>
                                :
                                <Table striped bordered hover id="tabela">
                                    <thead>
                                        <tr>
                                            <th id="btnDelete"></th>
                                            <th>SIAPE</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.estoque.map(function (autor, id) {
                                            return (
                                                <tr key={id}>
                                                    <td contentEditable={true}><Button variant="danger" onClick={(event) => this.pegarId(event,id)}>X</Button>{autor.id_estoque}</td>
                                                    <td contenteditable={'true'}>{autor.nome}</td>
                                                    <td contenteditable={'true'}>{autor.quantidade}</td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </Table>

                            }

                            {/* <table id="tabela">
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
                            </table> */}

                        </div>
                    </div>
