import { onMounted, watch, Ref, onUnmounted, nextTick } from "vue";

interface IRecycleTarget {
  onMount: () => void;
  onUnmount: () => void;
}

export const useAttach = <T extends IRecycleTarget>(target: Ref<T>): Ref<T> => {
  // 监听 回调函数
  watch(target, (v, old, onInvalidate) => {
    if (v && v !== old) {
      old?.onUnmount();
      nextTick(() => v.onMount?.());
      onInvalidate(() => v.onUnmount?.());
    }
  });
  onMounted(() => {
    target.value?.onMount?.();
  });
  onUnmounted(() => {
    target.value?.onUnmount?.();
  });
  return target;
};
