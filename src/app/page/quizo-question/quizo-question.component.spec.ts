import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizoQuestionComponent } from './quizo-question.component';

describe('QuizoQuestionComponent', () => {
  let component: QuizoQuestionComponent;
  let fixture: ComponentFixture<QuizoQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizoQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
