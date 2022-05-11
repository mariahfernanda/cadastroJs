'use strict'

import{openModal, closeModal} from './modal.js'
import{lerClientes, criarCliente, deletarCliente, atualizarClientes} from './clients.js'


const criarLinha = ({nome, email, celular, cidade, id})=>{

    const linha = document.createElement('tr')
    linha.innerHTML = `
            <td>${nome}</td>
            <td>${email}</td>
            <td>${celular}</td>
            <td>${cidade}</td>
            <td>
                <button type="button" class="button green" onClick="editCliente(${id})" >editar</button>
                <button type="button" class="button red"   onClick="delCliente(${id})" >excluir</button>
            </td> 
        `

        return linha

}


const atualizarTabela = async () =>{
    const clientesContainer = document.getElementById('clientes-container')
    
    //Ler a API e retornar o resultado em uma variável
    const clientes = await lerClientes()

    //Preencher a tabela com as informações
    const linhas = clientes.map(criarLinha)
    clientesContainer.replaceChildren(...linhas)



} 


const ehEdicao = () => document.getElementById('nome').hasAttribute('data-id')

const salvarCliente = async () => {
    //criar um json com as informações do cliente

    const cliente = {
        "id"     : "",
        "nome"   : document.getElementById('nome').value,
        "email"  : document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade" : document.getElementById('cidade').value,
        "foto"   : document.getElementById('foto').value
      }

      if(form.reportValidty())
      {
          if(ehEdicao()){
              cliente.id = document.getElementById('nome').dataset.id
              await atualizarClientes(cliente)
          }else{
              //Enviar o json para o servidor API
                await criarCliente(cliente)

          }

        //Fechar a modal
        closeModal()
        
        //Atualizar tabela 
        atualizarTabela()
      }
}


const preencherForm = (cliente) => {
    document.getElementById('nome').value = cliente.nome
    document.getElementById('email').value = cliente.email
    document.getElementById('celular').value = cliente.celular
    document.getElementById('cidade').value = cliente.cidade
    document.getElementById('nome').dataset.id = cliente.id
    document.getElementById('file')

}

globalThis.editCliente = async(id) =>{
   
    //armazenar as informações do cliente selecionado em uma variável
    const cliente = await lerClientes(id)

    console.log(cliente)

    //Preencher formulário com informações
    preencherForm(cliente)

    //Abrir modal no estado de edição
    openModal()
}

globalThis.delCliente = async (id) => {
    await deletarCliente(id)
    atualizarTabela()

}
const maskCelular = ({target}) => {

  let text = target.value

  text = text.replace(/[^0-9]/,'')
  text = text.replace(/(.{2})(.{5})(.{4})/,'($1) $2-$3')
  text = text.replace(/(.{7})(.)/,'$1-$2')

  target.value = text
}


atualizarTabela()


document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', salvarCliente)
//document.getElementById('clientes-container').addEventListener('click', editarExcluir)
document.getElementById('celular').addEventListener('keyup', maskCelular)