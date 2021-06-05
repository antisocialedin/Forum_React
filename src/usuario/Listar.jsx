import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { findAllUsers } from "../service/UsuarioService";

class ListarUsuario extends Component {
  constructor() {
    super();
    this.state = this.initState();
  }

  initState = () => ({
    usuarios: [],
    paginaInicio: 0,
    paginaFim: 0,
  });

  async componentDidMount() {
    const usuarios = await findAllUsers();
    this.setState({
      usuarios: usuarios.data,
      paginaInicio: usuarios.current_page,
      paginaFim: usuarios.total,
    });
  }

  render() {
    const { usuarios } = this.state;
    return (
        <div>
        <div className="container">
          <div className="app-title">
            <h1>
              <i className="fa fa-edit">Lista de usuários</i>
            </h1>
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <i className="fa fa-search fa-lg"></i>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Menu Principal</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="tile">
            <div className="tile-body">
              <div id="no-more-tables">
                <table className="table table-striped table-bordered table-hover cf ">
                  <thead className="cf">
                        <tr>
                          <td>Id</td>
                          <td>Nick</td>
                          <td>Email</td>
                          </tr>
                  </thead>
                  <tbody>
                    {usuarios.map( (usuario) => (
                    <tr key={usuario.id}>
                      <td>{ usuario.id }</td>
                      <td>{ usuario.nick }</td>
                      <td>
                        <Link className="btn btn-info btn-sm" to={'/usuario/alterar/${usuario.id}'}>
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