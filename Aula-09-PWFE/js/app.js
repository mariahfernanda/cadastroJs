"use strict";

// Import
import { openModal, closeModal } from "./modal.js";
import {
  readClients,
  createClient,
  deleteClient,
  // readClient,
  updateClient
} from "./clients.js";

// Tabela
/**
 * Parâmetros
 * @param {JSON} client - Objeto JSON que contenha:
 *                          id, nome, email, cidade e celular
 * @returns {HTMLTableRowElement} - Linha de uma tabela que é constituída com
 *                                  Table Columns inseridas nela
 */
const createRow = ({id, nome, email, celular, cidade}) => {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onClick="editClient(${id})" ">editar</button>
            <button type="button" class="button red" onClick="delClient(${id})">excluir</button>
        </td>
    `;

  return row;
};

const updateTable = async () => {
  const clientsInfo = document.getElementById("clientsInfo");

  // 1º - Ler a API e armazenar o resultado em uma variável
  const clients = await readClients();

  // 2º - Preencher a tabela com as informações obtidas da API
  const rows = clients.map(createRow);
  clientsInfo.replaceChildren(...rows);
};

/**
 * Função para carregar os dados do cliente a editar na modal
 * @param {String} idClient ID do cliente para busca
 * @return {VoidFunction} Sem retorno
 */
const updateModal = async (idClient) => {
  const client  = await readClient(idClient)

  // Inserindo dados
  document.getElementById("txtCelular").value = client.celular;
  document.getElementById("txtCidade").value = client.cidade;
  document.getElementById("txtEmail").value = client.email;
  document.getElementById("txtNome").value = client.nome;
};

// CRUD
const isEdit = () => document.getElementById('txtNome').hasAttribute('data-client-id')

const saveClient = async () => {
  // 1º Criar um JSON com as informações do cliente
  const client = {
    celular: document.getElementById("txtCelular").value,
    cidade: document.getElementById("txtCidade").value,
    email: document.getElementById("txtEmail").value,
    id: "",
    nome: document.getElementById("txtNome").value,
  };
  
  // 2º Enviar o JSON para a Servidor API
  if(isEdit()) {
    client.id = document.getElementById('txtNome').dataset.id
    await updateClient(client)
  }
  else 
    createClient(client);
  

  // 3º Fechar modal
  closeModal();

  // 4º Atualizar tabela
  updateTable();
};

const fillForm = (client) => {
  console.log(client)
  document.getElementById('txtNome').value = client.nome
  document.getElementById('txtEmail').value = client.email
  document.getElementById('txtCidade').value = client.cidade
  document.getElementById('txtCelular').value = client.celular
    
  document.getElementById('txtNome').dataset.id = client.id
}

globalThis.editClient = async (id) => {
  // Armazenar os dados do cliente selecionado
  const client = await readClients(id)

  // Preecher formulário com as informações
  fillForm(client)


  // Abrir a modal
  openModal()
}

globalThis.delClient = async (id) => {
  await deleteClient(id)
  updateTable()
}


// const actionClient = (event) => {
//   if (event.target.type == "button") {
//     const [action, idClient] = event.target.id.split("-");

//     switch (action) {

//       case "editar":
//         // Função para atualizar cliente
//         openModal();

//         // Inserindo atributo dataset para diferenciar as operações
//         document.getElementById('modal').setAttribute('data-id-client', idClient);

//         // Chamando função que realiza a atualização dos dados do cliente
//         updateModal(idClient)


//         break;
//       case "excluir":
//         // Função para excluir o Cliente
//         if (window.confirm("Você realmente deseja exluir este contato?")) {
//           if (deleteClient(idClient)) {
//             alert("Cliente exluido com sucesso.");
//             updateTable();
//           }
//         }
//         break;

//       default:
//         break;
//     }
//   }
// };

// Executando Funções
updateTable();

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);
document.getElementById("salvar").addEventListener("click", () => {
  const edit = document.getElementById("modal").dataset.idClient
  if(!edit !== undefined)
    saveClient()
  else
    updateClient()


});
// document.getElementById("clientsInfo").addEventListener("click", actionClient);
