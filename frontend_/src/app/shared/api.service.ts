import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postItem(data:any){
    return this.http.post<any>(`/items`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getItem(){
    return this.http.get<any>(`/items`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  delItem(data:any){
    return this.http.delete<any>(`/items/${data}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  updItem(id:any,data:any){
    return this.http.put<any>(`items/${id}`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  delAllItem(){
    return this.http.delete<any>(`/items`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
