import { mount } from '@cypress/vue';
import HomeView from '../HomeView.vue';
import { createI18n } from 'vue-i18n';
import { messages } from '../../i18n/index';

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

describe('HomeView', () => {
  beforeEach(() => {
    mount(HomeView, {
      global: {
        plugins: [i18n],
      },
    });

    cy.get('[data-testid="welcome-text"]').as('welcomeTextComponent');
    cy.get('[data-testid="info-text"]').as('infoTextComponent');
    cy.get('[data-testid="text-area-summarize"]').as('textAreaSummarize');
    cy.get('[data-testid="submit-button"]').as('submitButton');
    cy.get('[data-testid="summarized-text-area"]').as('summarizedTextArea');
  });

  it('should render child components', () => {
    cy.get('@welcomeTextComponent').should('be.visible');
    cy.get('@infoTextComponent').should('be.visible');
    cy.get('@textAreaSummarize').should('be.visible');
  });

  it('should initially disable the submit button', () => {
    cy.get('@submitButton').should('be.disabled');
  });

  it('should enable the submit button when text length is between 200 and 100000 characters', () => {
    cy.get('@textAreaSummarize').type('This is a test summary text with more than 200 characters. It\'s a bit longer than the previous one, but still not too long. We can add a few more words to reach the desired character count. Perhaps we could talk about the weather, or maybe the latest news.');
    cy.get('@submitButton').should('not.be.disabled');
  });

  it('should disable the submit button when text length is not between 200 and 100000 characters', () => {
    cy.get('@textAreaSummarize').clear().type('Short text');
    cy.get('@submitButton').should('be.disabled');
  });

  it('should display an error message when submit fails', () => {

    cy.mount(HomeView, {
      global: {
        plugins: [i18n],
      },
    });

    const payload = 'This is a test summary text with more than 200 characters. It\'s a bit longer than the previous one, but still not too long. We can add a few more words to reach the desired character count. Perhaps we could talk about the weather, or maybe the latest news.'
    const errorMessage = 'Error: Unable to summarize the text';

    cy.intercept('POST', '/summarize', {
      statusCode: 400,
      body: {
        metadata: {
          statusCode: 400,
        },
        message: errorMessage,
      },
    }).as('summarizeRequest');

    cy.get('@textAreaSummarize').type(payload);
    cy.get('@submitButton').click();

    cy.wait('@summarizeRequest').then(() => {
      cy.get('@summarizedTextArea').should('have.value', errorMessage);
    });
  });

  it('should display an success message when submit', () => {

    cy.mount(HomeView, {
      global: {
        plugins: [i18n],
      },
    });

    const payload = 'This is a test summary text with more than 200 characters. It\'s a bit longer than the previous one, but still not too long. We can add a few more words to reach the desired character count. Perhaps we could talk about the weather, or maybe the latest news.'
    const summarizedMessage = 'some summarized text';

    cy.intercept('POST', '/summarize', {
      statusCode: 201,
      body: {
        data: "some summarized text",
        metadata: {
          statusCode: 201,
          successInfo: {
            message: "Summarized text create with success."
          },
        },
      },
    }).as('summarizeRequest');

    cy.get('@textAreaSummarize').type(payload);
    cy.get('@submitButton').click();

    cy.wait('@summarizeRequest').then(() => {
      cy.get('@summarizedTextArea').should('have.value', summarizedMessage);
    });
  });

});
