import { storiesOf } from '@storybook/svelte';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TextEdit from './TextEdit.svelte';


storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('TextEdit', () => {
    return {
      Component: TextEdit,
      props: {
        value: text('value', '123'),
        theme: text('theme', 'none'),
      },
      on: {
        input: action('input!'),
      },
    };
  });
