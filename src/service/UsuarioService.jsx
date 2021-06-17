import http from '../util/banco';

export const findAllUsers = async (paginaAtual,pageSize,dir,props,search) => {
    return (
        http.get('/usuario/listar',{
            params:{
                paginaAtual,
                pageSize,
                dir,
                props,
                search
            }, 
         }).then( res => {
            return res.data;
         })
    )
}  

export const findUserById = async ( id ) => {
    return (
        http.get('/usuario/alterar/${id}')
            .then( res => { 
                return res.data; 
            }).catch( error => {
                return error.response;
            })
    )
}

export const createUser = async ( usuario ) => {
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

export const updateUser = async ( usuario ) => {
    return (
        http({
            method:'post',
            url:'/usuario/update/${usuario.id}',
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

