import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BanquilloPage } from './banquillo.page';

describe('BanquilloPage', () => {
  let component: BanquilloPage;
  let fixture: ComponentFixture<BanquilloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanquilloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BanquilloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
