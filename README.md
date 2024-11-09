<div align="center">
  <img src="https://github.com/user-attachments/assets/139ffe0b-180e-4867-aa35-ce5bddf583d7" alt="Organo">

</div>

<h4 align="center"> 
	🚧 Em desenvolvimento: Acesse o projeto <a href="https://github.com">RentVoyage</a> 🚧
</h4>

## 📝 Sobre

RentVoyage é uma plataforma de reserva de hospedagem desenvolvida em **Next.js** que permite aos usuários encontrar e reservar acomodações de forma rápida e eficiente. Com **Firebase** para gerenciamento de autenticação, banco de dados, armazenamento de imagens e chat em tempo real, e **Algolia** para busca avançada, a aplicação oferece uma experiência completa tanto para hóspedes quanto para proprietários. A interface, estilizada com Tailwind CSS e componentes de Shadcn, suporta tradução em inglês e português com i18n, facilitando o acesso global.

Principais funcionalidades:

- 🔎 **Busca avançada**: Propriedades podem ser pesquisadas por nome, capacidade, datas disponíveis e preço.
- 🔑 **Autenticação**: Cadastro e login com email/senha ou pelo Google.
- 🏘️ **Gestão de Propriedades**: Proprietários podem cadastrar, editar e gerenciar propriedades, incluindo imagens no Firebase Storage.
- 🗪 **Reservas e Chat**: Reservas são registradas no Firestore, com um sistema de chat em tempo real entre hóspedes e proprietários.
- 🗺️ **Visualização no Mapa**: As propriedades são exibidas no mapa usando Google Maps JavaScript API.
- 📧 **Confirmação de Reservas por Email**: Um email é enviado ao usuário confirmando detalhes da reserva.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/42e50b01-de51-4bbf-896e-f2272126745b" alt="Telas">
  <br><br>
  <img src="https://github.com/user-attachments/assets/31c5fe6a-55d0-403d-9b94-273c32deeea8" height="600" width="auto" alt="Telas">
</div>

## :bookmark: Índice

<br>
<p align="center">
 <a href="#-pré-requisitos">Pré-requisitos</a> •
 <a href="#%EF%B8%8F-instalação">Instalação</a> • 
 <a href="#-executando-o-projeto">Executando o Projeto</a> • 
 <a href="#-funcionalidades-do-projeto">Funcionalidades</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#%EF%B8%8F-autora">Autora</a>
</p>
<br>

## 🧾 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 🏗️ Instalação

```bash
# Clone este repositório
$ git clone https://github.com/seu-usuario/RentVoyage.git

# Acesse a pasta do projeto no terminal/cmd
$ cd rentvoyage

# Instale as dependências
$ yarn
```

## 🏢 Executando o Projeto

```bash
# Inicie o projeto em modo de desenvolvimento:
$ yarn dev
```
A aplicação estará disponível em http://localhost:3000.

<hr/>

## 🔨 Funcionalidades do projeto

Ao iniciar a aplicação, você será apresentado a dois formulários distintos: um para o cadastro de colaboradores e outro para o cadastro de times.

Para adicionar um colaborador, preencha o formulário com todas as informações necessárias. Note que todos os campos são obrigatórios, exceto o campo de imagem. Caso você não insira uma imagem, o colaborador será cadastrado com uma imagem padrão. Depois de preencher os detalhes, clique no botão "Cadastrar" para concluir o processo.

Para adicionar um novo time, preencha o formulário com as informações específicas do time desejado e clique em "Cadastrar". Após essa ação, o novo time será exibido na lista de times, que pode ser visto no formulário de colaboradores.

Abaixo dos formulários, você encontrará uma seção onde os colaboradores são agrupados por time. Neste espaço, você terá a opção de realizar diversas ações, como alterar a cor de um time, favoritar colaboradores e excluir colaboradores. Importante destacar que, se todos os colaboradores de um time forem excluídos, o time deixará de ser exibido na lista de times.


### Cadastro de usuário
Cadastro e login de usuários usando Firebase Authentication com email/senha ou pelo Google. O perfil do usuário pode ser visualizado e editado.
<div align="center">
  <img src="https://github.com/DaiLobo/Organo/assets/47689708/9ba4217a-a76c-40a4-a432-ba27e86d28a3" alt="Cadastro Colaborador">
</div>

### Gestão de Propriedades
Proprietários podem cadastrar novas propriedades, adicionar detalhes e fazer upload de fotos (armazenadas no Firebase Storage). Também podem visualizar uma lista de reservas feitas para cada propriedade.
<div align="center">
  <img src="https://github.com/DaiLobo/Organo/assets/47689708/ae199f55-1f4e-430a-8f78-a03e784d777e" alt="Cadastro Time">
</div>

### Reservas e Confirmação por Email
Usuários podem reservar propriedades, e uma confirmação da reserva é enviada por email com todos os detalhes. As reservas são armazenadas no Firestore Database.

### Chat em Tempo Real
Um chat em tempo real é configurado com Realtime Database para que hóspedes e proprietários possam se comunicar diretamente, utilizando os dados da reserva.

### Busca Avançada e Filtro
Com Algolia, é possível realizar uma busca por nome, capacidade, disponibilidade e faixa de preço, com respostas em tempo real.

### Visualização no Mapa
Usando Google Maps JavaScript API, os usuários podem visualizar a localização das propriedades no mapa, facilitando a escolha pela proximidade de pontos de interesse.

<hr/>

## 🛠 Tecnologias
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" height="40" width="52" alt="react logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="40" width="52" alt="ts logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" height="40" width="52" alt="firebase logo"   />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="40" width="52" alt="tailwind logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/algolia/algolia-original.svg" height="40" width="52" alt="algolia logo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" height="40" width="52" alt="googlecloud logo" />
  <img src="https://seeklogo.com/images/S/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png?v=638421451470000000" height="40" width="52" alt="shadcn logo" />
  <img src="https://avatars.githubusercontent.com/u/8546082?v=4&s=160" height="40" width="52" alt="i18n logo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" height="40" width="52" alt="figma logo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="38" width="50" alt="github logo" />
</div>
<hr/>

## ✒️ Autora
Desenvolvido com 💜 por Diana Rose
