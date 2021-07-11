<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Shopping extends Authenticatable
{
   
    protected $fillable = [
        'conBuono',
        'importo',
        'utente'

    ];
}
?>