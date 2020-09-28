// @flow

import React from "react";
import { storiesOf } from "@storybook/react";
import { number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Wizard, { WizardStep } from ".";

storiesOf("Wizard", module).add(
  "Playground",
  () => {
    const steps = array("Steps", [
      "Search",
      "Passenger details",
      "Ticket fare",
      "Customize your trip",
      "Overview & payment",
    ]);
    const completedSteps = number("completedSteps", 3, {
      range: true,
      min: 0,
      max: steps.length,
      step: 1,
    });
    const activeStep = number("activeStep", 4, {
      range: true,
      min: 1,
      max: Math.min(completedSteps + 1, steps.length),
      step: 1,
    });
    return (
      <Wizard
        id="wizard"
        completedSteps={completedSteps}
        activeStep={activeStep}
        onChangeStep={action("onChangeStep")}
      >
        {steps.map(step => (
          <WizardStep key={step} title={step} />
        ))}
      </Wizard>
    );
  },
  { knobs: { escapeHTML: false } },
);
