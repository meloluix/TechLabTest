# Guia do questionário WIT e TechLab Maker

## Usar o site já publicado

Site dos alunos: https://explorar-cursos-wit-techlab.themelomaker.chatgpt.site/

Área do professor: https://explorar-cursos-wit-techlab.themelomaker.chatgpt.site/?professor=1

1. Abra o site em um aparelho por participante. Em equipamento compartilhado, use “Próximo participante” após cada resultado.
2. Combine um código de turma, como visita-01. Não use nome completo, e-mail ou outros dados pessoais nesse campo.
3. O aluno escolhe “Começar e registrar” para enviar as respostas ao professor, ou “Explorar sem enviar” para obter apenas o resultado na tela e poder baixá-lo.
4. São 15 perguntas. Cada curso aparece cinco vezes, em pares diferentes. O estudante escolhe uma opção, as duas ou nenhuma.
5. O resultado mostra todos os cursos empatados no primeiro lugar e permite abrir a descrição de qualquer curso da lista. Pontuação não é probabilidade de sucesso, aptidão ou diagnóstico vocacional.
6. A gravação só é confirmada após resposta do servidor. Se falhar, o site oferece nova tentativa e download do resultado. Repetir o envio do mesmo resultado não cria outro registro.

## Consultar e exportar

A área do professor exige entrar com a conta ChatGPT autorizada, a conta usada para criar este site. Não compartilhe essa conta nem a sessão autenticada com os alunos.

1. Abra “Área do professor”.
2. Clique em “Entrar com ChatGPT” e use a conta do responsável pelo site.
3. Clique em “Carregar respostas”. A consulta traz até 100 registros por vez. Se aparecer “Carregar mais”, carregue as páginas restantes antes de exportar tudo.
4. Clique em “Exportar CSV”. O arquivo inclui identificador, data, código da turma, 15 respostas e pontuações dos seis cursos. Os registros são apresentados pela ordem das chaves de armazenamento, não necessariamente pela data.
5. A data é mostrada no fuso do navegador; no CSV, é registrada em UTC.
6. Para apagar um registro, copie seu identificador completo do CSV, cole no campo de exclusão e confirme. A exclusão é definitiva; exporte antes se precisar preservar uma cópia.

O site registra escolhas, turma opcional, identificador aleatório, data e versão do questionário. Não solicita nome ou contato. Não há prazo de exclusão automática configurado: o professor deve definir e aplicar uma rotina de descarte, por exemplo após concluir a orientação da turma. Os alunos podem guardar o identificador para pedir a localização ou exclusão de sua resposta.

## O que foi feito e o que conferir antes da turma

O site está publicado. Os cálculos, o tratamento de empates, a validação de respostas, a prevenção de duplicação por identificador e os controles de acesso foram testados no código. O fluxo de perguntas e resultado foi conferido no navegador. A entrada autenticada do professor deve ser conferida na sua conta antes da aplicação; ela depende da sessão de login.

Faça um preenchimento com código TESTE, confira o registro no painel e depois exclua-o. Abra o site em um notebook e um celular da escola. Confira também se o Wi-Fi permite o acesso e se os alunos conseguem concluir em aproximadamente sete minutos. O questionário não tem imagens, fontes externas ou bibliotecas pesadas.

## Hospedagem gratuita alternativa no GitHub Pages

O arquivo Site_WIT_TechLab_Estatico.zip contém uma versão independente em HTML, CSS e JavaScript para abrir localmente ou hospedar como site estático. Ela guarda registros somente no navegador daquele aparelho. NÃO reúne respostas de todos os notebooks. Quem usa o mesmo navegador pode consultar os registros locais; use apenas códigos sem identificação pessoal. A versão publicada acima usa armazenamento central e área do professor autenticada.

O GitHub Pages é oferecido em repositórios públicos no plano GitHub Free. Para publicar a versão estática:

1. Entre na sua conta GitHub e crie um repositório público, por exemplo questionario-wit-techlab.
2. Extraia o ZIP no computador.
3. No repositório, use Add file → Upload files e envie index.html, style.css, data.js, app.js e storage-local.js na raiz. Não envie o ZIP como se fosse o site.
4. Confirme o envio dos arquivos na branch main.
5. Abra Settings → Pages. Em Build and deployment, selecione Deploy from a branch; escolha main e /(root), e salve.
6. Aguarde a publicação e abra o endereço exibido pelo GitHub. Distribua esse endereço aos alunos.
7. Para coletar os resultados dessa versão, exporte o CSV em cada notebook e reúna os arquivos. Limpar dados do navegador, usar navegação privada ou trocar de navegador pode apagar ou separar os registros. Faça cópias ao final de cada turma.

Referências oficiais:
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

A publicação no GitHub exige sua conta; não foi feita em seu nome. O endereço ChatGPT Site acima já está publicado. Não foi contratado plano pago, domínio ou serviço externo. Não há garantia aqui sobre cotas futuras da plataforma: a alternativa explicitamente gratuita documentada é o GitHub Pages no plano Free com repositório público.

## Alterar textos e identidade

Na versão estática, data.js contém descrições, perguntas e a função de pontuação. style.css define cores e layout. app.js controla navegação, resultado e exportação. storage-local.js implementa exclusivamente o armazenamento local. Para editar a versão publicada, solicite a alteração nesta conversa; editar os arquivos do ZIP não altera o site online.

WIT usa verdes inspirados no logotipo fornecido. A área de Robótica e cultura maker usa azul escuro, verde e amarelo inspirados na marca TechLab encontrada em https://portalshalom.com.br/techlab/.

As descrições dos cursos se baseiam nas informações fornecidas por Luis. Exemplos de projetos e áreas de formação são sugestões de exploração, não garantia de conteúdo integral, matrícula, emprego ou equivalência com graduação.
