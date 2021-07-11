<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';

    protected $fillable = [
        'codProdotto',
        'utente',
        'nomeProdotto',
        'Descrizione',
        'Prezzo'
    ];

}
?>