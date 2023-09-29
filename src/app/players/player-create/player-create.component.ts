import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss']
})
export class PlayerCreateComponent {
  playerForm: FormGroup;
  fileHolder: File | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.playerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      nickname: [''],
      file: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (this.playerForm.valid) {
      let formData = new FormData();
      formData.append('name', this.playerForm.value.name);
      formData.append('nickname', this.playerForm.value.nickname);
      if (this.fileHolder) {
        formData.append('file', this.fileHolder);
      }
    }
  }

  onFileSelected(event: any) {
    const inputFile = event.target;
    if (inputFile.files.length > 0) {
      this.fileHolder = inputFile.files[0];
    }
  }
}
