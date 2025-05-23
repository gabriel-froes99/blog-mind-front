# Blog Mind (Frontend)

Bem-vindo ao frontend do Blog Mind! Esta é uma aplicação web desenvolvida em React e TypeScript, projetada para ser a interface de usuário de uma plataforma de blog, permitindo que os usuários leiam, publiquem e gerenciem artigos.

## Funcionalidades Principais

*   **Autenticação de Usuário:**
    *   Cadastro de novos usuários.
    *   Login para usuários existentes.
    *   Logout.
    *   Interface para "Esqueci a senha" (funcionalidade de redefinição de senha no backend ainda pendente).
*   **Gerenciamento de Artigos:**
    *   Visualização de uma lista de todos os artigos publicados.
    *   Visualização de detalhes de um artigo específico.
    *   Listagem de artigos criados pelo usuário logado ("Meus Artigos").
    *   Edição de artigos existentes (para o autor do artigo).
    *   Interface para publicação de novos artigos (requer configuração de rota e componente específico para criação).
*   **Navegação:**
    *   Página inicial (Home) com destaques e artigos recentes.
    *   Página de listagem de todos os artigos.
    *   Links de navegação claros no cabeçalho.

## Tecnologias Utilizadas

*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **React Router DOM:** Para gerenciamento de rotas e navegação na aplicação.
*   **CSS:** Estilização customizada para os componentes (arquivos `.css` individuais).
*   **Fetch API:** Para comunicação com o backend.
*   **LocalStorage:** Para persistência básica de sessão do usuário (email, ID do usuário).
