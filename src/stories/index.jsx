import { action } from "@storybook/addon-actions";
import { color, number, text, withKnobs } from "@storybook/addon-knobs";
import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import { Welcome } from "@storybook/react/demo";
import React from "react";
import "../assets/global.scss";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import EventNotification from "../components/EventNotification";
import Input from "../components/Input";

const stories = storiesOf("Storybook Knobx", module);

stories.addDecorator(withKnobs)

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module).add('Normal button', () => (
  <Button className="btn" onClick={action('Button clicked')}>This is a button</Button>
))

storiesOf('Checkbox', module).add('Normal Checkbox', () => (
  <Checkbox>This is a checkbox</Checkbox>
))

storiesOf('Input', module).add('Normal Input', () => <Input />)

const percentageKnobConfig = {
  min: 0,
  max: 1,
  step: 0.01,
  range: true,
}

storiesOf('EventNotification', module)
  .addDecorator(withKnobs)
  .add('Event Notification Message', () => (
    <EventNotification
      color={color('Color', '#00c3e8')}
      carEvent={{
        vin: text('VIN', 'ABCDEFG0123456789'),
        timestamp: Date.now(),
        fuel: number('Fuel', 0.1, percentageKnobConfig),
        wiperFluid: number('Wiper Fluid', 0.2, percentageKnobConfig),
        location: { lat: 34.394349, lng: 35.349884 },
      }}
    />
  ))
