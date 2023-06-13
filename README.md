Location: https://api.movies.novik.nomoredomains.monster

# "Movies explorer. Yandex Practicum Diploma"

Repository for applications of the `Movies explorer` project, includes the back-end part of application.

Backend:

The server side allows to create/edit user and save/delete movies
2 Main schema used:

1. User (To create and edit user data documents)
2. Movies (To create and delete movie documents)

Controllers allow to:

1. Create user
2. Return JWT token for existing users.
3. Check authorization according proveded JWT token
4. Return existing user data
5. Edit existing user data
6. Return stored movies for authorized user
7. Create movies
8. Delete movies

### Used technologies:

JAVASCRIPT/EXPRESS.JS/MONGO

1. Express.js
2. MongoBD
3. bcrypt
4. celebrate
5. express-rate-limit
6. express-winston
7. helmet
8. cors

# "Movies explorer. Дипломная работа Яндекс Практикум"

Репозиторий для приложения проекта `Movies explorer`, включающий бэкэнд часть приложения.

Backend:

Серверная часть позволяет создавать/редактировать пользователя и создавать и удалять фильмы.
Используются 2 основные схемы:

1. User (Для создания и редактирования данных пользователя)
2. Movies (Для создания и удаления фильмов)

Контроллеры позволяют:

1. Создавать пользователей
2. Возвращать JWT токен, для созданных пользователей.
3. Проверять вторизацию в соотвествии с предоставленным JWT токеном
4. Возвразать данные существующего пользователя.
5. Редактировать данные существующего пользователя.
6. Возвращать сохраненные фильмы для авторизированных пользователей.
7. Создавать данные фильмов
8. Удалять данные фильмов

### Использованные технологии:

JAVASCRIPT/EXPRESS.JS/MONGO

1. Express.js
2. MongoBD
3. bcrypt
4. celebrate
5. express-rate-limit
6. express-winston
7. helmet
8. cors
