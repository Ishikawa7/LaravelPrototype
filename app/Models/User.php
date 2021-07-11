<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    protected $fillable = [
        'email',
        'password',
        'sale',
        'spesaTotSpedizioni'
    ];

    protected $hidden = [
        'password'
    ];
}
?>
