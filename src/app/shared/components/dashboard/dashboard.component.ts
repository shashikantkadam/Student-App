import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Istudent } from '../../models/student';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public studentArr: Istudent[] = [];
  constructor(
    private apicall: ApiserviceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getallStudent();
    this.updateStudent();
  }

  getallStudent() {
    this.apicall.getAllstd().subscribe((res) => {
      this.studentArr = res;
      this.dataSource = new MatTableDataSource(this.studentArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'gender',
    'dob',
    'subjectEnroll',
    'action',
  ];
  dataSource!: MatTableDataSource<Istudent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OnStudentEdit(row: Istudent) {
    let editId = ''+ row.id;
    this.router.navigate(['addstudent', editId]);
    localStorage.setItem('editId', editId);
  }

  updateStudent() {
    this.apicall.$updateEmitter.subscribe((res:any) => {
      this.studentArr.forEach((std, i) => {
        if (std.id === res.id) {
          this.studentArr[i] = res;
          this.dataSource = new MatTableDataSource(this.studentArr);
        }
      });
    });
  }

  OnStudentDelete(row: Istudent) {
    this.apicall.deletestd(row.id).subscribe((res) => {
      this.studentArr = this.studentArr.filter((std) => std.id !== row.id);
      this.dataSource = new MatTableDataSource(this.studentArr);
    });
  }

}
