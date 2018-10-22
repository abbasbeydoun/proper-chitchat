import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTabsContainerComponent } from './chat-tabs-container.component';

describe('ChatTabsContainerComponent', () => {
  let component: ChatTabsContainerComponent;
  let fixture: ComponentFixture<ChatTabsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTabsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTabsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
