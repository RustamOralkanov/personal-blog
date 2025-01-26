import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { join } from "path";

export const graphQLConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    sortSchema: true,
};
