import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../../_services/dataStorage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorage.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
}
}
