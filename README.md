# Projeto

Este é um projeto construído com .NestJS 10.0, Prisma 5.15, PostgreSQL e Docker.

este projeto foi desenvolvido seguindo algumas boas práticas da Arquitetura Limpa (Clean Architecture), Código Limpo (Clean Code) e DDD;

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)
- Ferramenta de versionamento: [Instalação do Git](https://git-scm.com/)

## Como executar

1. Clone o repositório:

```bash
git clone git@github.com:mactavishkkk/kukac-challenge-api.git
```

2. Navegue até o diretório dos arquivos de construção:

```bash
cd kukac-challenge-api
```

3. Você precisará do arquivo `.env` em seu diretório raiz, basta renomear o `.env.example` para o mesmo ou criar um novo:

4. Construa as imagens para os ambientes com docker, no terminal use:

```bash
docker compose build
```

5. Agora basta subir elas com:

```bash
docker compose up -d
```

6. Pronto, agora você já poderá acessar a rota de boas vindas em seu navegador:

```bash
https://localhost:3001/
```

---

## OBS:

Por algum motivo, que confesso ainda não saber o porquê, alguns sistemas operacionais como distribuições linux não aceitam a palavra "localhost" para se referir ao IP local da máquina.

então caso depois de executar a etapa **4** o aplicativo não subir, você precisará pegar o seu IP relativo que é diferente do **localhost**(127.0.0.1), é simples:

1. Em seu terminal acesse-o com:

```bash
hostname -I
```

ele geralmente é o único ou o primeiro de uma lista, ele se parecerá com isto: `192.168.1.7 172.20.0.1 172.19.0`, nosso IP é o `192.168.1.7`.

agora basta acessar o arquivo `kukac-challenge-api.git/docker-compose.yaml` e na string de conexão substituir o parâmetro `- DB_HOST=localhost` por `Host=192.168.1.7` ou vice-versa, você também deverá fazer esta substituição no arquivo `.env`. Pronto, volte ao passo **3** e continue novamente.

## Documentação da API

A documentação da API pode ser encontrada em `http://localhost:3001/swagger/api`, onde você pode encontrar informações sobre os endpoints disponíveis, parâmetros de solicitação, respostas e exemplos de uso.