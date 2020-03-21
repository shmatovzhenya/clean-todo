import { storiesOf } from '@storybook/svelte';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CloseButton from './Close.svelte';


storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add('Close', () => {
    return {
      Component: CloseButton,
      props: {
        visible: boolean('visible', true),
      },
      on: {
        close: action('destroy!'),
      },
    };
  });
