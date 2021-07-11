<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
   
    protected $fillable = [
        'email',
        'sale',
        'password'

    ];

    protected $hidden = [
        'password'
    ];
}
?>