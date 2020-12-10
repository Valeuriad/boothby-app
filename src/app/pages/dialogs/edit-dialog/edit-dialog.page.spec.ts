import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDialogPage } from './edit-dialog.page';

describe('EditDialogPage', () => {
  let component: EditDialogPage;
  let fixture: ComponentFixture<EditDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
