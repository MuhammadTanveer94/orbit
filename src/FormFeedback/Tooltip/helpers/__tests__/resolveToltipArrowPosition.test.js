// @flow
import resolveTooltipArrowPosition from "../resolveTooltipArrowPosition";
import defaultTheme from "../../../../defaultTheme";
import { left } from "../../../../utils/rtl";

const contentBoundingRaw = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

const iconBoundingRaw = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

const resolveWithRTLFunction = string => string.replace("__position__", left.toString());

const params = ({ position, contentBounding, iconBounding, inlineLabel }) => ({
  position,
  theme: defaultTheme,
  inlineLabel,
  contentBounding,
  iconBounding,
});

describe("resolveTooltipArrowPosition", () => {
  it("top position", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "top",
          contentBounding: contentBoundingRaw,
          iconBounding: iconBoundingRaw,
          inlineLabel: false,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("bottom:-7px;__position__:8px;"));
  });
  it("bottom position", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "bottom",
          contentBounding: contentBoundingRaw,
          iconBounding: iconBoundingRaw,
          inlineLabel: false,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("top:-7px;__position__:8px;"));
  });
  it("bottom position with inline label", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "bottom",
          contentBounding: contentBoundingRaw,
          iconBounding: iconBoundingRaw,
          inlineLabel: true,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("top:-7px;__position__:-7px;"));
  });
  it("top position with inline label", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "top",
          contentBounding: contentBoundingRaw,
          iconBounding: iconBoundingRaw,
          inlineLabel: true,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("bottom:-7px;__position__:-7px;"));
  });
  it("top position with inline label", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "top",
          contentBounding: contentBoundingRaw,
          iconBounding: undefined,
          inlineLabel: true,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("bottom:-7px;__position__:22px;"));
  });
  it("bottom position with inline label", () => {
    expect(
      resolveTooltipArrowPosition(
        params({
          position: "bottom",
          contentBounding: contentBoundingRaw,
          iconBounding: undefined,
          inlineLabel: true,
        }),
      ).join(""),
    ).toEqual(resolveWithRTLFunction("top:-7px;__position__:22px;"));
  });
});