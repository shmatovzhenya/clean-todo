import { storiesOf } from '@storybook/svelte';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox.svelte';


storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Checkbox', () => {
    return {
      Component: Checkbox,
      props: {
        checked: boolean('checked', true),
      },
      on: {
        toggle: action('toggle!'),
      },
    };
  });
