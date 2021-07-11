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

    
    public function product(){
        return $this->hasMany("App\models\Product");
    }

    public function review(){
        return $this->hasMany("App\models\Product");
    }

    public function favourite(){
        return $this->hasMany("App\models\Favourite");
    }

    public function shipment_occurrent(){
        return $this->hasMany("App\models\Shipment_occurent");
    }

    public function shipment_in_program(){
        return $this->hasMany("App\models\Shipment_in_program");
    }

    public function purechased_item(){
        return $this->hasMany("App\models\Purechased_item");
    }

    public function shopping(){
        return $this->hasMany("App\models\Shopping");
    }

}
?>
