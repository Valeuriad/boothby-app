import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWorkspacePage } from './edit-workspace.page';

describe('EditWorkspacePage', () => {
  let component: EditWorkspacePage;
  let fixture: ComponentFixture<EditWorkspacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkspacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
