# meep-frontend-challenge
Frontend challenge for Meep
-----------------------------------------------------------
Clone o repositório

Instale as dependências do projeto com npm ou yarn

Visualize o projeto com o script de desenvolvimento

-----------------------------------------------------------

Optei por utilizar o React com o Vite, apesar de a nova doc do React indicar que os projetos já sejam utilizados com algum framework.

Como é um projeto muito simples, não fazia sentido utilizar o Next nem o Gatsby (se fosse o caso de um ecommerce real, o indicado seria usar o Next, pois lida melhor do que o Gatsby com páginas que devem ser constantemente atualizadas como é o caso de um ecommerce).

Peguei alguns layouts pré prontos no codepend de páginas feitas com o Tailwind e fiz alguns ajustes que achei necessários.

Rotas criadas: catálogo, produto e carrinho. Para navegar até a página de produto, basta clicar em "VER DETALHES". Para adicionar ao carrinho, é possível adicionar pelo botão direto no catálogo (irá adicionar apenas uma unidade) ou entrar na página do produto e escolher a quantidade de unidades a ser somada no carrinho.

Para navegar até o carrinho, basta clicar no ícone do header. No carrinho é possível adicionar/remover unidades de cada produto e remover o produto como um todo.

Ao finalizar a compra aparecerá um toast de sucesso, o carrinho será resetado e o usuário redirecionado para o catálogo. Todas as informações do carrinho estão persistidas no localstorage. Em um cenário real, utilizaria cookies para tal.

Se tivesse tido mais tempo para desenvolver, eu teria organizado melhor a componentização do projeto, e talvez isolado mais funções em "utils".

Usei o hashRouter pensando na possibilidade de futuramente fazer um deploy da aplicação para um serviço como o Netlify, que só libera uma única rota.

Trabalhei utilizando divisão de tasks em branches de acordo com os padrões de nomenclaturas e procurei fazer commits atômicos o máximo que o tempo me permitiu.

Utilizei uma API que fornece dados de produtos mas não criei um serviço que retornava um produto específico, com isso usei find na lista de produtos para buscar suas informações ao invés de fazer requisições individuais para cada produto, o que não é prática da "vida real". Como essa lista só entregava uma imagem por produto, fiz um objeto com imagens aleatórias para simular o usuário visualizando mais imagens. 

Estou à disposição para maiores esclarecimentos sobre o desenvolvimento do projeto.
