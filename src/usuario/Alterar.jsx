import React from "react";
import { Link } from "react-router-dom";
import { findUserById, updateUser } from "../service/UsuarioService";

class AlterarUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    }

    initState = () => ({
        id: undefined,
        nick: "",
        email: "",
    });

    componentDidMount() {
    const { id } = this.props.match.params;
    this.loadData(id);
    }

    async loadData(id) {
        const resposta_servidor = await findUserById(id);
        this.setState({
        id: resposta_servidor.usuario.id,
        nick: resposta_servidor.usuario.nick,
        email: resposta_servidor.usuario.email,
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
        [name]: value,
        });
    };

    async handleSubimitUsuario(e) {
        e.preventDefault();

        const {
        id,
        nick,
        email,
        } = this.state;

        console.log(id);

        let usuario = {
            id: id,
            nick: nick,
            email: email,
        };

        const resposta_servidor = await updateUser(usuario);

        this.setState(
            {
            state: this.initState(),
            },
            this.listarUsuario()
        );
    }

    listarUsuario = () => {
        this.props.history.push("/usuario/listar");
    };

    render() {
        const {
            id,
            nick,
            email,
        } = this.state;

        return (
            <div className="container pt-5">
                <div className="tile">
                    <div className="tile-body">
                        <form onSubmit={(e) => this.handleSubimitAutor(e)}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nick" className="control-label">
                                            Nick:
                                        </label>
                                        <input
                                            type="text"
                                            name="nick"
                                            value={nick}
                                            onChange={(e) => this.onChange(e)}
                                            id="nick"
                                            className="form-control "
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="email" className="control-label">
                                            E-mail:
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={(e) => this.onChange(e)}
                                            id="email"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg" 
                                    title="Incluir novo Registro"
                                >
                                    Salvar Dados do Usuario
                                </button>
                                <Link 
                                    to="/usuario/listar"  
                                    className="btn btn-secondary btn-lg ml-3" 
                                    title="Cancelar a Inclusão"
                                >
                                    Cancelar Inclusão do Usuario
                                </Link>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlterarUsuario;