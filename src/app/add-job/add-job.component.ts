import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      company: '',
      city: '',
      zipcode: 35,
      description: '',
      contract: '',
      salary: null,
      currency: '',
      experience: '',
      status: '',
      area: '',
      field: '',
      startdate: new Date(),
      publishdate: new Date(),
      lastupdate: new Date()

    });
  }

  createJob() {
    console.log(this.form.value);
  }
}
