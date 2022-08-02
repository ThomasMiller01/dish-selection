# Backend

## Database

MySql database

### Tables

**recipes**

| id                               | title        | description  | instructions   | preptime | last_cooked | created  |
| -------------------------------- | ------------ | ------------ | -------------- | -------- | ----------- | -------- |
| int (primary key, autoincrement) | varchar(255) | varchar(255) | varchar(10000) | float    | datetime    | datetime |

**ingredients**

| id                               | name         | amount | unit         | comment        |
| -------------------------------- | ------------ | ------ | ------------ | -------------- |
| int (primary key, autoincrement) | varchar(255) | float  | varchar(255) | varchar(10000) |

**tags**

| id                               | value        |
| -------------------------------- | ------------ |
| int (primary key, autoincrement) | varchar(255) |

**recipe_ingredients**

| id                               | recipe_id                            | ingredient_id                        |
| -------------------------------- | ------------------------------------ | ------------------------------------ |
| int (primary key, autoincrement) | int (foreign key, on delete cascade) | int (foreign key, on delete cascade) |

**recipe_tags**

| id                               | recipe_id                            | tag_id                               |
| -------------------------------- | ------------------------------------ | ------------------------------------ |
| int (primary key, autoincrement) | int (foreign key, on delete cascade) | int (foreign key, on delete cascade) |
