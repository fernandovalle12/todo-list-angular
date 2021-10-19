import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';

interface todoArr {
    id: string,
    value: string
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public todoList: todoArr[] = [];
    public formGroup: FormGroup = new FormGroup({});


    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.formGroup = this.getFormGroup();
    }

    private getFormGroup() {
        return this.formBuilder.group({
            todoInput: [
                { value: null, disabled: false },
                Validators.compose([Validators.required])
            ]
        })
    }

    public onAdd() {
        if(!this.formGroup.valid) {
            this.toastr.error('Por favor digite algo no input', 'Input vazio!');
            return;
        }
        this.todoList.push({ id: uuid.v4(), value: this.formGroup.controls.todoInput.value });
        this.formGroup.controls.todoInput.reset();
    }

    public onRemove(todo: todoArr) {
        const index = this.todoList.findIndex(val => val.id == todo.id);
        this.todoList.splice(index, 1);
    }
}
