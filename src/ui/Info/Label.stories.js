import { storiesOf } from '@storybook/svelte';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Label from './Label.svelte';


storiesOf('Info', module)
  .addDecorator(withKnobs)
  .add('Label', () => {
    return {
      Component: Label,
      props: {
        crossed: boolean('crossed', false),
      },
    };
  });
