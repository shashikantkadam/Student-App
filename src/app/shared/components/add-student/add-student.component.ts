import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Istudent } from '../../models/student';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

 
  studentForm!: FormGroup;
   buttonflag:boolean= true;
   genders = ['Male', 'Female', 'Other'];
   id!:number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private apicall : ApiserviceService
  ) {}
  

  ngOnInit(): void {
    this.stdform();
    this.onEdit()
  }

  stdform() {
    this.studentForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(12)]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      subjectEnroll: ['', [Validators.required]],
    });
  }

  onEdit(){
    this.route.params.subscribe((params:Params)=>{
      if(params['id']){
         this.id = +params['id']
         this.buttonflag= false;
         this.apicall.getSingleStd(this.id).subscribe(res => {
          const student:Istudent = res;
          this.studentForm.patchValue({
            id: student.id,
            name: student.name,
            password: student.password,
            gender: student.gender,
            dob: student.dob,
            address: student.address,
            subjectEnroll: student.subjectEnroll,
           })
          })
       }
     })
   }
  onsubmit() {
    this.apicall.AddStd(this.studentForm.value).subscribe((res) => {
      
      this.openSnackBar('Student Successfully Added', 'Ok')
      this.router.navigate(['dashboard']);
    });
  }


  onUpdate(){
    let obj = {
      ...this.studentForm.value
    }

    this.apicall.updatestd(this.id, obj).subscribe((res) =>{
      this.apicall.$updateEmitter.next(res)
      this.buttonflag = true; 
    })
    this.studentForm.reset()
    this.router.navigate(['/dashboard'])
  }

  get f(){
    return this.studentForm.controls 
   } 
   
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
