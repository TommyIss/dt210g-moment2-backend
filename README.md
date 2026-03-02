# Moment 2 i kursen DT210G, Fördjupad frontend-utveckling

## Moment 2
Det är en enkel webbtjänst byggd med Fastify backend-ramverk samt '@fastify/mysql' för att hantera todo-uppgifter i en MySQL-databas.
Tjänsten erbjuder full CRUD-funktionalitet (Create, Read, Update, Delete).

### Installation
Webbtjänsten använder MySQL-databas. Installera följande paket(fastify, @fastify/mysql, dotenv, nodemon, cors).
Databas består av en tabell för filmer, här nedan står dess struktur:
| Fält | Datatyp | Beskrivning |
|------|---------|-------------|
| id | INT | Unikt id |
| title | VARCHAR(255) | Titel |
| description | INT | Beskrivning |
| status | ENUM | Uppgiftstatus ('Ej påbörjad', 'Pågående', ('Avklarad')) |

### Användning
Nedan finns URLs ändpunkter för att använda CRUD:
| Metod | Ändpukt | Beskrivning |
|-------|---------|-------------|
| GET | /create-table-todos | Skapa ny tabell för uppgifter |
| GET | /todos | Hämtar alla uppgifter |
| GET | /todos/:id | Hämtar en uppgift med specifikt id |
| POST | /todos | Lägger till ny uppgift |
| PUT | /todos/:id | Uppdaterar uppgift med specifikt id |
| DELETE | /todos/:id | Raderar uppgift med specifikt id |

### Tommy Issa, tois2401