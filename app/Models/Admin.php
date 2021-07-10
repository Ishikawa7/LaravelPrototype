<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
   
    protected $fillable = [
        'email',
        'sale',
        'department_code'=> 1
    ];

    protected $hidden = [
        'password'
    ];
}
?>