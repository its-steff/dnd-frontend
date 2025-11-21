import path from "node:path";

const stylesPath = path.resolve("./styles");

const nextConfig = {
  sassOptions: {
    includePaths: [stylesPath],
    loadPaths: [stylesPath],
    additionalData: `@use "tokens/spacing" as *;
    @use "tokens/typography" as *;
    @use "tokens/breakpoints" as *;
    @use "tokens/colors" as *;
    `,
  },
};

export default nextConfig;
