# inTempoApp

Este é um projeto de rede social desenvolvido com **Java/Spring** no backend e **Next.js** no frontend.

## Configuração do Ambiente

### 1. Configurar as Variáveis de Ambiente no Frontend

1. Acesse a pasta `frontend` do projeto.
2. Renomeie o arquivo `.env.example` para `.env`.
3. No arquivo `.env`, configure a URL da API como:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

### 2. Gerar Chaves RSA no Backend

1. Acesse a pasta `backend` do projeto.
2. Execute o seguinte comando para gerar as chaves RSA:
   ```sh
   openssl genpkey -algorithm RSA -out app.key
   openssl rsa -pubout -in app.key -out app.pub
   ```

### 3. Instalar Dependências no Frontend

1. Acesse a pasta `frontend`.
2. Instale as dependências do projeto com:
   ```sh
   npm install
   ```

### 4. Iniciar o Projeto com Docker

1. Na raiz do projeto, execute:
   ```sh
   docker compose up -d
   ```

Isso iniciará tanto o backend quanto o frontend em contêineres Docker.

## Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados.

## Tecnologias Utilizadas

- **Backend:** Java, Spring Boot
- **Frontend:** Next.js, React
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker

## Capturas de Tela

![Captura de tela 2025-04-16 193103](https://github.com/user-attachments/assets/1d052367-b083-4f3e-ad95-bef898f67ac0)
![Captura de tela 2025-04-16 193028](https://github.com/user-attachments/assets/f4010f82-c53f-4259-8452-61829f810211)
![Captura de tela 2025-04-16 194452](https://github.com/user-attachments/assets/7cd31323-ad24-4c2d-aba4-7227bff1e06f)
![Captura de tela 2025-04-16 194400](https://github.com/user-attachments/assets/bfdf2beb-162d-4dbd-a678-388c184c2578)
![Captura de tela 2025-04-16 194203](https://github.com/user-attachments/assets/ff935b3c-bbde-49e4-92a1-189fe638adb6)
![Captura de tela 2025-04-16 193927](https://github.com/user-attachments/assets/fa12474a-1808-4211-badc-402bce46fc75)



## Contribuição

Sinta-se à vontade para abrir issues e pull requests!

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

