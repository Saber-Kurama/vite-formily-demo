import { isStr } from "@formily/shared";
import { Pattern, Segments } from "./types";

const pathCache = new Map();
const isMatcher = Symbol("PATH_MATCHER");

const isSimplePath = (val: string) =>
  val.indexOf("*") === -1 &&
  val.indexOf("~") === -1 &&
  val.indexOf("[") === -1 &&
  val.indexOf("]") === -1 &&
  val.indexOf(",") === -1 &&
  val.indexOf(":") === -1 &&
  val.indexOf(" ") === -1 &&
  val[0] !== ".";

const parse = (pattern: Pattern, base?: Pattern) => {
  if (pattern instanceof Path) {
    // 直接返回 Path的属性
    // return {
    //   entire: pattern.entire,
    //   segments: pattern.segments.slice(),
    //   isRegExp: false,
    //   haveRelativePattern: pattern.haveRelativePattern,
    //   isWildMatchPattern: pattern.isWildMatchPattern,
    //   isMatchPattern: pattern.isMatchPattern,
    //   haveExcludePattern: pattern.haveExcludePattern,
    //   tree: pattern.tree,
    // };
  } else if (isStr(pattern)) {
    // 如果是字符串
    if (!pattern) {
      // pattern 是空
      return {
        entire: "",
        segments: [],
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      };
    }
    if (isSimplePath(pattern)) {
      // 简单路径就不关心 base了？
      return {
        entire: pattern,
        segments: pattern.split("."),
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      };
    }
    const parser = new Parser(pattern, Path.parse(base));
    const tree = parser.parse();
    if (!parser.isMatchPattern) {
      const segments = parser.data.segments;
      return {
        entire: segments.join("."),
        segments,
        tree,
        isRegExp: false,
        haveRelativePattern: parser.haveRelativePattern,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      };
    } else {
      return {
        entire: pattern,
        segments: [],
        isRegExp: false,
        haveRelativePattern: false,
        isWildMatchPattern: parser.isWildMatchPattern,
        haveExcludePattern: parser.haveExcludePattern,
        isMatchPattern: true,
        tree,
      };
    }
  } else if (isFn(pattern) && pattern[isMatcher]) {
    return parse(pattern["path"]);
  } else if (isArr(pattern)) {
    return {
      entire: pattern.join("."),
      segments: pattern.reduce((buf, key) => {
        return buf.concat(parseString(key));
      }, []),
      isRegExp: false,
      haveRelativePattern: false,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false,
    };
  } else if (isRegExp(pattern)) {
    return {
      entire: pattern,
      segments: [],
      isRegExp: true,
      haveRelativePattern: false,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: true,
    };
  } else {
    return {
      entire: "",
      isRegExp: false,
      segments: pattern !== undefined ? [pattern] : [],
      haveRelativePattern: false,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false,
    };
  }
};

export class Path {
  // 路径完整字符串，与入参数据一致
  public entire: string | RegExp;
  // 如果路径为非匹配型路径，则可以读取到完整的路径分割片段
  public segments: Segments;
  // 该路径是否是匹配型路径
  // todo: 为啥会有匹配路径呢
  public isMatchPattern: boolean;
  // 该路径是否是全通配路径，比如a.b.*
  public isWildMatchPattern: boolean;
  // 是否是正则
  public isRegExp: boolean;
  // 该路径是否存在反向匹配，比如*(!a.b.c)
  public haveExcludePattern: boolean;
  constructor(input: Pattern, base?: Pattern) {
    const {
      tree,
      segments,
      entire,
      isRegExp,
      isMatchPattern,
      isWildMatchPattern,
      haveRelativePattern,
      haveExcludePattern,
    } = parse(input, base);
  }

  // 如果路径为非匹配型路径，则可以读取路径的长度
  get length() {
    return this.segments.length;
  }
  // todo： 为什么要兼容 Path ？
  static parse(path: Pattern = "", base?: Pattern): Path {
    if (path instanceof Path) {
      // 如果是Path
      return {} as any;
    } else if (path && path[isMatcher]) {
      // 对象？
      // 这是一个什么情况？
      return {} as any;
    } else {
      // path 是一个字符串
      const key_ = base ? Path.parse(base) : "";
      const key = `${path}:${key_}`;
      const found = pathCache.get(key);
      if (found) {
        return found;
      } else {
        path = new Path(path, base);
        pathCache.set(key, path);
        return path;
      }
    }
  }
}
