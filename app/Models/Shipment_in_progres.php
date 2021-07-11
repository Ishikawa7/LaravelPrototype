<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Shipment_in_progres extends Authenticatable
{
   
    protected $fillable = [
        'dataInvio',
        'acquisto',
        'utente'
    ];

    public function users(){
        return $this->belogsTo("App\models\User");
    }

    public function shopping(){
        return $this->hasMany("App\models\Shopping");
    }
}
?>