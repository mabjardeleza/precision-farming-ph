import { schema } from "normalizr";

const PROGRESS_STATUS_SCHEMA_NAME = "progressStatus";
const progressStatusSchema = new schema.Entity(
  PROGRESS_STATUS_SCHEMA_NAME,
  {},
  {
    idAttribute: value => value.progress
  }
);

const TODOS_SCHEMA_NAME = "todos";
const todosSchema = new schema.Entity(TODOS_SCHEMA_NAME);
const todosSchemaArray = [todosSchema];

const DAILY_SCHEMA_NAME = "daily";
const dailySchema = new schema.Entity(DAILY_SCHEMA_NAME);
const dailySchemaArray = [dailySchema];

const OVERVIEW_SCHEMA_NAME = "overview";
const overviewSchema = new schema.Entity(OVERVIEW_SCHEMA_NAME, {
  status: progressStatusSchema,
  todos: todosSchemaArray,
  daily: dailySchemaArray
});

export const schemaNames = {
  PROGRESS_STATUS_SCHEMA_NAME,
  TODOS_SCHEMA_NAME,
  DAILY_SCHEMA_NAME,
  OVERVIEW_SCHEMA_NAME
};

export const schemas = {
  overviewSchema,
  progressStatusSchema,
  todosSchema,
  todosSchemaArray,
  dailySchema,
  dailySchemaArray
};
