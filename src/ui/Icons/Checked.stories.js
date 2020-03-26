import { storiesOf } from '@storybook/svelte';
import { withKnobs } from '@storybook/addon-knobs';

import Checked from './Checked.svelte';


storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('Checked', () => {
    return {
      Component: Checked,
    };
  });
