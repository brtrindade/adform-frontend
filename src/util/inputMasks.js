function mphone(v){ //MASCARA PARA TELEFONE

  v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
  v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}

function mcpf(v){  //MASCARA PARA CPF

  v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                           //de novo (para o segundo bloco de números)
  v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

function mzip(v){
  v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito

  v=v.replace(/(\d{5})(\d{1,3})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

module.exports = {mphone, mcpf, mzip};
