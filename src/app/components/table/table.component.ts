import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ToastModule, ConfirmPopupModule, DialogModule,
     CardModule, ButtonModule, ToolbarModule, TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableData : any[] = []
  @Input() cols : any[] = [];
  @Input() tableName : string = '';
  @Input() showAdd : boolean = false;
  @Input() showEdit : boolean = false;
  @Input() showOpen : boolean = false;
  @Input() showDelete : boolean = true;
  @Output() addButtonPressed = new EventEmitter<boolean>();
  @Output() showButtonPressed = new EventEmitter<number>();
  @Output() removeButtonPressed = new EventEmitter<{event:Event, id:number}>();


  showAction(id:number){
    this.showButtonPressed.emit(id);
  }

  addAction(){
    this.addButtonPressed.emit(true);
  }

  removeAction(event:Event,id:number){
    this.removeButtonPressed.emit({event, id});
  }
}
