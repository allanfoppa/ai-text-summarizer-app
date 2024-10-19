import SummarizeTextArea from "../SummarizeTextArea.vue";

describe('SummarizeTextArea', () => {

  const mountComponent = (props: any) => {
    cy.mount(SummarizeTextArea, {
      props: {
        modelValue: props.modelValue,
        'onUpdate:modelValue': cy.stub().as('updateModelValue'),
      }
    });
  };

  beforeEach(() => {
    mountComponent({ modelValue: '' });

    cy.get('textarea').as('summarizeTextArea');
  });

  it('emits update:modelValue event on input for values < 200 characters', () => {
    const shortText = 'This is a short text less than 200 characters.';
    cy.get('@summarizeTextArea')
      .type(shortText);

    cy.on('@update:modelValue', () => {
      cy.get('@updateModelValue').should('not.have.been.called');
    });
  });

  it('emits update:modelValue event on input for values > 200 and < 5000 characters', () => {
    const validText = 'This is a valid text with more than 200 characters but less than 5000 characters';
    cy.get('@summarizeTextArea')
      .type(validText);

    cy.on('@update:modelValue', () => {
      cy.get('@updateModelValue').should('have.been.called');
    });
  });

});
