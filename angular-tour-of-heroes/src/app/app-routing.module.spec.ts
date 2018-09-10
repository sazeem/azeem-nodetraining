import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('# Should Create an Instance of AppRoutingModule', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
