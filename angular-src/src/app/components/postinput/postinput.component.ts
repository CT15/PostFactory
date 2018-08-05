import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostsAreaService } from '../postsarea/postsarea.service';

@Component({
  selector: 'app-postinput',
  templateUrl: './postinput.component.html',
  styleUrls: ['./postinput.component.css']
})
export class PostinputComponent implements OnInit {
  isAnonymous: boolean;
  content: String;
  buttonStatus = false;

  constructor(
    private postService: PostService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private postsAreaService: PostsAreaService
  ) { }

  ngOnInit() {
  }

  isButtonDisabled() {
    return !this.validateService.validatePostContent(this.content);
  }

  post() {
    let newPost = {
      username: "Someone",  // TODO
      isAnonymous: this.isAnonymous,
      content: this.content
    }

    this.postService.post(newPost).subscribe((data) => {
      if(data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 2000 });
        this.content = null;
        this.isAnonymous = null;
        this.postsAreaService.notifyNewPost();
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 2000 });
      }
    })
  }

}
