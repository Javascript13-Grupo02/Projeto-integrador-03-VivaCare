# VivaCare - Gerenciador de Seguros de Vida
------
<div align="center">
    <img src="https://ik.imagekit.io/vjqejp2vh/proj03/VivaCare%20Clara.png" title="source: ImageKit" width="40%"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
</div>



## 1. Descrição

O **VivaCare** é uma solução digital desenvolvida para descomplicar a gestão de seguros de vida. O foco do projeto é substituir a burocracia e as "letras miúdas" por uma experiência fluida e intuitiva, permitindo que, os usuários (corretores) gerenciem os planos de cobertura com eficiência.

------

## 2. Sobre esta API

A API foi construída seguindo os princípios da arquitetura de MVC com **NestJS**, focando em tipagem forte com TypeScript e manutenibilidade. Ele funciona como um gerenciador de lista de clientes e apólices.

### 2.1. Principais Funcionalidades

📂 **Gerenciamento de Clientes:** Cadastro, listagem, atualização e exclusão de clientes.
📈 **Gerenciamento de Apólices:** Cadastro com planos, preços, datas de início/fim e dependentes.
🔗 **Relacionamento entre  Usuário/Cliente e Apólice:** Garante que quando pesquisamos por um usuário (corretor) ou por um cliente sejam retornadas na pesquisa também as apólices associadas. 
🔍 **Busca Avançada:** Além das opções padrão (pesquisar por id, pesquisar por nome, listar todos) também são permitidas buscas mais específicas como busca por e-mail cadastrado e busca por planos de em uma faixa de preço específica. 
🔑 **Autenticação:** Implementação de login e proteção de rotas, garantindo que apenas usuários autenticados acessem os recursos da API. 

------

## 3. Diagrama de Classes

```mermaid
classDiagram
    class Usuario {
        +number id
        +string nome
        +string usuario
        +string senha
        +string foto
        +Apolice[] apolice
    }

    class Apolice {
        +number id
        +string plano
        +number preco
        +Date data_inicio
        +Date data_fim
        +number dependentes
        +Usuario usuario
        +Cliente cliente
    }

    class Cliente {
        +number id
        +string nome
        +string email
        +string telefone
        +Date data_nascimento
        +string foto
        +Apolice[] apolice
    }
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#2d2d2d', 'edgeColor': '#888888' }}}%%
    direction LR
    Usuario "1" --> "N" Apolice
    Cliente "1" --> "N" Apolice
```
------

## 4. Diagrama Entidade-Relacionamento (DER)
--------
```mermaid
erDiagram
	direction LR
	USUARIO {
		int id PK ""  
		varchar nome  ""  
		varchar usuario  ""  
		varchar senha  ""  
		varchar foto  ""  
	}

	APÓLICE {
		int id PK ""  
		varchar plano  ""  
		decimal preco  ""  
		date data_inicio  ""  
		date data_fim  ""  
		int dependentes  ""  
		int usuarioId FK ""  
		int clienteId FK ""  
	}

	CLIENTE {
		int id PK ""  
		varchar nome  ""  
		varchar email  ""  
		varchar telefone  ""  
		date data_nascimento  ""  
		varchar foto  ""  
	}
	
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#2d2d2d', 'edgeColor': '#888888' }}}%%
	USUARIO||--o{APÓLICE:"gerencia"
	CLIENTE||--o{APÓLICE:"contrata"
```
-----

## 5. Estrutura de Pastas

Inserir aqui a estrutura

------

## 6. Tecnologias utilizadas

| Item                            | Descrição  |
| ------------------------------- | ---------- |
| 🖥️ **Servidor**                  | Node JS    |
| ⌨️ **Linguagem de programação**  | TypeScript |
| 🧩 **Framework**                 | Nest JS    |
| 🌉 **ORM**                       | TypeORM    |
| 🛢️ **Banco de dados Relacional** | MySQL      |

------

## 7. Configuração e Execução Local

**1. 📥 Clone o repositório:**

```bash
git clone https://github.com/Javascript13-Grupo02/Projeto-integrador-03-VivaCare.git
```
**2. 📦 Instale as dependências:**
```cmd
npm install
```
**3. 🛢️ Configure o Banco de Dados:**

Configure as credenciais do seu MySQL local (usuário, senha e nome do banco) no arquivo `dev.service.ts` na pasta `data` e modifique o arquivo `app.module.ts` de maneira que a seção de `imports` fique assim:

```typescript
imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	    useClass: DevService,
      imports: [ConfigModule],
    }),
    UsuarioModule, ApoliceModule, AuthModule, ClienteModule
  ]
```

**4. 🚀 Execute a Aplicação**

```cmd
npm run start:dev
```
------

<p align="center">
  Desenvolvido por <b>AllCare</b>.
</p>

<p align="center">
  <img src="https://ik.imagekit.io/vjqejp2vh/proj03/Logo%20AllCare%20Cores%20Claras.png" alt="AllCare" width="300">
</p>
   