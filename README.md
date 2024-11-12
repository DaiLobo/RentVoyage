<div align="center">
  <img src="https://github.com/user-attachments/assets/139ffe0b-180e-4867-aa35-ce5bddf583d7" alt="rentvoyage">

</div>

<h4 align="center"> 
	🚧 Em desenvolvimento: Acesse o projeto <a href="https://rent-voyage.vercel.app">RentVoyage</a> 🚧
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
 <a href="#-estrutura-e-relação-entre-coleções-no-firestore">Estrutura e Relação entre Coleções no Firestores</a> • 
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

### Cadastro de usuário
Cadastro e login de usuários usando Firebase Authentication com email/senha ou pelo Google. O perfil do usuário pode ser visualizado e editado.

### Gestão de Propriedades
Proprietários podem cadastrar novas propriedades, adicionar detalhes e fazer upload de fotos (armazenadas no Firebase Storage). Também podem visualizar uma lista de reservas feitas para cada propriedade.

### Reservas e Confirmação por Email
Usuários podem reservar propriedades, e uma confirmação da reserva é enviada por email com todos os detalhes. As reservas são armazenadas no Firestore Database.

### Chat em Tempo Real
Um chat em tempo real é configurado com Realtime Database para que hóspedes e proprietários possam se comunicar diretamente, utilizando os dados da reserva.

### Busca Avançada e Filtro
Com Algolia, é possível realizar uma busca por nome, capacidade, disponibilidade e faixa de preço, com respostas em tempo real.

### Visualização no Mapa
Usando Google Maps JavaScript API, os usuários podem visualizar a localização das propriedades no mapa, facilitando a escolha pela proximidade de pontos de interesse.

<hr/>

## 📊 Estrutura e Relação entre Coleções no Firestore

No sistema RentVoyage, utilizamos três coleções principais: users, properties, e reservations. Abaixo, descrevo a relação entre elas:

<div align="center">
  <img src="https://github.com/user-attachments/assets/62b9e13a-65a6-4cd5-8fad-ecfb0a309c17" alt="Diagrama">
</div>

### Estrutura e Relações
👩🏻‍💼💁🏻‍♀️ **Coleção users**

Descrição: Armazena dados dos usuários, que podem ser tanto hóspedes quanto proprietários.

Relação: Cada usuário pode possuir muitas propriedades. Um usuário pode fazer várias reservas como hóspede. Cada reserva será associada a ele, mas uma reserva específica só pode ter um único usuário como hóspede.

🏙️ **Coleção property**

Descrição: Contém as informações das propriedades que podem ser reservadas.

Relação: Cada propriedade pertence a um único usuário (proprietário), mas uma mesma propriedade pode ter várias reservas associadas a ela.
Uma propriedade é associada a múltiplas reservas (pois pode ser reservada por diferentes hóspedes em datas diferentes).

📅 **Coleção reservations**

Descrição: Armazena as reservas realizadas por usuários para propriedades específicas.

Relação: Cada reserva é associada a um único usuário (o hóspede que realizou a reserva).

Cada reserva é associada a uma única propriedade (a que foi reservada).

<br>
Essas relações permitem modelar o sistema de forma que um usuário possa gerenciar várias propriedades e fazer várias reservas, enquanto cada reserva conecta apenas um hóspede a uma propriedade específica.


## 📧 Fluxo de Disparo de E-mail no Firebase

O disparo de e-mails é gerenciado através da coleção mail e um serviço automatizado usando Firebase Cloud Functions. Quando uma nova reserva é feita, o processo de envio de e-mails segue o fluxo abaixo:

<div align="center">
  <img src="https://github.com/user-attachments/assets/122de60d-af50-44e7-90a2-0fd2e36690d4" alt="Coleção mail">
</div>

<br>
<p align="center">
 Usuário ➔ Reserva Criada ➔ Cloud Function ➔ Serviço de E-mail ➔ E-mail de Confirmação
</p>

### Processo de Criação e Disparo de E-mail
**Criação da Reserva:**

Quando um hóspede confirma uma reserva, um novo documento é adicionado à coleção reservations.

O serviço de criação de reserva também cria automaticamente um documento na coleção mail, contendo os detalhes necessários para o e-mail de confirmação.

### Configuração da Coleção mail:

**Descrição:** Esta coleção é dedicada ao gerenciamento dos e-mails de confirmação.

### Campos do documento mail:
to: Endereço de e-mail do destinatário.

subject: Assunto do e-mail.

message: Corpo em HTML do e-mail com informações da reserva, como data, valor, e detalhes da propriedade.

reservationId: Referência à reserva associada para contexto.

### Disparo Automático pelo Firebase Cloud Functions:

Uma função em segundo plano monitora a coleção mail.
Quando um novo documento é adicionado à coleção mail, essa função é acionada automaticamente.

A função coleta os dados do documento recém-criado e utiliza um serviço de e-mail (Firebase Extension de e-mail) para enviar o e-mail de confirmação ao usuário.

Esse processo automatiza o envio de e-mails de confirmação para os usuários, garantindo que cada reserva receba uma notificação sem necessidade de intervenção manual.




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
