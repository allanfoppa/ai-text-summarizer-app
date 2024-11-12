import { mount } from '@cypress/vue';
import AboutView from '../AboutView.vue';
import { createI18n } from 'vue-i18n';
import { messages } from '../../i18n/index';

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

describe('AboutView', () => {

  beforeEach(() => {
    mount(AboutView, {
      global: {
        plugins: [i18n],
      },
    });

    cy.get('.about').as('aboutText');
  })

  it('renders the translated text properly in Portuguese', () => {
    // ASSERT
    cy.get('@aboutText').should('contain.text', messages.pt.about.header);
  });

  it('renders the translated text properly in English', () => {
    // ARRANGE
    i18n.global.locale = 'en';
    // ASSERT
    cy.get('@aboutText').should('contain.text', messages.en.about.header);
  });

});
