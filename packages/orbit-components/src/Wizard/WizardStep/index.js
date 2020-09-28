// @flow
import * as React from "react";
import { css } from "styled-components";
import { hex2rgb } from "@csstools/convert-colors";

import useMediaQuery from "../../hooks/useMediaQuery";
import ButtonLink from "../../ButtonLink";
import Stack from "../../Stack";
import Text from "../../Text";
import CheckCircle from "../../icons/CheckCircle";
import useTheme from "../../hooks/useTheme";

import type { Props } from ".";

const WizardStep = ({
  dataTest,
  number,
  title,
  status,
  nextStepStatus,
  active,
  onClick,
}: Props) => {
  const { isTablet } = useMediaQuery();
  const theme = useTheme();
  const iconWidth = parseFloat(theme.orbit.widthIconSmall);
  const iconHeight = parseFloat(theme.orbit.heightIconSmall);
  // account for additional inner spacing because of visual balance
  const checkboxWidth = iconWidth * (5 / 6);
  const checkboxHeight = iconHeight * (5 / 6);
  const colorDisabled = theme.orbit.paletteCloudNormalHover;

  const activeGlowColor = `rgba(${hex2rgb(theme.orbit.paletteProductNormal)
    .slice(0, -1)
    .map(n => 255 * (n / 100))
    .concat(0.2)
    .join(", ")})`;

  /**
   * We're explicitly rounding values in layout styles because browsers seem to
   * be rounding them inconsistently horizontally vs vertically.
   */

  const icon = (
    <div
      css={css`
        position: relative;
        opacity: 1;
        &:before {
          content: "";
          display: block;
          width: ${Math.round(checkboxWidth)}px;
          height: ${Math.round(checkboxHeight)}px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: ${theme.orbit.paletteProductNormal};
          ${status === "completed" &&
          css`
            background: ${theme.orbit.paletteWhite};
          `}
          ${status === "disabled" &&
          css`
            background: ${colorDisabled};
          `}
          border-radius: 50%;
          ${active &&
          css`
            box-shadow: 0 0 0 4px ${activeGlowColor};
          `}
        }
        svg {
          position: relative;
          display: block;
        }
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        {status === "completed" ? (
          <CheckCircle
            ariaLabel="completed"
            size="small"
            customColor={theme.orbit.paletteProductNormal}
          />
        ) : (
          <div
            css={css`
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              width: ${theme.orbit.widthIconSmall};
              height: ${theme.orbit.heightIconSmall};
              padding: ${Math.round((iconHeight - checkboxHeight) / 2)}px
                ${Math.round((iconWidth - checkboxWidth) / 2)}px;
            `}
          >
            <Text as="div" type={status === "disabled" ? "primary" : "white"} size="small">
              {number || null}
            </Text>
          </div>
        )}
      </div>
    </div>
  );

  if (!isTablet) {
    return (
      <li
        data-test={dataTest}
        css={css`
          button {
            border-radius: 0;
          }
          ${active &&
          css`
            position: relative;
            &:before {
              content: "";
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              width: 2px;
              background: ${theme.orbit.paletteProductNormal};
              pointer-events: none;
            }
          `}
          ${status === "disabled" &&
          css`
            background: ${theme.orbit.paletteCloudLight};
            button {
              opacity: 1;
            }
          `};
        `}
      >
        <ButtonLink
          disabled={status === "disabled"}
          type="secondary"
          fullWidth
          iconLeft={icon}
          ariaCurrent={active ? "step" : "false"}
          onClick={onClick}
        >
          {status === "disabled" ? (
            <Text as="span" type="secondary">
              {title}
            </Text>
          ) : (
            title
          )}
        </ButtonLink>
      </li>
    );
  }

  return (
    <li data-test={dataTest}>
      <div
        css={css`
          position: relative;
          &:before,
          &:after {
            content: "";
            display: block;
            position: absolute;
            top: ${parseFloat(theme.orbit.heightIconSmall) / 2 - 1}px;
            width: 50%;
            height: 2px;
          }
          &:before {
            left: 0;
            background: ${status === "disabled" ? colorDisabled : theme.orbit.paletteProductNormal};
          }
          &:after {
            right: 0;
            background: ${status === "disabled" || nextStepStatus === "disabled"
              ? colorDisabled
              : theme.orbit.paletteProductNormal};
          }
        `}
      />
      <Stack direction="column" align="center" spacing="condensed">
        {icon}
        {status === "disabled" ? (
          <Text as="div" type="secondary" size="small">
            {title}
          </Text>
        ) : (
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              role="button"
              tabIndex={0}
              css={css`
                display: block;
                cursor: pointer;
                text-decoration: none;
                &:hover,
                &:focus {
                  text-decoration: underline;
                }
              `}
              aria-current={active ? "step" : "false"}
              onClick={event => {
                event.currentTarget.blur();
                if (onClick) {
                  onClick(event);
                }
              }}
              // keep focus for people who are navigating with the keyboard
              onKeyDown={event => {
                if (event.key === "Enter" && onClick) {
                  onClick(event);
                }
              }}
            >
              <Text
                as="span"
                type={active ? "primary" : "secondary"}
                weight={active ? "bold" : "normal"}
                size="small"
              >
                {title}
              </Text>
            </a>
          </div>
        )}
      </Stack>
    </li>
  );
};

export default WizardStep;
