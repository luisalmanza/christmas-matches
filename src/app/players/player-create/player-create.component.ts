import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import BasicPlayerInterface from 'src/app/interfaces/basic-player.interface';
import PhotoInterface from 'src/app/interfaces/photo.interface';
import PlayerInterface from 'src/app/interfaces/player.interface';

const enum ActionMode {
  CREATE = "CREATE",
  EDIT = "EDIT"
}

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss']
})
export class PlayerCreateComponent {
  playerForm: FormGroup;
  mode: string = ActionMode.CREATE;
  isLoading: boolean = false;
  private fileHolder: File | undefined;
  private playerId: string = "";
  private mediaId: string = "";

  get name(): AbstractControl {
    return this.playerForm.get("name")!;
  }

  get file(): AbstractControl {
    return this.playerForm.get("filename")!;
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private dataService: DataService) {
    this.playerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      nickname: [""],
      filename: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has("playerId")) {
        this.isLoading = true;
        this.mode = ActionMode.EDIT;
        this.playerId = <string>params.get("playerId");
        this.dataService.getPlayer(this.playerId).subscribe({
          next: (playerResponse: { data: PlayerInterface }) => {
            this.playerForm.setValue({
              name: playerResponse.data.name,
              nickname: playerResponse.data.nickname,
              filename: playerResponse.data.photo.filename
            });

            this.mediaId = playerResponse.data.mediaId;
            this.isLoading = false;
          },
          error: error => {
            console.log(error);
            this.isLoading = false;
          }
        })
      }
    })
  }

  submitForm() {
    if (this.playerForm.valid) {
      if (this.mode === ActionMode.CREATE) {
        this.uploadFile((formData: BasicPlayerInterface) => {
          this.addPlayer(formData);
        });
      } else {
        if (this.fileHolder) {
          this.uploadFile((formData: BasicPlayerInterface) => {
            this.editPlayer(formData);
          });
        } else {
          this.editPlayer({
            name: this.playerForm.value.name,
            nickname: this.playerForm.value.nickname,
            mediaId: this.mediaId
          });
        }
      }
    } else {
      this.name.markAllAsTouched();
      this.file.markAllAsTouched();
    }
  }

  editPlayer(formData: BasicPlayerInterface): void {
    this.dataService.editPlayer(this.playerId, formData).subscribe({
      next: playerResponse => {
        console.log("Player edited", playerResponse);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addPlayer(formData: BasicPlayerInterface): void {
    this.dataService.addPlayer(formData).subscribe({
      next: playerResponse => {
        console.log("Player saved", playerResponse);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  uploadFile(callback: (formData: BasicPlayerInterface) => void): void {
    let formData = new FormData();
    formData.append("file", <File>this.fileHolder)
    this.dataService.uploadFile(formData).subscribe({
      next: (fileResponse: { data: PhotoInterface }) => {
        const formData = {
          name: this.playerForm.value.name,
          nickname: this.playerForm.value.nickname,
          mediaId: fileResponse.data._id
        }
        callback(formData);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onFileSelected(event: any) {
    const inputFile = event.target;
    if (inputFile.files.length > 0) {
      this.fileHolder = inputFile.files[0];
      this.playerForm.patchValue({
        filename: this.fileHolder?.name
      });
    }
  }
}
