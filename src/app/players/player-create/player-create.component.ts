import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import BasicPlayerInterface from 'src/app/shared/interfaces/basic-player.interface';
import PhotoInterface from 'src/app/shared/interfaces/photo.interface';
import PlayerInterface from 'src/app/shared/interfaces/player.interface';
import * as bootstrap from 'bootstrap';

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
  private saveToast: bootstrap.Toast | undefined;
  private errorModal: bootstrap.Modal | undefined;

  get name(): AbstractControl {
    return this.playerForm.get("name")!;
  }

  get file(): AbstractControl {
    return this.playerForm.get("filename")!;
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.playerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      nickname: [""],
      filename: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.saveToast = bootstrap.Toast.getOrCreateInstance("#saveToast");
    this.errorModal = new bootstrap.Modal('#errorModal');

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
            this.playerForm.disable();
            this.errorModal?.show();
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
    this.isLoading = true;
    this.dataService.editPlayer(this.playerId, formData).subscribe({
      next: playerResponse => {
        this.saveToast?.show();
        this.isLoading = false;
        this.router.navigate(["/players"]);
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.errorModal?.show();
      }
    })
  }

  addPlayer(formData: BasicPlayerInterface): void {
    this.isLoading = true;
    this.dataService.addPlayer(formData).subscribe({
      next: playerResponse => {
        this.saveToast?.show();
        this.isLoading = false;
        this.router.navigate(["/players"]);
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.errorModal?.show();
      }
    })
  }

  uploadFile(callback: (formData: BasicPlayerInterface) => void): void {
    this.isLoading = true;
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
        this.isLoading = false;
        this.errorModal?.show();
      }
    })
  }

  onFileSelected(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files?.length > 0) {
      this.fileHolder = inputFile.files[0];
      this.playerForm.patchValue({
        filename: this.fileHolder?.name
      });
    }
  }
}
