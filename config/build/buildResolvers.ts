import webpack from "webpack";

export function buildResolvers(): webpack.ResolveOptions {
  const resolvers = {
    extensions: ['.tsx', '.ts', '.js'],
  };

  return resolvers;
}
