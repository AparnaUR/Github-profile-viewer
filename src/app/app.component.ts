import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  isLoaded: boolean;
  isFound: boolean;
  ifUserAvailable: boolean;
  title = 'githubProfileViewer';
  userdata: any;
  name: any;
  avatarUrl: any;
  location: any;
  htmlUrl: any;
  localdata: any;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('')
    });
    this.ifUserAvailable = false;
  }
    findUser() {
      this.ifUserAvailable = true;
      if (localStorage.getItem(this.myForm.value.username)) {
        this.localdata = JSON.parse(localStorage.getItem(this.myForm.value.username));
        this.display(this.localdata);
      } else {
        this.isLoaded = true;
        // tslint:disable-next-line: max-line-length
        this.http.get('https://api.github.com/users/' + this.myForm.value.username + '?access_token=beba3c150021bfb49769385927dfa59fac2cdf04').subscribe(data => {
        this.localdata = data;
        this.display(this.localdata);
        this.isLoaded = false;
        localStorage.setItem(this.myForm.value.username, JSON.stringify(this.localdata));
      }, error => {
        this.isFound = false;
        this.openSnackBar('No results found', '');
      });
      }
    }
    display(localdata) {
      this.name = localdata.name;
      this.avatarUrl = localdata.avatar_url;
      this.location = localdata.location;
      this.htmlUrl = localdata.html_url;
      }
      openSnackBar(message: string, action: string) {
        this.ifUserAvailable = false;
        this.isLoaded = false;
        this.snackBar.open(message, action, {
          duration: 4000,
        });
      }
}
