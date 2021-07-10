<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    protected $fillable = [
        'email',
        'sale',
        'spesaTotSpedizioni',
        'department_code'=> 2
    ];

    protected $hidden = [
        'password'
    ];
}
?>
