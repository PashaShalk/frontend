import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  images: File[];
  description: string;

  constructor(public dialogRef: MatDialogRef<AddPostDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    if (files) {
      this.images = Array.from(files);
    }
  }

  addPost() {
    if (this.images) {
      this.postService.addPost(this.images, this.data.id, this.description).subscribe(() => {
        this.dialogRef.close('success');
      }, () => {
        this.dialogRef.close('error');
      });
    }
  }
}
