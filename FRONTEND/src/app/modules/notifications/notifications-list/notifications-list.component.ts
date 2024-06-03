import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {


 notifications:any[];


 deleteNotification(id: any) {
  this.notificationServ.deleteNotification(id).subscribe(
    (res) => {
      this.notifications = this.notifications.filter(
        (notification) => notification._id !== id
      );
    },
    (error) => {
      console.log(error);
    }
  );
}

  constructor(private notificationServ:NotificationService) {}

  ngOnInit(): void {
    this.fetchAllNotifications();
  }

  async fetchAllNotifications() {
    this.notificationServ.getNotifications();
    this.notificationServ.notifications$.subscribe((res) => {
      this.notifications = res;
    });

  }
   
  // }

}
