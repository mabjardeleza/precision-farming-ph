import { schema } from "normalizr";

const BARNS_SCHEMA_NAME = "barns";
const barnsSchema = new schema.Entity(BARNS_SCHEMA_NAME);
const barnsSchemaArray = [barnsSchema];

const BARN_STATUS_SCHEMA_NAME = "barnStatus";
const barnStatusSchema = new schema.Entity(BARN_STATUS_SCHEMA_NAME);

export const schemaNames = {
  BARNS_SCHEMA_NAME,
  BARN_STATUS_SCHEMA_NAME
};

export const schemas = {
  barnsSchema,
  barnsSchemaArray,
  barnStatusSchema
};
