
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Notification } from "src/app/core/models";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  providers: [DatePipe], // Add DatePipe to providers
})


export class NotificationComponent implements OnInit {
  showNotifications = false;
  notificationHovered: string | null = null; 
  unreadCount = 0;
  readCount = 0;
  notifications: any[] = [];
  public openNotification: boolean = false;


  constructor(
    private router:Router,
    private notificationService: NotificationService
  ) {}

  toggleNotificationMobile() {
    this.openNotification = !this.openNotification;
  }
  ngOnInit() {
if(localStorage.getItem('user_role') == "1") {
  
  this.notificationService.getNotifications()
  this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.updateUnreadCount();
    });

  this.notificationService
    .listen()
    .subscribe((notification) => {
      this.notifications.push(notification);
      this.updateUnreadCount(); 
    });
}
  }

 

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe(
      (res) => {
        console.log(res); 
        const notificationIndex= this.notifications.findIndex( (notification) => notification._id === notificationId
      );

       if(notificationIndex !== -1) {
        this.updateUnreadCount();

       }

        this.router.navigate(['/modules/notifications']);
      },
      (error) => {
        console.log(error); 
      }
    );
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe(
      (res) => {
        this.notifications.forEach(
          (notification) => (notification.isRead = true)
        );
        this.unreadCount = 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNotification(id: any) {
    this.notificationService.deleteNotification(id).subscribe(
      (res) => {
        this.notifications = this.notifications.filter(
          (notification) => notification._id !== id
        );

        this.updateUnreadCount();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications().subscribe(
      (res) => {
        this.notifications = [];
        this.unreadCount = 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  updateUnreadCount() {

    this.unreadCount = this.notifications.filter(notification => !notification.isRead).length;


    console.log("NOTIFICATION",this.readCount)





  }
}


