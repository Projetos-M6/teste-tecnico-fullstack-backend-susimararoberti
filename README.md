<h1 align="center"> My Contact Book </h1>

## 💻 Projeto

Essa API visa a criação de uma agenda online, na qual um usuário poderá realizar seu cadastro e posterior login, acessando seus dados de perfil e tendo a possibilidade de editá-los bem como realizar a autoexclusão de seu perfil da aplicação.
O usuário poderá cadastrar contatos, editá-los e/ou excluí-los.

## 🔨 Tecnologias utilizadas

- NodeJs
- TypeORM
- PostgreSQL

## ✨ Instalação

### 1 - Clone o repositório na sua máquina

### 2 - Inicialize o projeto

- Inicie pelo comando `yarn`

### 3 - Crie suas variáveis de ambiente

- Verifique o arquivo .env.exemple para inserir as variáveis de ambiente corretas;
- Note que aplicação está rodando em localhost!
- Configure a DATABASE_URL seguindo o seguinte modelo:
  > "postgres://user:password@localhost:5432/db" <br>
  - Substitua user pelo seu usuário postgresql;
  - Substitua password pela sua senha postgresql;
  - Substitua db pelo nome do seu banco de dados local.

### 4 - Rode as migrações

- Após certificar-se que seu banco já está conectado, você pode rodar as migrações utilizando o comando `yarn typeorm migration:run -d src/data-source.ts`

### 5 - Transpilar os arquivos

- Como essa aplicação é feita em TypeScript você precisará rodar após as migrações o comando `yarn tsc`

### 6 - Rodar a aplicação

- Utilize o comando `yarn dev` para rodar sua aplicação.
- Após isso, então rode o frontend da aplicação -> leia seu README!
