import { storiesOf } from '@storybook/svelte';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Link from './Link.svelte';


storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add('Link', () => {
    return {
      Component: Link,
      on: {
        click: action('clicked!'),
      },
    };
  });
