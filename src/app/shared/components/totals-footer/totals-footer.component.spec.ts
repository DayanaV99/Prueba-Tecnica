import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsFooterComponent } from './totals-footer.component';

describe('TotalsFooterComponent', () => {
  let component: TotalsFooterComponent;
  let fixture: ComponentFixture<TotalsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
