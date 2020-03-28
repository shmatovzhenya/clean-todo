import { storiesOf } from '@storybook/svelte';
import { withKnobs } from '@storybook/addon-knobs';

import Footer from './Footer.svelte';


storiesOf('Info', module)
  .addDecorator(withKnobs)
  .add('Footer', () => {
    return {
      Component: Footer,
    };
  });
