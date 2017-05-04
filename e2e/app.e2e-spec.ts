import { UdemyRecipesPage } from './app.po';

describe('udemy-recipes App', () => {
  let page: UdemyRecipesPage;

  beforeEach(() => {
    page = new UdemyRecipesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
