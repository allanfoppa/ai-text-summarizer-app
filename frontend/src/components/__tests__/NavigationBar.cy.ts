import { mount } from '@cypress/vue';
import { createI18n } from 'vue-i18n';
import { createRouter, createMemoryHistory } from 'vue-router';
import NavigationBar from '../NavigationBar.vue';

// Mock translations for i18n
const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
    },
  },
};

// Create i18n instance
const i18n = createI18n({
  locale: 'en', // Set default locale to English
  fallbackLocale: 'pt',
  globalInjection: true,
  messages,
});

// Mock routes for the Vue Router
const routes = [
  {
    path: '/:lang/home',
    name: 'home',
    component: { template: '<div>Home Page</div>' },
  },
  {
    path: '/:lang/about',
    name: 'about',
    component: { template: '<div>About Page</div>' },
  },
];

// Create a router instance
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe('NavigationBar', () => {

  beforeEach(() => {
    mount(NavigationBar, {
      global: {
        plugins: [i18n, router],
      },
    });

    cy.get('.nav__link').as('navLinks');
  })

  it('renders the navigation links with correct text and paths in Portuguese', () => {
    // Change the i18n locale to Portuguese
    i18n.global.locale = 'pt';

    // Push to Portuguese home page
    cy.wrap(router).invoke('push', { path: '/pt/home' });

    // Assert that the router links are correctly rendered in Portuguese
    cy.get('@navLinks').first().should('contain.text', messages.pt.nav.home);
    cy.get('@navLinks').eq(1).should('contain.text', messages.pt.nav.about);

    // Assert that the links point to the correct paths
    cy.get('@navLinks').first().should('have.attr', 'href', '/pt/home');
    cy.get('@navLinks').eq(1).should('have.attr', 'href', '/pt/about');
  });

  it('renders the navigation links with correct text and paths in English', () => {
    // Change the i18n locale to English
    i18n.global.locale = 'en';

    // Push to English home page
    cy.wrap(router).invoke('push', { path: '/en/home' });

    // Assert that the router links are correctly rendered in English
    cy.get('@navLinks').first().should('contain.text', messages.en.nav.home);
    cy.get('@navLinks').eq(1).should('contain.text', messages.en.nav.about);

    // Assert that the links point to the correct paths
    cy.get('@navLinks').first().should('have.attr', 'href', '/en/home');
    cy.get('@navLinks').eq(1).should('have.attr', 'href', '/en/about');
  });

  it('changes the locale when route changes', () => {
    // Initially mount with English locale
    i18n.global.locale = 'en';

    // Assert that the links are in English initially
    cy.get('@navLinks').first().should('contain.text', messages.en.nav.home);

    //  Push to route to Portuguese
    cy.wrap(router).invoke('push', { path: '/pt/home' });

    // Wait for the component to update and assert that links are now in Portuguese
    cy.get('@navLinks').first().should('contain.text', messages.pt.nav.home);
  });
});
