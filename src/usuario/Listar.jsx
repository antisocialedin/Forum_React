import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import Nav from "../components/Nav";
import Paginacao from "../components/Paginacao";

import { findAllUsers } from "../service/UsuarioService";

class ListarUsuario extends Component {
  constructor() {
    super();
    this.state = this.initState();
    this.setNumberPaginaAtual = this.setNumberPaginaAtual.bind(this);
  }

  initState = () => ({
    usuarios: [],
    paginaAtual:1,
    pageSize:5,
    dir:'asc',
    props:'id',
    total:0,
    paginaFim:0,
    search:'',
  });

  componentDidMount() {
    this.loadData();
  }

  async loadData(){
    const { paginaAtual, pageSize, dir, asc, search} = this.state;
    const usuarios = await findAllUsers(paginaAtual,pageSize,dir,asc,search);
    this.setState({
      usuarios: usuarios.data,
      paginaAtual:usuarios.paginaAtual,
      pageSize:usuarios.pageSize,
      paginaFim:usuarios.paginaFim,
      total:usuarios.total,
    });
  }

  render() {
    const { usuarios, paginaAtual, pageSize, paginaFim, total } = this.state;

    return (
      <div>
        <Nav/>
        <div className="container">
        <Cabecalho path="/" tituloPagina="Listagem de Autores" tituloPesquisa="Menu Principal"/> 
        </div>
        <div className="container">
          <div className="tile">
            <div className="tile-body">
              <div id="no-more-tables">
                <table className="table table-striped table-bordered table-hover cf ">
                  <thead className="cf">
                    <tr>
                      <th>Id</th>
                      <th>Nick</th>
                      <th>Email</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nick}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <Link className="btn btn-info btn-sm" to={`/usuario/alterar/${usuario.id}`}>
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fa fa-trash"></i>
                          </a>
                          <a className="btn btn-warning btn-sm" href="#">
                            <i className="fa fa-address-book"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paginacao paginaAtual={paginaAtual}
                           pageSize={pageSize}
                           paginaFim={paginaFim}
                           total={total}
                           setRenderPaginaCorrente={(pagina) => this.setNumberPaginaAtual(pagina)}/>
                <Link className="btn btn-success btn-lg" to="/usuario/inserir" title="Incluir novo Registro">
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ListarUsuario;
