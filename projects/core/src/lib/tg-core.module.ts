import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TGLoaderService } from './service/tg-loader.service';
import { TGHttpClient } from './service/tg-http-client.service';
import { TGConfig } from './service/tg-config.service';
import { TGError } from './model';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    TGLoaderService,
    TGHttpClient
  ],
  exports: []
})
export class TGCoreModule {
  static forRoot(config: TGConfig): ModuleWithProviders<TGCoreModule> {
    return {
      ngModule: TGCoreModule,
      providers: [
        { provide: TGConfig, useValue: config },
        { provide: TGError, useClass: config.errorClass },
        TGLoaderService,
        TGHttpClient,
      ]
    };
  }
}
