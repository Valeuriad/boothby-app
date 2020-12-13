import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDialogLinesPage } from './edit-dialog-lines.page';

describe('EditDialogLinesPage', () => {
  let component: EditDialogLinesPage;
  let fixture: ComponentFixture<EditDialogLinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogLinesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDialogLinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
