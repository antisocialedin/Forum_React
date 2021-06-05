export const validarUsuario = (state) => {

    let {
        nick,
        email,
        toReturn,
        formValidation,
      } = state;


      if ( nick.trim().length > 10 ) {
          formValidation.nick.push("O nick do usuario não pode ter mais do que 10 caracteres!");
          formValidation.validNick = true;
          toReturn = true;
      }

      if ( nick.trim().length === 0 ) {
        formValidation.nick.push("O nick do usuario tem que ser informado!");
        formValidation.validNick = true;
        toReturn = true;
      }

      if ( nick.trim().length < 4 ) {
        formValidation.nick.push("O nick do usuario não pode ter menos do que 4 caracteres!");
        formValidation.validNick = true;
        toReturn = true;
      }

      state = { toReturn, formValidation }

      return state;   

} 