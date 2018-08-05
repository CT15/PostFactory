import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostsAreaService } from './postsarea.service';

@Component({
  selector: 'app-postsarea',
  templateUrl: './postsarea.component.html',
  styleUrls: ['./postsarea.component.css']
})
export class PostsareaComponent implements OnInit {
  posts = []

  constructor(
    private postService: PostService,
    private postsAreaService: PostsAreaService
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
}

