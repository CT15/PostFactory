import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostsAreaService } from './postsarea.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-postsarea',
  templateUrl: './postsarea.component.html',
  styleUrls: ['./postsarea.component.css']
})
export class PostsareaComponent implements OnInit {
  posts = []

  constructor(
    private postService: PostService,
    private postsAreaService: PostsAreaService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.updatePosts();
    this.postsAreaService.newPost.subscribe((value) => {
      this.updatePosts();
    });
  }

  updatePosts() {
    this.postService.retrievePosts().subscribe((data) => {
      if(data.success) {
        this.posts = data.posts.reverse();
      }
    });
  }

  increaseLike(post) {
    this.postService.increaseLike(post._id).subscribe((data) => {
      if(data.success) {
        this.updatePosts();
      } else {
        this.flashMessage.show('An error occured. Unable to increase like count', { cssClass: 'alert-daner', timeout: 2000 });
      }
    });
  }
}

