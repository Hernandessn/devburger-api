
## DevBurger - API 🍔⚙️

Este repositório contém a API que alimenta o site **DevBurger**. A API é responsável pelo gerenciamento dos dados dos produtos, processamento de pedidos e integração com a **Stripe API** para transações de pagamento, oferecendo endpoints robustos e seguros para a comunicação com a interface.

### 🚀 Funcionalidades da API

- **Gerenciamento de Produtos** 📦  
  Endpoints para listar, adicionar, atualizar e remover produtos, organizados por categoria.
  
- **Processamento de Pedidos** 📝  
  Recebe e gerencia os pedidos dos clientes de forma segura e eficiente.
  
- **Integração com Stripe** 💳  
  Criação de sessões de pagamento e processamento seguro de transações.
  
- **Autenticação e Segurança** 🔒  
  Implementação de mecanismos para proteger os endpoints e controlar o acesso.

### 🛠️ Tecnologias Utilizadas

- **Node.js** e **Express** – Para a criação dos endpoints e gerenciamento do servidor.
- **MongoDB** (ou outra base de dados) 🗄️ – Para armazenamento dos dados.
- **Stripe API** – Para integração com o sistema de pagamentos.
- **JWT** (ou outra solução de autenticação) – Para segurança e controle de acesso.

### 🔧 Como Executar

1. **Clone o Repositório**  
   ```bash
   git clone https://github.com/Hernandessn/devburger-api.git
   ```
2. **Instale as Dependências**  
   ```bash
   cd devburger-api
   npm install
   ```
3. **Configure as Variáveis de Ambiente**  
   Crie um arquivo `.env` com as configurações necessárias (porta, URI do banco de dados, chaves da Stripe, etc.).
4. **Inicie o Servidor**  
   ```bash
   npm run dev
   ```

## Front-End

Confira o projeto front-end <a href="https://github.com/Hernandessn/devburger-interface.git">devburger-interface</a>
