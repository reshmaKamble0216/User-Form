import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component( {
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: [ './user-management.component.css' ]
} )
export class UserManagementComponent implements OnInit
{
  languageArray = [ "English", "Hindi", "Marathi" ]
  constructor ( private snack: MatSnackBar, ) { }
  ngOnInit (): void
  {

  }
  userForm = new FormGroup( {
    name: new FormControl( '', [ Validators.required ] ),
    description: new FormControl( '', [ Validators.required, Validators.maxLength( 100 ) ] ),
    state: new FormControl( '', [ Validators.required ] ),
    gender: new FormControl( '', [ Validators.required ] ),
    language: new FormArray( [], [ Validators.required ] ),
  } );
  // checkbox code
  onChange ( e: any )
  {
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    const checkedArray = this.userForm.get( 'language' ) as FormArray;
    if ( checked )
    {
      checkedArray.push( new FormControl( checkedValue ) );
    } else
    {
      let i: number = 0;
      checkedArray.controls.forEach( element =>
      {
        if ( element.value == checkedValue )
        {
          checkedArray.removeAt( i )
        } i++;

      } );
    }
  }
  onSubmit ()
  {
    this.snack.open( 'Form submitted successfully', '',
      { duration: 1500, verticalPosition: 'top', horizontalPosition: 'center' } );
    console.log( this.userForm.value );
  }
  resetDescription ()
  {
    this.userForm.get( 'description' )?.reset();
  }
  resetName ()
  {
    this.userForm.get( 'name' )?.reset();

  }
  resetState ()
  {
    this.userForm.get( 'state' )?.reset();

  }
}
