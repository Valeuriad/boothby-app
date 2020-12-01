import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  installLink = `https://slack.com/oauth/v2/authorize?client_id=522614420722.521877890336&scope=app_mentions:read,channels:join,channels:read,chat:write,files:write,im:write,incoming-webhook,users:read&redirect_uri=${environment.apiUrl}/install/slack%3Fredirect_uri=${environment.webUrl}`;

  constructor() {}

  ngOnInit() {}
}
