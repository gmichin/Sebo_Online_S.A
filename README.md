# Sebo_Online_S.A - Trabalho de Programação Dinâmica Web (PDWA5) 

## 1 Apresentação da dificuldade
Joana sempre foi apaixonada por livros. Desde pequena, seu lugar preferido era o SEBO da esquina, onde ela podia encontrar preciosidades literárias e histórias esquecidas pelo tempo. Com o avanço da tecnologia, muitos desses SEBOs fecharam as portas, e Joana viu sua paixão se tornar cada vez mais rara nas cidades. Porém, ao invés de lamentar, ela teve uma ideia: por que não trazer o conceito de SEBO para o mundo online? 

Assim nasceu o “Sebo Online S.A.”, uma plataforma digital onde qualquer pessoa poderia vender ou comprar livros usados, garantindo que as histórias continuassem sendo compartilhadas e relem-
bradas.

Joana acredita que a essência de um SEBO não está apenas nos livros, mas nas pessoas que os
leem e os vendem. Por isso, ela quer que o sistema permita a interação entre os usuários, e que cada
livro tenha sua própria “história”, contada por quem o está vendendo.
## 2 Objetivo
Desenvolver uma API robusta e eficiente para o Sebo Online S.A., que permita o cadastro de usuários (compradores e vendedores), livros e transações. A plataforma precisa ser intuitiva e fácil de usar, garantindo que os amantes de livros possam navegar, comprar e vender sem complicações.

A apresentação de seu texto (formatação, aparência, qualidade, etc), será avaliada, em paralelo ao conteúdo. Utilize figuras se julgar necessário.

Seu texto deve ser entregue em formato PDF, seu código enviado via Git, ou através de um link da aplicação hospedada, as variações da entrega de código serão aceitas desde que o docente possa realizar testes via Postman. EM HIPÓTESE ALGUMA, COPIE TEXTO DE QUALQUER FONTE. Mesmo mudando palavras de um texto copiado, é fácil reconhecê-lo.
## 3 Requisitos e Modelos de Negócio
Primeiramente, defina os principais atores e recursos do sistema. No contexto de um SEBO online, são cruciais:
- Usuários: usuários comuns, que podem ser tanto vendedores quanto compradores, além dos funcionários do SEBO e da administração do sistema.
- Produtos: itens colocados à venda pelos usuários.
- Transações: vendas realizadas entre vendedores e compradores. Após definir nossos objetos/atores/recursos, é necessário respeitar (no mínimo) as seguintes regras de negócio:
- Permitir o cadastro, edição e remoção de usuários.
- Permitir o cadastro, edição e remoção de livros.
- Registrar transações entre vendedores e compradores.
- Cada livro deve ter (no mínimo) informações como título, autor, categoria, preço e uma breve descrição ou história contada pelo vendedor.
- Os usuários devem poder buscar livros por diferentes critérios, ISBN, como título, autor ou categoria.
- A plataforma deve ter um sistema de autenticação e autorização para garantir a segurança dos dados dos usuários.
- Realizar as remoções de objetos/atores já envolvidos em transações, apenas por soft delete.
### 3.1 Endpoints e atributos sugeridos
Alguns endpoints básicos são necessários para os testes realizados na correção pelo docente: Além dos endpoints apresentados aqui, pode-se implementar outros, desde que respeitadas as padronizações ofertadas para APIs Restfull pela OpenAPI.
##### 3.1.1 Usuários
Campos sugeridos:
- ID, Nome, Email, Senha (criptografada), Status (ativo/inativo), Tipo (comprador/vendedor/administrador)
Endpoints:
- POST /users/signup - Registro do usuário.
- POST /users/login - Autenticação do usuário.
- PUT /users/{id} - Editar informações do usuário.
- DELETE /users/{id} - Desativar um usuário (soft delete).
##### 3.1.2 Administradores
Campos adicionais:
- Data de início
- Área de especialização
Endpoints:
- POST /admin/login - Login do administrador.
- GET /admin/reports - Visualizar relatórios e estatísticas.
- GET /admin/users - Visualizar usuários
##### 3.1.3 Itens (Livros, Revistas, Periódicos, Jornais)
Campos sugeridos:
- ID, Título, Autor, Categoria (livro, revista, etc.), Preço, Breve descrição ou história, Status (ativo/inativo ou em estoque/fora de estoque), Data de edição, Periodicidade, ID do vendedor
Endpoints:
- POST /items - Adicionar um novo item.
- GET /items - Listar todos os itens.
- GET /items/{id} - Obter detalhes de um item específico.
- PUT /items/{id} - Editar um item.
- DELETE /items/{id} - Desativar um item (soft delete).
- GET /items/search - Buscar itens por critérios.
##### 3.1.4 Transações
Campos sugeridos:
- ID da transação, ID do comprador, ID do vendedor, ID do item, Data da transação, Valor da transação
Endpoints:
- POST /transactions - Registrar uma nova transação.
- GET /transactions/{userId} - Visualizar transações de um usuário específico.
##### 3.1.5 Categorias
Campos sugeridos:
- ID da categoria, Nome da categoria, Descrição
Endpoints:
- GET /categories - Listar todas as categorias.
- POST /categories - Adicionar uma nova categoria.
- PUT /categories/{id} - Editar uma categoria existente.
- DELETE /categories/{id} - Excluir uma categoria.
##### 3.1.6 Regras de Negócio Adicionais
- Ao tentar desativar um usuário ou item, que esteve envolvido em uma transação, o sistema deve implementar uma desativação suave (soft delete).
- A busca e filtragem de itens devem ser otimizadas para garantir eficiência e relevância.
## 4 Documentação
Uma documentação clara é fundamental. Existem ferramentas e padrões que ajudam nesse processo:
- Swagger/OpenAPI: Uma das ferramentas mais populares para documentação de APIs. Com ela, você pode definir todos os endpoints, métodos permitidos, parâmetros, formatos de resposta, entre outros. Além disso, fornece uma interface web onde é possível testar as requisições.
- Descrição dos Endpoints: Para cada endpoint, descreva:
◦ Método HTTP (GET, POST, PUT, DELETE).
◦ Parâmetros (query, path e body).
◦ Respostas possíveis (incluindo códigos de status e corpo da resposta).
◦ Qualquer autenticação ou permissão necessária.
## 5 Sugestões Adicionais
- Autenticação: Dependendo da complexidade desejada, pode-se implementar autenticação via token (como JWT) para garantir que apenas usuários registrados possam adicionar ou comprar livros.
- Filtros e Paginação: No endpoint que lista os livros, pode ser útil implementar filtros (por exemplo, por categoria, autor ou preço) e paginação, para não sobrecarregar o cliente com muitos dados de uma vez.
- Imagens dos Livros: Permitir que os usuários façam upload de imagens dos livros pode enriquecer a experiência. Se decidir adicionar essa funcionalidade, lembre-se de lidar com o armazenamento e servir essas imagens de maneira eficiente.
- Consumo de API externa: Ao cadastrar novos livros, é possível consumir gratuitamente a API do Google Books, ou outras APIs de sua escolha, esta opção consta como um ponto extra.
## 6 Entregas
## 7 1a Entrega: Estrutura Básica e Gerenciamento de Usuários
### 7.1 Objetivo
Estabelecer a base do sistema, focando principalmente na gestão de usuários.
### 7.2 Requisitos
##### 7.2.1 Back-end Base
- Configuração inicial do servidor.
- Definição e Conexão com banco de dados.
- Implementação da estrutura básica de roteamento. 
##### 7.2.2 Usuários
- Cadastro de usuários (compradores e vendedores). 
- Autenticação (login/logout).
- Edição de perfil.
- Soft delete para desativar usuários. 
- Sistema de criptografia para senhas. 
##### 7.2.3 Administradores
- Login de administradores. 
- Visualização básica de relatórios e estatísticas (focar no retorno de um endpoint ao menos, sugestão, pelo endpoint de listagem de usuários, pode ser aprimorado nas próximas entregas).
## 8 2a Entrega: Gerenciamento de Itens e Categorias
### 8.1 Objetivo
Permitir que os usuários (especialmente vendedores) comecem a adicionar, editar e gerenciar itens na plataforma.
## 8.2 Requisitos
##### 8.2.1 Itens (Livros, Revistas, Periódicos, Jornais)
- Adição de novos itens.
- Listagem de itens. 
- Edição de itens.
- Busca básica de itens (pode ser otimizada na próxima entrega).
##### 8.2.2 Categorias
- Criação de categorias.
- Listagem de categorias. 
- Edição de categorias. 
- Soft delete para categorias.
- Registro de novas transações.
- Visualização de transações para um usuário específico.
## 9 3a Entrega: Aprimoramentos Finais
### 9.1 Objetivo
Implementar a funcionalidade de transações e otimizar a experiência do usuário com melhorias baseadas nos feedbacks das fases anteriores.
### 9.2 Requisitos
##### 9.2.1 Itens
- Listagem dos itens cadastrados, com filtros: titulo, isbn, autor;
##### 9.2.2 Otimização e Busca de Itens
- Otimização da busca de itens para eficiência e relevância.
- Implementação de filtros avançados. 
##### 9.2.3 Documentação
- Documentação da API. 
