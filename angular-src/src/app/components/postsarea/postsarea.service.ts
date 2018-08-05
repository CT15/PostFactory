import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PostsAreaService {
    @Output() newPost = new EventEmitter();
    
    notifyNewPost() {
        this.newPost.emit(null);
    }
}