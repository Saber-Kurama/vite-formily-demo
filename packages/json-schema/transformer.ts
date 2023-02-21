import { Schema } from "./schema";
import { ISchema, ISchemaTransformerOptions } from "./types";

// const getBaseReactions =
//   (schema: ISchema, options: ISchemaTransformerOptions) => (field: Field) => {
//     setSchemaFieldState(
//       {
//         field,
//         request: { schema },
//         scope: getBaseScope(field, options),
//       },
//       true
//     );
//   };

export const transformFieldProps = (
  schema: Schema,
  options?: ISchemaTransformerOptions
): any => {
  return {
    name: schema.name,
    // todo: 这是用来做 交互用的吧
    // reactions: [getBaseReactions(schema, options)].concat(
    //   getUserReactions(schema, options)
    // ),
  };
};
