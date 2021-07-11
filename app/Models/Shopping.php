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

    public function users(){
        return $this->belogsTo("App\models\User");
    }

    public function shipment_occurent(){
        return $this->belogsTo("App\models\Shipment_occurent");
    }

    public function shipment_in_progress(){
        return $this->belogsTo("App\models\shipment_in_progress");
    }
}
?>