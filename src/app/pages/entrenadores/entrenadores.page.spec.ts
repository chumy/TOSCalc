import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrenadoresPage } from './entrenadores.page';

describe('EntrenadoresPage', () => {
  let component: EntrenadoresPage;
  let fixture: ComponentFixture<EntrenadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrenadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
