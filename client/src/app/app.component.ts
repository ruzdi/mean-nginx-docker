import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  customers = [];

  ngOnInit(): void {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.customers = data;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.customers = [];
      });
  }
}
