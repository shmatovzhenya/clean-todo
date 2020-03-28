import { storiesOf } from '@storybook/svelte';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import InnerLink from './InnerLink.svelte';


storiesOf('Info', module)
  .addDecorator(withKnobs)
  .add('InnerLink', () => {
    return {
      Component: InnerLink,
      props: {
        link: text('link', '/123'),
        isCurrentPageUrl: boolean('isCurrentPageUrl', false),
      },
      on: {
        navigate: (event) => {
          console.log('navigate to', event.detail);
        },
      },
    };
  });
