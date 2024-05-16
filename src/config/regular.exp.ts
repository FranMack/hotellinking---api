export const regularExps = {
    // email
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    // solo letras y espacios
    only_letters: /^[A-Za-z\s]+$/,
    // caracter especial
    contain_special_character: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //numero
    contain_number: /\d/,
    //letra miniscula
    contain_letter: /[a-z]/,
    //letra mayuscula
    contain_Capital_leter: /[A-Z]/,
  };
  