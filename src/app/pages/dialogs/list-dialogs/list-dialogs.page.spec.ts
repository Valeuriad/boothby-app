import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDialogsPage } from './list-dialogs.page';

describe('ListDialogsPage', () => {
  let component: ListDialogsPage;
  let fixture: ComponentFixture<ListDialogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDialogsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDialogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
