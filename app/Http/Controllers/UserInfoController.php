<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use App\Models\Shopping;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class UserInfoController extends BaseController
{
    public function index(){
        $user= User::find(session('user_id'));

        if($user!=null){
            return view('user_info');
        }
        return "nessun admin loggato";
    }
    
    public function media_acquisti(){
        /* return ['0' => 525, '1' => 700]; */
        $user_id = session('user_id');
        $result = DB::select(
            "SELECT conBuono, AVG(importo) as avg 
            FROM `shoppings` 
            WHERE utente = '".$user_id."' GROUP BY conBuono");
        return $result;
    }

     public function acquisti_spedizioni_non_recenti(){
        $user_id= session('user_id');
        $result = DB::select(
            "SELECT * FROM shoppings WHERE utente = '".$user_id."' AND id IN (
            SELECT sp.acquisto
            FROM shipment_occurrents as so, shipment_in_progress as sp
            WHERE sp.acquisto=so.acquisto AND DATEDIFF(CURRENT_DATE(), so.dataConsegna) > 30 OR DATEDIFF(CURRENT_DATE(), sp.dataInvio) > 30
            )"
        );
        return $result;
    }
}
?>  