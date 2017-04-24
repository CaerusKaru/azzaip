import { AzzaipPage } from './app.po';

describe('azzaip App', () => {
  let page: AzzaipPage;

  beforeEach(() => {
    page = new AzzaipPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
