import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

barba.init({
  transitions: [
    {
      name: 'default',
      async leave(data) {
        console.log('leave');
        console.log(data);
        await gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
      },
      async enter(data) {
        console.log('enter');
        console.log(data);

        await gsap.to(data.current.container, { opacity: 1, duration: 0.5 });
      },
    },
    {
      name: 'contact-transition',
      from: {
        namespace: ['home'],
      },
      to: {
        namespace: ['contact'],
      },
    },
  ],
  views: [
    {
      namespace: 'contact',
      afterEnter() {
        console.log('entered contact');
      },
    },
  ],
});

barba.hooks.after(async () => {
  await restartWebflow();
});
