import { Path } from "./index";

export type MatcherFunction = ((path: Segments) => boolean) & {
  path: Path;
};

export type Pattern =
  | string
  | number
  | Path
  | Segments
  | MatcherFunction
  | RegExp;

export type Segments = Array<string | number>;
