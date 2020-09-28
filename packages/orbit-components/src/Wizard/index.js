// @flow
import * as React from "react";
import { css } from "styled-components";

import WizardStep from "./WizardStep";
import Button from "../Button";
import ButtonLink from "../ButtonLink";
import Stack from "../Stack";
import ChevronDown from "../icons/ChevronDown";
import Portal from "../Portal";
import Modal from "../Modal";
import { CardSection } from "../Card";
import useMediaQuery from "../hooks/useMediaQuery";
import useTheme from "../hooks/useTheme";

import type { Props } from ".";

const Wizard = ({
  dataTest,
  id,
  completedSteps,
  activeStep: activeStepNumber,
  children,
  onChangeStep,
}: Props) => {
  const { isTablet } = useMediaQuery();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggle = React.useRef<React.ElementRef<typeof ButtonLink> | null>(null);

  const childrenArray = React.Children.toArray(children);
  const activeStep = childrenArray.find((step, index) => index + 1 === activeStepNumber);
  const activeStepIndex = childrenArray.indexOf(activeStep);
  const stepsCount = React.Children.count(children);

  let steps = React.Children.map(children, (step, index) => {
    let status = "disabled";
    if (index + 1 <= completedSteps) {
      status = "completed";
    } else if (index + 1 === completedSteps + 1) {
      status = "available";
    }
    const onClick = event => {
      // $FlowFixMe: not sure why "props" is "mixed"
      if (step.props.onClick) {
        step.props.onClick(event);
      }
      if (onChangeStep) {
        onChangeStep(index + 1);
      }
    };
    return React.cloneElement(step, {
      number: index + 1,
      status,
      active: index + 1 === activeStepNumber,
      onClick,
    });
  });

  const stepsAr = React.Children.toArray(steps);
  steps = React.Children.map(steps, (step, index) => {
    const nextStep = stepsAr[index + 1];
    if (!nextStep) return step;
    return React.cloneElement(step, {
      nextStepStatus: nextStep.props.status,
    });
  });

  if (!isTablet) {
    return (
      <>
        <ButtonLink
          ref={toggle}
          dataTest={dataTest}
          ariaControls={id}
          ariaExpanded={open}
          type="secondary"
          fullWidth
          iconRight={<ChevronDown />}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Stack inline>
            <b>{`${activeStepIndex + 1} of ${stepsCount}`}</b>{" "}
            <span
              css={css`
                font-weight: normal;
              `}
            >
              {/* $FlowFixMe: not sure why "props" is "mixed" */}
              {activeStep?.props.title}
            </span>
          </Stack>
        </ButtonLink>
        <Portal>
          <div id={id}>
            {open && (
              <Modal>
                <nav
                  css={css`
                    /* matching this to ModalBody's border-radius */
                    padding-top: 9px;
                  `}
                >
                  <ul
                    css={css`
                      list-style-type: none;
                      margin: 0;
                      padding: 0;
                      > * + * {
                        border-top: 1px solid ${theme.orbit.paletteCloudDark};
                      }
                    `}
                  >
                    {steps}
                    <li>
                      <CardSection>
                        <Button
                          type="secondary"
                          fullWidth
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Close
                        </Button>
                      </CardSection>
                    </li>
                  </ul>
                </nav>
              </Modal>
            )}
          </div>
        </Portal>
      </>
    );
  }

  return (
    <nav>
      <ul
        css={css`
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          > * {
            flex: 1 1 0%;
          }
        `}
      >
        {steps}
      </ul>
    </nav>
  );
};

export default Wizard;
export { WizardStep };
