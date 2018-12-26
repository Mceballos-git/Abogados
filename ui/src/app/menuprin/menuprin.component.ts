import { Component, OnInit,  Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menuprin',
  templateUrl: './menuprin.component.html',
  styleUrls: ['./menuprin.component.css'],
})
export class MenuprinComponent implements OnInit{

  @Input() userName:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(){
    
  }

}
