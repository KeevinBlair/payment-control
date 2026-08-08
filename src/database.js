/** Banco em memória. Os dados são perdidos quando a aplicação reinicia. */
module.exports = {
  // Senha inicial: 123456 (armazenada exclusivamente como hash bcrypt).
  usuarios: [{
    id: '00000000-0000-4000-8000-000000000001',
    email: 'admin@admin.com',
    senha: '123123',
    nome: 'ADMIN',
    ativo: true
  },
  {
    id: '00000000-0000-4000-8000-000000000002',
    email: 'inativo@admin.com',
    senha: '123123',
    nome: 'Teste Inativo',
    ativo: false
  }],
  funcionarios: [],
  processamentos: [],
  historicosFuncionarios: []
};
