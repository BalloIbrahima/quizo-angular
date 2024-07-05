import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizoComponent } from './play-quizo.component';

describe('PlayQuizoComponent', () => {
  let component: PlayQuizoComponent;
  let fixture: ComponentFixture<PlayQuizoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayQuizoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayQuizoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
