import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModsPage } from './mods.page';

describe('ModsPage', () => {
  let component: ModsPage;
  let fixture: ComponentFixture<ModsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
