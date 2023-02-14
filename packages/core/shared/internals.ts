import { isArrayField } from "@formily/core";
import { isVoidField } from "@formily/core";
import { FormPath } from "@formily/core";
import { isNumberLike } from "@formily/shared";

export const buildFieldPath = (field: any) => {
  return buildDataPath(field.form.fields, field.address);
};

// 可以简单的理解 path 是去掉了 空节点
export const buildDataPath = (fields: any, pattern: FormPath) => {
  let prevArray = false;
  const segments = pattern.segments;
  const path = segments.reduce((path: string[], key: any, index: number) => {
    const currentPath = path.concat(key);
    const currentAddress = segments.slice(0, index + 1);
    const current = fields[currentAddress.join(".")];
    // 前置是数组
    if (prevArray) {
      if (!isVoidField(current)) {
        prevArray = false;
      }
      // 返回当前
      return path;
    }
    // 最后一个
    if (index >= segments.length - 1) {
      return currentPath;
    }
    // 如果是空元素
    if (isVoidField(current)) {
      const parentAddress = segments.slice(0, index);
      const parent = fields[parentAddress.join(".")];
      // 父节点是数组
      if (isArrayField(parent) && isNumberLike(key)) {
        prevArray = true;
        return currentPath;
      }
      // 否则返回 之前
      return path;
    } else {
      prevArray = false;
    }
    return currentPath;
  }, []);
  return new FormPath(path);
};
// Field 数据 和 address FormPath 进行关联
export const locateNode = (field: any, address: any) => {
  field.address = FormPath.parse(address);
  field.path = buildFieldPath(field);
  field.form.indexes[field.path.toString()] = field.address.toString();
  return field;
};
