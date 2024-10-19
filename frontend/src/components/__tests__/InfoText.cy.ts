import { mount } from '@cypress/vue';
import InfoText from '@/components/InfoText.vue';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: {
      info: 'Simply paste your text into the text area below and click the "Submit" button.',
    },
  },
  pt: {
    home: {
      info: 'Simplesmente cole seu texto na área de texto abaixo e clique no botão "Enviar".',
    },
  },
};

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

describe('InfoText', () => {

  beforeEach(() => {
    mount(InfoText, {
      global: {
        plugins: [i18n],
      },
    });

    cy.get('p').as('infoText');
  })

  it('renders the translated text properly in Portuguese', () => {
    // ASSERT
    cy.get('@infoText').should('contain.text', messages.pt.home.info);
  });

  it('renders the translated text properly in English', () => {
    // ARRANGE
    i18n.global.locale = 'en';
    // ASSERT
    cy.get('@infoText').should('contain.text', messages.en.home.info);
  });

});
