import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemsModel } from './item.model';
import { ApiService } from "./shared/api.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayItems!: any;
  itemValue!: FormGroup
  modalForm!: FormGroup

  itemModelObj: ItemsModel = new ItemsModel()
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.itemValue = this.formBuilder.group({
      newItem: [''],
    })
    this.modalForm = this.formBuilder.group({
      updateItem: ['']
    })
    this.getAllItem()
  }

  addItem() {
    this.itemModelObj.item = this.itemValue.value.newItem;
    console.log(this.itemModelObj.item);

    this.api.postItem(this.itemModelObj)
      .subscribe(res => {
        console.log(res);
        this.itemValue.reset()
        this.getAllItem();
      },
        err => {
          console.error(err.message);

        })
  }
  removeItem(row: any) {
    this.api.delItem(row.id)
      .subscribe(res => {
        console.log(res);
        this.getAllItem();
        alert("Item deleted")

      },
        err => {
          console.error(err.message);

        })

  }
  removeAllItem() {
    this.api.delAllItem()
      .subscribe(res => {
        this.getAllItem();
        alert("All items deleted")
      },
        err => {
          console.error(err.message);

        })
  }
  getAllItem() {
    this.api.getItem().subscribe(res => {
      this.displayItems = res;
      console.log(res);

    })
  }
  onEdit(row: any) {
    this.itemModelObj.id = row.id;
    this.modalForm.controls['updateItem'].setValue(row.item)
  }
  updateItem() {
    this.itemModelObj.item = this.modalForm.value.updateItem;
    this.api.updItem(this.itemModelObj.id, this.itemModelObj)
    .subscribe(res=>{
      console.log(res);
      let ref=document.getElementById('Close')
      ref?.click();
      this.modalForm.reset()
      this.getAllItem()
      
    })
  }
  title = 'frontend';
}
