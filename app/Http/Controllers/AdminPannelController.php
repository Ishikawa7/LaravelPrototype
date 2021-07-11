<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

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
        $admin= Admin::find(session('admin_id'));
        $users = User::all();
        $shoppings = Shopping::all();
        //registro gli user id con spesa spedizione>100
        $result_users = [];
        foreach($users as $user){
            if($user->spesaTotSpedizioni>100){
                $result_users = $user->id;
            }
        }
        //trovo gli user senza buono
        foreach($result_users as $r){
            foreach($shoppings as $s){
                if($r == $s->utente){
                    $result_users = $r;
                }
            }
        }
        return $result_users;

    }
}
?>  