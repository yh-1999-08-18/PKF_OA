import React from "react";
import { View } from "@tarojs/components";
import "./index.scss";
export default function InputOTP() {
  const [value, setValue] = React.useState("");
  const pinLength = 4;
  // 用来存放4个input的引用
  const inputsRef = React.useRef([]);
  // 当前聚焦的input的下标
  const curFocusIndexRef = React.useRef(0);

  // 校验value是否有效，仅仅存在数字才有效
  const isInputValueValid = React.useCallback((value) => {
    return /^\d+$/.test(value);
  }, []);

  // 聚焦指定下标的input
  const focusInput = React.useCallback((i) => {
    const inputs = inputsRef.current;
    if (i >= inputs.length) return;
    const input = inputs[i];
    if (!input) return;
    input.focus();
    curFocusIndexRef.current = i;
  }, []);

  // 聚焦后一个input
  const focusNextInput = React.useCallback(() => {
    const curFoncusIndex = curFocusIndexRef.current;
    const nextIndex =
      curFoncusIndex + 1 >= pinLength ? pinLength - 1 : curFoncusIndex + 1;
    focusInput(nextIndex);
  }, [focusInput]);

  // 聚焦前一个input
  const focusPrevInput = React.useCallback(() => {
    const curFoncusIndex = curFocusIndexRef.current;
    let prevIndex;
    if (curFoncusIndex === pinLength - 1 && value.length === pinLength) {
      prevIndex = pinLength - 1;
    } else {
      prevIndex = curFoncusIndex - 1 <= 0 ? 0 : curFoncusIndex - 1;
    }
    focusInput(prevIndex);
  }, [focusInput, value]);

  // 处理删除按钮
  const handleOnDelete = React.useCallback(() => {
    const curIndex = curFocusIndexRef.current;
    if (curIndex === 0) {
      if (!value) return;
      setValue("");
    } else if (curIndex === pinLength - 1 && value.length === pinLength) {
      setValue(value.slice(0, curIndex));
    } else {
      setValue(value.slice(0, value.length - 1));
    }
    focusPrevInput();
  }, [focusPrevInput, value]);

  // 点击input时，重新聚焦当前的input，弹出键盘
  const handleClick = React.useCallback(() => {
    focusInput(curFocusIndexRef.current);
  }, [focusInput]);

  const handleChange = React.useCallback(
    (e) => {
      if (e.detail.keyCode === 8) {
        handleOnDelete();
      }
      const val = e.target.value || "";
      if (!isInputValueValid(val)) return;
      if (val.length === 1) {
        focusNextInput();
        setValue(`${value}${val}`);
      }
    },
    [focusNextInput, isInputValueValid, value]
  );

  return (
    <View className={"container"}>
      {Array.from({ length: pinLength }).map((_, index) => {
        const focus = index === curFocusIndexRef.current;
        return (
          <input
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            className="pinInput"
            style={{
              borderColor: focus ? "#19B56A" : "",
              borderWidth: focus ? "4rpx" : "",
            }}
            maxLength={1}
            type="number"
            pattern="\d*"
            value={value[index] || ""}
            onClick={handleClick}
            onInput={handleChange}
          />
        );
      })}
    </View>
  );
}
