<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    protected $table = 'favourites';

    protected $fillable = [
        'RefCodProdotto',
        'RefCodUtente'
    ];

    public function users(){
        return $this->belogsTo("App\models\User");
    }

}
?>