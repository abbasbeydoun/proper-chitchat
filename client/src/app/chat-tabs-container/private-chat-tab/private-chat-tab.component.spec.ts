import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChatTabComponent } from './private-chat-tab.component';

describe('PrivateChatTabComponent', () => {
  let component: PrivateChatTabComponent;
  let fixture: ComponentFixture<PrivateChatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChatTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
