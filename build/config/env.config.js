export const env = process.env.NODE_ENV || 'development';
export const isProduction = env === 'production';
export const isDebug = (env === 'development') && process.env.BROWSER;
export const port = process.env.PORT || 3000;
export const devPort = process.env.DEV_PORT || 8080;
export const graphqlPort = process.env.GRAPHQL_PORT || 8090;
export const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
