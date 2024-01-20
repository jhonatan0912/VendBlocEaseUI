import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../../data-access/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadingService : LoadingService, private spinner:NgxSpinnerService){}

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe(result => this.manageSpinner(result))
  }

  private manageSpinner(show:boolean){
    (this.isLoading = show)
    this.isLoading ?
      this.spinner.show() : this.spinner.hide();
  }
}
