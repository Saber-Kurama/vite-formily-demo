// RecursionField; 递归

import { h } from "vue";

const RecursionField = {
  name: "RecursionField",
  inheritAttrs: false,
  props: {
    // schema 的对象数据
    schema: {
      required: true,
    },
  },
  setup(props) {
    return () => {
      const render = () => {
        return h("div", {}, JSON.stringify(props.schema));
      };
      return render();
    };
  },
} as unknown as any;

export default RecursionField;
