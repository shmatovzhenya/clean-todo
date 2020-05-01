import { storiesOf } from '@storybook/svelte';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Text from './Text.svelte';


storiesOf('Info', module)
  .addDecorator(withKnobs)
  .add('Text', () => {
    return {
      Component: Text,
    };
  });
