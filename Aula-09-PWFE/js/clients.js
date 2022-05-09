'use strict'

// Url Base
 // const url = 'https://testeleonid.herokuapp.com/'
  const url = 'http://localhost/rodrigo/cliente/'


/**
 * Função que encaminha os dados do usuário para a API
 * @param {JSON} client - Objeto que contém todas as informações do cliente
 * @returns {Boolean}
 */
const createClient = async (client) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(`${url}clientes`, options)
    
    if(response.ok)
        alert('Cliente cadastrado com sucesso!')
}

/**
 * Função que retorna todos os usuários cadastrados
 * @param {String} id ID do Cliente para busca
 * @returns {JSON} Retorna um JSON com os dados de todos os usuários
 */
const readClients = async (id = '') => {
    const response = await fetch(`${url}clientes/${id}`)
    const data = await response.json()

    return data
}

// const readClient = async (idClient) => {
//     const response = await fetch(`${url}clientes/${idClient}`)
//     const data = response.json()

//     return data
// }

const updateClient = async (client) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(client),
        headers: {
            'content-type': 'application/json'
        }
    }
    const response = await fetch(`${url}clientes/${client.id}`, options)
    console.log('UPDATE: ', response.ok)
}

/**
 * Função que excluí um cliente
 * @param {Number} idClient - ID do cliente a ser excluído
 * @returns {Boolean}
 */
const deleteClient = async (idClient) => {
    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${url}clientes/${idClient}`, options)
    console.log(response.ok)
}

export { readClients, createClient, deleteClient, updateClient }