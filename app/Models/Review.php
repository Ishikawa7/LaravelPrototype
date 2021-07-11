<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'TestoRecensione',
        'CodProdotto',
        'CodUtente',
    ];

}
?>