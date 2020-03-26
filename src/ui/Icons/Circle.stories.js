import { storiesOf } from '@storybook/svelte';
import { withKnobs } from '@storybook/addon-knobs';

import Circle from './Circle.svelte';


storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('Circle', () => {
    return {
      Component: Circle,
    };
  });
