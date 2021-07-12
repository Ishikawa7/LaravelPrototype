<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class AdminPannelController extends BaseController
{
    public function index(){
        $admin= Admin::find(session('admin_id'));

        if($admin!=null){
            return view('admin_pannel');
        }
        return "nessun admin loggato";
    }

    public function admin_stats(){
        $result = DB::select(
            "SELECT * FROM shoppings
            WHERE id IN (
                SELECT s.id 
                FROM shoppings as s, users as u
                WHERE s.utente = u.id AND u.spesaTotSpedizioni > 100 AND s.conBuono = FALSE
                )"
        );
        return $result;
    
    }

    public function admin_sales(){
        $result = DB::select(
            "UPDATE products SET Sconto = CASE  
                WHEN Prezzo >= 500 THEN 50 
                WHEN Prezzo >= 300 AND Prezzo < 500 THEN 30
                WHEN Prezzo >= 100 AND Prezzo < 300 THEN 10
                ELSE 0
                END"
                );
        $result1 = DB::select("UPDATE products SET PrezzoScontato = Prezzo * (1 - Sconto/100)");

        return 'success'; //controllo da implementare: prima veniva fatto in modo diverso con php
    
    }
}
?>  