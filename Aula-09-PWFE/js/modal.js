'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    
    // Limpando os dados
    document.getElementById('modal-form').reset() // Limpa todos os campos de um formulário
    document.getElementById('txtNome').removeAttribute('data-client-id')
}

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('cancelar').addEventListener('click', closeModal)

// Export 
export { openModal, closeModal }