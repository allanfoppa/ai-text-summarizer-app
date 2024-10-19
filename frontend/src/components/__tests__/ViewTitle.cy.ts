import { mount } from '@cypress/vue';
import ViewTitle from '../ViewTitle.vue';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: {
      header: 'AI Text Summarizer App',
    },
  },
  pt: {
    home: {
      header: 'Aplicativo de Resumo de Texto com IA',
    },
  },
};

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

describe('ViewTitle', () => {

  beforeEach(() => {
    mount(ViewTitle, {
      global: {
        plugins: [i18n],
      },
    });

    cy.get('h1').as('viewTitle');
  })

  it('renders the translated text properly in Portuguese', () => {
    // ASSERT
    cy.get('@viewTitle').should('contain.text', messages.pt.home.header);
  });

  it('renders the translated text properly in English', () => {
    // ARRANGE
    i18n.global.locale = 'en';
    // ASSERT
    cy.get('@viewTitle').should('contain.text', messages.en.home.header);
  });

});
