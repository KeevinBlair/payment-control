const request = require('supertest')
const { expect } = require('chai')

describe('Mutation - Criar Usuário', () => {
    it('deve permitir criar usuário quando preencho os campos obrigatórios de forma válida', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation CriarUsuario($input: CriarUsuarioInput!) {
                            criarUsuario(input: $input) {
                                id
                                email
                                nome
                                ativo
                            }
                        }`,
                variables: {
                    "input": {
                        "email": "teste5@teste.com.br",
                        "senha": "123abc",
                        "nome": "Kevin",
                        "ativo": true
                    }
                }
            })

        expect(resposta.status).to.equal(200);
        expect(resposta.body.data.criarUsuario.email).to.be.a.string;
        expect(resposta.body.data.criarUsuario).to.have.property('id');
        expect(resposta.body.data.criarUsuario).to.have.property('email', 'teste5@teste.com.br');
        expect(resposta.body.data.criarUsuario).to.have.property('nome', 'Kevin');
        expect(resposta.body.data.criarUsuario).to.have.property('ativo', true);

    })

    it('não deve permitir passar string no campo ativo que espera booleano', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation CriarUsuario($input: CriarUsuarioInput!) {
                            criarUsuario(input: $input) {
                                id
                                email
                                nome
                                ativo
                            }
                        }`,
                variables: {
                    "input": {
                        "email": "teste@teste.com.br",
                        "senha": "123abc",
                        "nome": "Kevin",
                        "ativo": "true"
                    }
                }
            })

        expect(resposta.status).to.equal(400);
        expect(resposta.body.errors[0]).to.have.property('message', 'Variable \"$input\" got invalid value \"true\" at \"input.ativo\"; Boolean cannot represent a non boolean value: \"true\"');
    })

    it('não deve permitir criar usuário sem a propriedade email', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation CriarUsuario($input: CriarUsuarioInput!) {
                            criarUsuario(input: $input) {
                                id
                                email
                                nome
                                ativo
                            }
                        }`,
                variables: {
                    "input": {
                        "senha": "123abc",
                        "nome": "Kevin",
                        "ativo": true
                    }
                }
            })

        expect(resposta.status).to.equal(400);
        expect(resposta.body.errors[0]).to.have.property('message', 'Variable \"$input\" got invalid value { senha: \"123abc\", nome: \"Kevin\", ativo: true }; Field \"email\" of required type \"String!\" was not provided.');
    })
})