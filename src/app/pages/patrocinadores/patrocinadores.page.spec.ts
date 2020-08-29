import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatrocinadoresPage } from './patrocinadores.page';

describe('PatrocinadoresPage', () => {
  let component: PatrocinadoresPage;
  let fixture: ComponentFixture<PatrocinadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrocinadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatrocinadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
