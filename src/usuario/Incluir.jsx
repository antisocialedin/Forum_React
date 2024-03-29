import React from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import Nav from "../components/Nav";
import { createUser } from "../service/UsuarioService";
import { validarUsuario } from "../validacao/ValidUsuario";

class IncluirUsuario extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.initState();
    }

    initState = () => ({
        id: undefined,
        nick: '',
        email: '',

        toReturn: false,

        formValidation: {
            nick: [],
            email: [],

            validNick: false,
            validEmail: false,
        }
    });

    onChange = (e) => {
        const { nick, value } = e.target;
        this.setState({
            [nick]: value
        })
    }

    validarDigitacaoUsuario() {
        let state = validarUsuario(this.state);
        this.setState({
            toReturn: state.toReturn,
            formValidation: state.formValidation,
        })
        return state.toReturn;
    }

    async handleSubimitUsuario(e) {
        e.preventDefault();

        if (this.validarDigitacaoUsuario() === false) {
            
            const {
                nick,
                email,
            } = this.state;

            let usuario = {
                nick: nick,
                email: email,
            }

            const resposta_servidor = await createUser(usuario);

            this.setState({
                state: this.initState()
            }, this.listarUsuario())
        }
    }

    listarUsuario = () => {
        this.props.history.push('/usuario/listar');
    }


    render() {
        const {
            nick,
            email,
            formValidation,
        } = this.state;

        return (
            <div className="container">
            <Nav/>
            <Cabecalho path="/usuario/listar" tituloPagina="Cadastro de Usuario" tituloPesquisa="Lista de Usuario"/>
                <div className="tile">
                    <div className="tile-body">
                        <form onSubmit={(e) => this.handleSubimitUser(e)}>
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
                                            className={formValidation.validNick === true ? "form-control is-invalid" : "form-control"}
                                        />
                                        {
                                            formValidation.validNick && (
                                                <div className="invalid-feedback">
                                                    {
                                                        formValidation.nick.map((erro, index) => {
                                                            return (
                                                                <p key={index} style={{ margin: "0" }}>
                                                                    <span>{erro}</span>
                                                                </p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="email" className="control-label">
                                            Email:
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
                                <button type="submit" className="btn btn-primary btn-lg" title="Incluir novo Registro">
                                    Salvar Dados do Usuario
                                </button>
                                <Link to="/usuario/listar" className="btn btn-secondary btn-lg ml-3" title="Cancelar a Inclusão">
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
export default IncluirUsuario;