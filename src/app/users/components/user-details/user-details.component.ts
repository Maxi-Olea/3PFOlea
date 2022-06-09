import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  subscriptions:Subscription = new Subscription();

  user!:User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  isLoggedIn() {
    this.subscriptions.add(
      this.userService.getIsLoggedIn().subscribe((res) => {
        console.log('esta logueado?: ', res)
        if(res) {
          console.log('nevego a la otra dirección')
          this.router.navigate(['/users']);
        }
      })
    );
  }

  getDetails() {
    console.log(parseInt(this.route.snapshot.paramMap.get('id') as string))
    let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.subscriptions.add(
      this.userService.getUserById(id).subscribe((userData) => {
        this.user = userData
        console.log(this.user)
        })
    )
  }

}
