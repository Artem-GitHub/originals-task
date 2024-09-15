import {
  Form,
  Field,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate';

import { required, max } from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Form', Form);
  nuxtApp.vueApp.component('Field', Field);
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage);

  defineRule('required', required);
  defineRule('max', max);

  configure({
    generateMessage: (ctx) => {
      const { field, rule } = ctx;

      if (rule?.name) {
        const messages: { [key: string]: string } = {
          required: `The field ${field} is required`,
          max: 'Maximum character limit error',
        };

        return messages[rule.name];
      } else {
        return 'Validation error';
      }
    },
  });
});
