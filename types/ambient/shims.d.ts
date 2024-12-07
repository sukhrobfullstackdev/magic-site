declare module '*.svg' {
  const contents: string;
  export default string;
}

declare module '*.png' {
  const contents: string;
  export default contents;
}

declare module '*.gif' {
  const contents: string;
  export default contents;
}

declare module '*.graphql' {
  const contents: string;
  export default contents;
}

declare module '*.less' {
  const contents: { [key: string]: string | undefined };
  export default contents;
}
