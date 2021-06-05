import http from '../util/banco';

export const findAllUsuarios = async () => {
    return (
        http.get('/usuario/listar')
            .then( res => {
            return res.data;
            })
    )
}  

export const findUsuarioById = async ( id ) => {
    return (
        http.get(`/usuario/alterar/${id}`)
            .then( res => { 
                return res.data; 
            }).catch( error => {
                return error.response;
            })
    )
}

export const createUsuario = async ( usuario ) => {
    return (
        http({
            method:'post',
            url:'/usuario/salvar',
            data:usuario,
            headers:{
                'Content-Type':'application/json'
            },
        }).then(res => {
            return res.data
        })

    )
}

export const updateUsuario = async ( usuario ) => {
    return (
        http({
            method:'post',
            url:`/usuario/update/${usuario.id}`,
            data:usuario,
            headers:{
                'Content-Type':'application/json'
            },
        }).then(res => {
            console.log(res.data);
            return res.data
        }).catch(error => {
            return error.response
        })

    )
}

