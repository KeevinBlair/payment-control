const request = require('supertest')
const { expect } = require('chai')

describe('Mutation - Login', () => {
    it('deve realizar login com sucesso quando informo credenciais válidas', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation Login($senha: String!, $email: String!) {
                    login(senha: $senha, email: $email) {
                        token
                    }
                }`,
                variables: {
                    "email": "teste@teste.com.br",
                    "senha": "123abc"
                }
            })

        expect(resposta.status).to.equal(200);
        expect(resposta.body.data.login).to.have.property('token');
        expect(resposta.body.data.login.token).to.not.be.empty;
        expect(resposta.body.data.login.token).to.be.a.string;
        expect(resposta.body.data.login.token).include('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')

    })

    it('não deve realizar login quando informo credenciais inválidas', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation Login($senha: String!, $email: String!) {
                    login(senha: $senha, email: $email) {
                        token
                    }
                }`,
                variables: {
                    "email": "teste@teste.com.br",
                    "senha": "123abcErrado"
                }
            })

        expect(resposta.status).to.equal(200);
        expect(resposta.body.errors[0]).to.have.property('message', 'Credenciais inválidas ou usuário inativo.');
    })


    it('não deve realizar login quando informo umu usuário inativo', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation Login($senha: String!, $email: String!) {
                    login(senha: $senha, email: $email) {
                        token
                    }
                }`,
                variables: {
                    "email": "inativo@admin.com",
                    "senha": "$2a$10$xtqV3Pqp1ZK.lrKv3i5Piee/mk4ajBGh0MPV/NR7m9GILQErHw5gW"
                }
            })

        expect(resposta.status).to.equal(200);
        expect(resposta.body.errors[0]).to.have.property('message', 'Credenciais inválidas ou usuário inativo.');
    })
})    