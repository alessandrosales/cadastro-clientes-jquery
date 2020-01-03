let clientes = [];

function carregaRegistros() {
  $('#tabela-clientes').find('tbody').html('');

  pegarClientes().then(function() {
    clientes.forEach(function(cliente) {
      let tr = $('<tr>');

      tr.append($('<td>').html(cliente.id));
      tr.append($('<td>').html(cliente.nome));
      tr.append($('<td>').html(cliente.email));
      
      let buttonEditar = $('<button>').html('Editar').addClass('btn-arredondado btn-edicao');
      let buttonExcluir = $('<button>').html('Excluir').addClass('btn-arredondado btn-excluir');

      tr.append(buttonEditar);
      tr.append(buttonExcluir);

      tr.attr('data-id', cliente.id);

      buttonEditar.click(function() {
        const id = $(this).parent().attr('data-id');

        $('input[name=id]').val(cliente.id);
        $('input[name=nome]').val(cliente.nome);
        $('input[name=email]').val(cliente.email);
      });

      buttonExcluir.click(function() {
        const id = $(this).parent().attr('data-id');
        excluirCliente({ id: id }).then(function() {
          carregaRegistros();
        })
      });

      $('#tabela-clientes').find('tbody').append(tr)
    })
  })
}

function pegarClientes() {
  try {
    return axios.get('http://localhost:3000/clientes').then(function(resposta) {
      clientes = resposta.data
    }).catch(function(err) {
      alert('opa')
    });
  } catch (e) {
    console.log(e)
  }
}

function salvarCliente(dadosDoCliente) {
  return axios.post('http://localhost:3000/clientes', dadosDoCliente).then(function(resposta) {
    console.log(resposta.data)
  });
}

function atualizarCliente(dadosDoCliente) {
  return axios.patch('http://localhost:3000/clientes/' + dadosDoCliente.id, dadosDoCliente).then(function(resposta) {
    console.log(resposta.data)
  });
}

function excluirCliente(dadosDoCliente) {
  return axios.delete('http://localhost:3000/clientes/' + dadosDoCliente.id).then(function(resposta) {
    console.log(resposta.data)
  });
}

function limparFormulario() {
  $('input[name=id]').val('');
  $('input[name=nome]').val('');
  $('input[name=email]').val('');
}

$(document).ready(function() {
  carregaRegistros();

  $('#btn-adicionar').click(function() {
    const id = $('input[name=id]').val();
    const nome = $('input[name=nome]').val();
    const email = $('input[name=email]').val();

    if(id == '') {
      salvarCliente({
        nome: nome,
        email: email
      }).then(function() {
        limparFormulario()
        carregaRegistros()
      })
    } else {
      atualizarCliente({
        id: id,
        nome: nome,
        email: email
      }).then(function() {
        limparFormulario()
        carregaRegistros()
      })
    }
  })
})