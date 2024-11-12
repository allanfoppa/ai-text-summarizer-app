import { mount } from '@cypress/vue';
import WelcomeText from '../WelcomeText.vue';
import { createI18n } from 'vue-i18n';
import { messages } from '../../i18n/index';

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

describe('WelcomeText', () => {

  beforeEach(() => {
    mount(WelcomeText, {
      global: {
        plugins: [i18n],
      },
    });

    cy.get('p').as('welcomeText');
  })

  it('renders the translated text properly in Portuguese', () => {
    // ASSERT
    cy.get('@welcomeText').should('contain.text', messages.pt.home.welcome);
  });

  it('renders the translated text properly in English', () => {
    // ARRANGE
    i18n.global.locale = 'en';
    // ASSERT
    cy.get('@welcomeText').should('contain.text', messages.en.home.welcome);
  });

});
