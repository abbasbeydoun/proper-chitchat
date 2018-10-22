import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatTabComponent } from './group-chat-tab.component';

describe('GroupChatTabComponent', () => {
  let component: GroupChatTabComponent;
  let fixture: ComponentFixture<GroupChatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
