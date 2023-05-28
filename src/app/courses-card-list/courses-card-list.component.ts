import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { filter, tap } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.scss"],
})
export class CoursesCardListComponent {
  @Input() courses: Course[];
  @Output() coursesChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService
  ) {}

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: "380px",
      data: course,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((val) => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();
  }
}
