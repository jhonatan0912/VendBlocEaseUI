import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() cardName: string = '';
  @Input() iconBackgroundColor: string = '';
  @Input() cardCount: string = '0';
}
