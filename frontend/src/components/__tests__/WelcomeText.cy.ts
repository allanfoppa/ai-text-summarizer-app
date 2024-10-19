import { mount } from '@cypress/vue';
import WelcomeText from '../WelcomeText.vue';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: {
      welcome: 'Welcome to the AI Text Summarizer App! This app leverages the power of Artificial Intelligence APIs to provide concise summaries of long texts. Whether you have a lengthy article, research paper, or any other text document that you want to summarize quickly, our app can assist you.',
    },
  },
  pt: {
    home: {
      welcome: 'Bem-vindo ao Aplicativo de Resumo de Texto com IA! Este aplicativo utiliza o poder das APIs de Inteligência Artificial para fornecer resumos concisos de textos longos. Se você tem um artigo extenso, um trabalho de pesquisa ou qualquer outro documento de texto que deseja resumir rapidamente, nosso aplicativo pode ajudá-lo.',
    },
  },
};

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
