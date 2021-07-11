<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Shipment_occurrent extends Authenticatable
{
   
    protected $fillable = [
        'dataInvio',
        'acquisto',
        'utente',
        'costo',
        'dataConsegna'
    ];
}
?>